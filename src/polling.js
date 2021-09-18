import Task from './util/task.js'
class PollingTask extends Task {
    cycle = 0 //循环周期ms
    times = Infinity //重复次数
    immediate = false //立即执行
    manual = false
    suspending = false
    absolute = false; //绝对时间计时
    name;
    count = 0;

    canNext = true;
    callback = []
    nextTime = 0
    left = 0; //下次剩余时间
    constructor(callback, option) {
        super(callback, option);
        if (typeof callback === 'function') {
            this.callback = [callback, () => {
                this.count++
            }];
        }
        this.set(option);
    }

    set(option) {
        if (typeof option === 'number' && option === option) {
            this.cycle = option;
        } else if (typeof option === 'object') {
            let keys = ['continue', 'suspend', 'stop', 'next', 'canNext', 'nextTime', 'callback', 'left'];
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
        this.left = this.immediate ? 0 : this.cycle;
        if(!this.suspending){
            let now = new Date().getTime();
            if (this.immediate) {
                this.nextTime = now;
            } else {
                this.nextTime = now + this.cycle;
            }
        }
       
    }
}

function idle() {
    console.warn('需要开启手动模式')
}

function skip(start, end, interval) {
    if (end - start > interval) {
        return Math.ceil((end - start) / interval);
    }
    return 1
}
export default class Polling {
    tasks = {};
    tasksIdx = 0;
    idleProcess = {}; //手动确认结束任务
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            for (let k in this.tasks) {
                let task = this.tasks[k];
                if (task.suspending) {
                    continue;
                }
                if (task.times > 0) {
                    if (task.left > interval) {
                        task.left = task.left - interval;
                    } else {
                        task.canNext = true;
                        if (task.manual) {
                            this.idleProcess[k] = task;
                            delete this.tasks[k];
                        } else {
                            let skipNum = skip(task.absolute ? task.nextTime : now.getTime(), now.getTime(), task.cycle);
                            task.nextTime = (task.absolute ? task.nextTime : now.getTime()) + task.cycle * skipNum;
                            task.times--;
                            task.left = task.nextTime - now.getTime();
                        }
                        task.callback.forEach(fun => fun());
                    }
                } else {
                    delete this.tasks[k];
                }
            }
        }
        Timer.add(this.mainThread);
        this.destroy = () => {
            this.Timer.remove(this.mainThread);
        }
    }
    add(callback, option = 0) {
        if (Array.isArray(option)) {
            return option.map(item => {
                return this.add(callback, item)
            })
        }
        let task = this.setOption(callback, option);

        if (option ?.suspending) {
            this.idleProcess[task.id] = task
        } else {
            this.tasks[task.id] = task;
        }

        return task.id
    }
    reset(ids, callback, option = 0) {
        this.stop(ids);
        return this.add(callback, option);
    }
    find(ids) {
        if (Array.isArray(ids)) {
            return ids.map(id => {
                return this.find(id);
            }).flat(Infinity).filter(Boolean)
        }
        return [this.tasks[ids] || this.idleProcess[ids]].filter(Boolean)
    }
    setOption(callback, option = 0) {
        let task = new PollingTask(callback, option);
        task.continue = () => {
            let now = new Date().getTime();
            if (!task.nextTime) {
                if (task.immediate) {
                    task.nextTime = now;
                } else {
                    task.nextTime = now + task.cycle;
                }
            }
            task.suspending = false;
            this.tasks[task.id] = task;
            delete this.idleProcess[task.id];
        };
        task.suspend = () => {
            task.suspending = true;
            this.idleProcess[task.id] = task;
            delete this.tasks[task.id];
        };
        task.stop = () => {
            if (this.idleProcess[task.id]) {
                this.idleProcess[task.id].times = 0
            }
            if (this.tasks[task.id]) {
                this.tasks[task.id].times = 0
            }
        };
        task.next = task.manual ? () => {
            if (task.canNext) {
                this.tasks[task.id] = this.idleProcess[task.id] ? this.idleProcess[task.id] : this.tasks[task.id];
                delete this.idleProcess[task.id];
                task.times--;
                task.canNext = false;
                task.left = task.cycle;
            }
        } : idle;
        if (task.suspending) {
            task.suspend()
        }
        return task;
    }


    continue (ids) {
        this.find(ids).forEach(task => {
            task.continue()
        })
    }
    continueAll() {
        this.continue(this.find([...Object.keys(this.tasks), ...Object.keys(this.idleProcess)]))
    }
    suspend(ids) {
        this.find(ids).forEach(task => {
            task.suspend()
        })
    }
    suspendAll() {
        this.suspend(this.find([...Object.keys(this.tasks), ...Object.keys(this.idleProcess)]))
    }
    stop(ids) {
        this.find(ids).forEach(task => {
            task.stop()
        })
    }
    stopAll() {
        this.tasks = {};
        this.idleProcess = {}; //手动确认结束任务
    }
    next(ids) {
        this.find(ids).forEach(task => {
            task.next()
        })
    }
}