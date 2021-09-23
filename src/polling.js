import Task from './util/task.js'
class PollingTask extends Task {
    cycle = 1; //循环周期ms
    count = Infinity; //重复次数
    immediate = false; //立即执行
    manual = false;
    sleeping = false;
    absolute = false; //绝对时间计时
    name;
    itercount = 0;
    canNextCircle = true; //NEXT操作节流
    tasks = []
    yieldIdx = 0;
    nextTime = 0;//下次启动的时间
    leftTime = 0; //距离下次剩余时间
    skip=null;
    constructor(task, option) {
        super(task, option);
        this.set(option);
        if (typeof task === 'function') {
            this.addTasks(task);
        } else if (Array.isArray(task)) {
            task.forEach(cb => {
                this.addTasks(cb);
            })
        }
        this.cycle=Math.max(this.cycle,1)||1;
    }
    addTasks(task) {
        if (typeof task != 'function') {
            return
        }
        for (let cb of this.tasks) {
            if (cb === task) {
                return
            }
        }
        this.tasks.push(task);
    }
    set(option) {
        if (typeof option === 'number' && option === option) {
            this.cycle = option;
        } else if (typeof option === 'object') {
            let keys = ['notify', 'sleep', 'stop', 'next', 'canNextCircle', 'nextTime', 'tasks', 'leftTime','constructor'];
            for (let k in option) {
                if (option[k] !== undefined) {
                    if (keys.includes(k)) {
                        console.error('无法覆盖：' + k);
                        continue;
                    }
                    this[k] = option[k];
                }
            }
        }
        this.leftTime = this.immediate ? 0 : this.cycle;
        if (!this.sleeping) {
            let now = new Date().getTime();
            if (this.immediate) {
                this.nextTime = now;
            } else {
                this.nextTime = now + this.cycle;
            }
        }

    }
    refresh() {
        let now = new Date();
        this.yieldIdx = 0;
        let skipNum = skip(this.absolute ? this.nextTime : now.getTime(), now.getTime(), this.cycle);
        this.nextTime = (this.absolute ? this.nextTime : now.getTime()) + this.cycle * skipNum;
        this.count--;
        this.leftTime = (this.nextTime - now.getTime());
        this.canNextCircle = true;
        this.itercount++;
    }
    nextStep(callback) {
        if(this.skip&&this.skip()){
            this.skipCircle() 
            return
        }
        if(this.leftTime>0){
            return;
        }
        callback&&callback();
        if (this.yieldIdx < this.tasks.length) {
            this.tasks[this.yieldIdx]();
            this.yieldIdx++;
        } 
        if(this.yieldIdx >= this.tasks.length) {
            this.refresh();
        }

    }
    skipCircle(){
        this.refresh();
        this.count++;
        this.itercount--;
    }
    run() {
        if(this.skip&&this.skip()){
            this.skipCircle() 
            return
        }
        if (this.manual) {
            this.nextStep();
            return
        } else {
            this.tasks.forEach(fun => fun());
        }
        this.refresh() 
    }
}

function idle() {
    // console.warn('需要开启手动模式')
}

function skip(start, end, interval) {
    if (end - start > interval) {
        return Math.ceil((end - start) / interval);
    }
    return 1
}
export default class Polling {
    tasks = {};
    namedTasks={}
    sleepProcess = {}; //手动确认结束任务
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            for (let k in this.tasks) {
                let task = this.tasks[k];
                if (task.sleeping) {
                    continue;
                }
                if (task.count > 0) {
                    task.leftTime = task.leftTime - interval;
                    if (task.leftTime <= 0) {
                        if (task.manual) {
                            this.sleepProcess[k] = task;
                            delete this.tasks[k];
                        }
                        task.run();
                    }
                } else {
                    if(this.tasks[k].name){
                        delete this.namedTasks[this.tasks[k].name];
                    }
                    delete this.tasks[k];
                }
            }
        }
        Timer.add(this.mainThread);
        this.destroy = () => {
            this.Timer.remove(this.mainThread);
        }
    }
    add(task, option = 0) {
        if (Array.isArray(option)) {
            return option.map(item => {
                return this.add(task, item)
            })
        }
        task = this.setOption(task, option);

        if (option ?.sleeping) {
            this.sleepProcess[task.id] = task
        } else {
            this.tasks[task.id] = task;
        }
        if(task.name){
            if(this.namedTasks[task.name]!==undefined){
                this.stop(this.namedTasks[task.name])
            }
            this.namedTasks[task.name]=task.id
        }

        return task.id
    }
    reset(ids, task, option = 0) {
        this.stop(ids);
        return this.add(task, option);
    }
    find(ids) {
        if (Array.isArray(ids)) {
            return ids.map(id => {
                return this.find(id);
            }).flat(Infinity).filter(Boolean)
        }
        if(ids instanceof PollingTask) {
            return [ids]
        }
        return [this.tasks[ids] || this.sleepProcess[ids]].filter(Boolean)
    }
    setOption(task, option = 0) {
        task = new PollingTask(task, option);
        task.notify = () => {
            let now = new Date().getTime();
            if (!task.nextTime) {
                if (task.immediate) {
                    task.nextTime = now;
                } else {
                    task.nextTime = now + task.cycle;
                }
            }
            task.sleeping = false;
            this.tasks[task.id] = task;
            delete this.sleepProcess[task.id];
        };
        task.sleep = () => {
            task.sleeping = true;
            this.sleepProcess[task.id] = task;
            delete this.tasks[task.id];
        };
        task.stop = () => {
            if (this.sleepProcess[task.id]) {
                this.sleepProcess[task.id].count = 0
            }
            if (this.tasks[task.id]) {
                this.tasks[task.id].count = 0
            }
        };
        task.next = task.manual ? (callback) => {
            if (task.sleeping) {
                return
            }
            if (task.canNextCircle) {
                task.canNextCircle = false;
                this.tasks[task.id] = this.sleepProcess[task.id] ? this.sleepProcess[task.id] : this.tasks[task.id];
                delete this.sleepProcess[task.id];
            } else{
                task.nextStep(callback);
            }
            
        } : idle;
        if (task.sleeping) {
            task.sleep()
        }
        return task;
    }


    notify(ids) {
        this.find(ids).forEach(task => {
            task.notify()
        })
    }
    notifyAll() {
        this.notify(this.find([...Object.keys(this.tasks), ...Object.keys(this.sleepProcess)]))
    }
    sleep(ids) {
        this.find(ids).forEach(task => {
            task.sleep()
        })
    }
    sleepAll() {
        this.sleep([...Object.keys(this.tasks), ...Object.keys(this.sleepProcess)])
    }
    stop(ids) {
        this.find(ids).forEach(task => {
            task.stop()
        })
    }
    stopAll() {
        this.tasks = {};
        this.sleepProcess = {}; //手动确认结束任务
    }
    next(ids) {
        this.find(ids).forEach(task => {
            task.next()
        })
    }
}