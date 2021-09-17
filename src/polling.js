class Task {
    cycle = 0 //循环周期ms
    times = Infinity //重复次数
    immediate = false //立即执行
    manual = false
    suspending = false
    id = '';
    callback = []
    left = 0; //下次剩余时间
    constructor(callback, option) {
        if (typeof callback === 'function') {
            this.callback = [callback];
        }
        this.set(option)
    }
    set(option) {
        if (typeof option === 'number' && option === option) {
            this.cycle = option;
        } else if (typeof option === 'object') {
            let keys = ['cycle', 'times', 'manual', 'immediate', 'suspending'];
            for (let k in option) {
                if (option[k] !== undefined && keys.includes(k)) {
                    this[k] = option[k];
                }
            }
        }
        this.left = this.immediate ? 0 : this.cycle;

    }
}

function idle() {
    console.warn('需要开启手动模式')
}
export default class PollingTask {
    tasks = {};
    tasksIdx = 0;
    idleProcess = {}; //手动确认结束任务
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            for (let k in this.tasks) {
                let task = this.tasks[k];
                // if(!task){
                //     continue;
                // }
                if (task.suspending) {
                    continue;
                }
                if (task.times > 0) {
                    if (task.left > interval) {
                        task.left = task.left - interval;
                    } else {
                        task.left = task.cycle;
                        if (task.manual) {
                            this.idleProcess[k] = options;
                            delete this.tasks[k];
                        } else {
                            task.times--;
                        }
                        task.callback.forEach(fun => fun(task.next));
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
        this.tasksIdx++;
        if (option ?.suspending) {
            this.idleProcess[this.tasksIdx] = this.setOption(callback, option);
        } else {
            this.tasks[this.tasksIdx] = this.setOption(callback, option);
        }

        return this.tasksIdx
    }
    reset(ids, option = 0) {
        this.find(ids).map(item => {
            if (item) {
                item.set(option);
                if (item.suspending) {
                    item.suspend()
                }
            }
        });
    }
    find(ids) {
        if (Array.isArray(ids)) {
            return ids.map(id => {
                return this.find(id);
            }).flat(Infinity).filter(Boolean)
        }
        return [this.tasks[ids] || this.idleProcess[ids]]
    }
    setOption(callback, option = 0) {
        let task = new Task(callback, option);
        task.id = this.tasksIdx;
        task.continue = () => {
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
            this.tasks[task.id] = this.idleProcess[task.id] ? this.idleProcess[task.id] : this.tasks[task.id];
            delete this.idleProcess[task.id];
            task.times--;
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