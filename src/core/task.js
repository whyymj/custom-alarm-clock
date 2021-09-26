class  Operation{
     
    notify(ids) {
        this.get(ids).forEach(task => {
            task.notify()
        })
    }
    notifyAll() {
        this.notify(taskPool.getAll())
    }
    notifyGroup(groupName) {
        this.notify(taskPool.getGroup(groupName))
    }
    sleep(ids) {
        this.get(ids).forEach(task => {
            task.sleep()
        })
    }
    sleepAll() {
        this.sleep(taskPool.getAll())
    }
    sleepGroup(groupName) {
        this.sleep(taskPool.getGroup(groupName))
    }
    delay(ids) {
        this.get(ids).forEach(task => {
            task.delay()
        })
    }
    delayAll() {
        this.delay(taskPool.getAll())
    }
    delayGroup(groupName) {
        this.delay(taskPool.getGroup(groupName))
    }
    stop(ids) {
        this.get(ids).forEach(task => {
            task.stop()
        })
    }
    stopAll() {
        this.tasks = {};
        this.delayProcess = {}; //手动确认结束任务
        this.namedTasks = {};
        this.group = {};
    }
    stopGroup(groupName) {
        this.stop(taskPool.getGroup(groupName))
    }
    next(ids) {
        this.get(ids).forEach(task => {
            task.next()
        })
    }
}
class TaskPool extends Operation {
    tasks = {}; //主任务线
    delayProcess = {}; //手动确认结束任务
    namedTasks = {}; //命名任务{[name]:id}
    group = {}; //任务分组{[id]:groupName}
    forEach(callback) {
        for (let k in this.tasks) {
            callback(this.tasks[k], k)
        }
    }
    add(task) {
        if (task.name !== undefined) {
            if (this.namedTasks[task.name] !== undefined) { 
                this.find(this.namedTasks[task.name]).forEach(t=>{
                    t.stop()
                })
            }
            this.namedTasks[task.name] = task.id; //迎新
        }
        if (task.groupName !== undefined) {
            this.group[task.id] = task.groupName
        }

        if (task.delaying) {
            task.delay()
        } else {
            this.tasks[task.id] = task; //挂载任务
        }
        this.tasks[k] = task;
    } 
    remove(k) {
        this.get(k).forEach(task => {
            if (task.name !== undefined) {
                delete this.namedTasks[task.name];
            }
            if (task.groupName !== undefined) {
                delete this.group[task.id];
            }
            if (typeof task.eventListener == 'function') {
                task.eventListener('destroy', task);
            }
            delete this.delayProcess[task.id];
            delete this.tasks[k];
        })

    }
    get(ids) {
        if (ids === undefined) {
            return [];
        }
        if (Array.isArray(ids)) {
            return ids.map(id => {
                return this.find(id);
            }).flat(Infinity).filter(Boolean);
        }
        if (ids instanceof PollingTask) {
            return this.get(ids.id);
        }
        return [this.tasks[ids] || this.delayProcess[ids]].filter(Boolean);
    }

    getGroup(groupName) {
        if (groupName === undefined) {
            console.error('请输入groupName');
            return;
        }
        let ids = []
        for (let id in this.group) {
            if (this.group[id] === groupName) {
                ids.push(id)
            }
        }
        return this.get(ids)
    }
    update() {

    }
    manualTask(k) {
        this.get(k).forEach(task => {
            this.delayProcess[task.id] = task;
            delete this.tasks[task.id];
        })
    }
    autoTask(k) {
        this.get(k).forEach(task => {
            this.tasks[task.id] = task;
            delete this.delayProcess[task.id];
        })
    }
    getAll() {
        let tasks = [];
        for (let k in this.tasks) {
            tasks.push(this.tasks[k])
        }
        for (let k in this.delayProcess) {
            tasks.push(this.delayProcess[k])
        }
        return tasks;
    }

}
export const taskPool = new TaskPool();

class Task {
    id;
    cycle = 1; //循环周期ms
    count = Infinity; //重复次数
    immediate = false; //立即执行
    manual = false; //手动控制
    sleeping = false; //只是回调不运行
    delaying = false; //整个任务暂停
    delayable = true; //可否delay
    sleepable = true; //可否sleep
    stopable = true; //可否stop
    name; //任务名称
    itercount = 0; //执行次数统计
    canNextCircle = true; //NEXT操作节流
    callbacks = []; //callbacks
    yieldIdx = 0; //当前 callback index
    nextTime = 0; //下次启动的时间
    leftTime = 0; //距离下次剩余时间
    skip = null; //判断是否跳过该轮循环的judger
    groupName; //任务分组名
    eventListener = null; //任务结束后回调 ,生命周期函数
    constructor(callback, option) {
        Task.idx++
        this.id = Task.idx;
        this.setOption(option);
        this.add(callback);
        if (typeof this.eventListener == 'function') {
            this.eventListener('created', this);
        }
    }
    add(callback) {
        if (Array.isArray(callback)) {
            callback.forEach(cb => {
                this.add(cb);
            })
            return;
        }
        if (typeof callback != 'function') {
            return
        }
        for (let cb of this.callbacks) {
            if (cb === callback) {
                return
            }
        }
        this.callbacks.push(callback);
    }
    setOption(option) {
        if (typeof option === 'number' && option === option) {
            this.cycle = option;
        } else if (typeof option === 'object') {
            let keys = ['notify', 'sleep', 'stop', 'next', 'canNextCircle', 'nextTime', 'callbacks', 'leftTime', 'constructor'];
            for (let k in option) {
                if (option[k] !== undefined) {
                    if (keys.includes(k)) {
                        continue;
                    }
                    this[k] = option[k];
                }
            }
        }
        this.cycle = Math.max(this.cycle, 1) || 1;
        this.leftTime = this.immediate ? 0 : this.cycle;
        if (!this.delaying) {
            let now = new Date().getTime();
            if (this.immediate) {
                this.nextTime = now;
            } else {
                this.nextTime = now + this.cycle;
            }
        }
    }
    refresh(finishRun = true) {
        let now = new Date();
        this.yieldIdx = 0;
        let skipNum = skip(this.nextTime, now.getTime(), this.cycle);

        this.nextTime = this.nextTime + this.cycle * skipNum;
        this.leftTime = (this.nextTime - now.getTime());
        this.canNextCircle = true;
        if (!this.sleeping && !this.delaying && finishRun) {
            this.itercount++;
            this.count--;
        }
        if (typeof this.eventListener == 'function') {
            this.eventListener('refreshed', this);
        }
    }
    notify() {
        let now = new Date().getTime();
        if (this.delaying) {
            this.nextTime = now + this.leftTime;
        }
        if (!this.nextTime) {
            if (this.immediate) {
                this.nextTime = now;
            } else {
                this.nextTime = now + this.cycle;
            }
        }
        this.delaying = false;
        this.sleeping = false;
        if (typeof this.eventListener == 'function') {
            this.eventListener('notified', this);
        }
        taskPool.autoTask(this)
    };
    sleep() {
        if (!this.sleepable) {
            return
        }
        this.sleeping = true;
        if (typeof this.eventListener == 'function') {
            this.eventListener('sleeped', this);
        }
    };
    delay() {
        if (!this.delayable) {
            return
        }
        this.delaying = true;
        if (typeof this.eventListener == 'function') {
            this.eventListener('delayed', this);
        }
        taskPool.manualTask(this)
    };
    next() {
        if (this.delaying || this.sleeping || !this.manual) {
            return
        }
        if (this.canNextCircle) {
            this.canNextCircle = false;
            taskPool.autoTask(this);
        } else {
            task.nextStep(callback);
        }
    };
    stop() {
        if (!this.stopable) {
            return
        }
        if (typeof this.eventListener == 'function') {
            this.eventListener('cleared', this);
        }
        manualTask.remove(this)
    };
}
Task.idx = 0;

function skip(start, end, interval) {
    if (end >= start) {
        return Math.max(1, Math.ceil((end - start) / interval));
    }
    return 0
}
export class PollingTask extends Task {
    constructor(callback, option) {
        super(callback, option);
    }
    nextStep() {
        if (this.leftTime > 0 || this.sleeping || this.delaying) {
            return;
        }
        if (this.skip && this.skip()) {
            this.refresh(false);
            return
        }
        if (this.yieldIdx < this.callbacks.length) {
            this.callbacks[this.yieldIdx]();
            this.yieldIdx++;
        }
        if (this.yieldIdx >= this.callbacks.length) {
            this.refresh();
        }
    }
    run() {
        if (this.skip && this.skip()) {
            this.refresh(false);
            return
        }
        if (!this.sleeping) {
            if (this.manual) {
                this.nextStep();
                return
            } else {
                this.callbacks.forEach(fun => fun());
            }
        }
        this.refresh()
    }
}