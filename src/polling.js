import PollingTask from './util/task.js'



export default class Polling {
    tasks = {};
    namedTasks = {}
    group = {};
    delayProcess = {}; //手动确认结束任务
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            for (let k in this.tasks) {
                let task = this.tasks[k];
                if (task.delaying) {
                    continue;
                }
                if (task.count > 0) {
                    task.leftTime = task.leftTime - interval;
                    if (task.leftTime <= 0) {
                        if (task.manual) {
                            this.delayProcess[k] = task;
                            delete this.tasks[k];
                        }
                        task.run();
                    }
                } else {
                    if (task.name !== undefined) {
                        delete this.namedTasks[task.name];
                    }
                    if (task.groupName !== undefined) {
                        delete this.group[task.id];
                    }
                    if (typeof task.eventListener == 'function') {
                        task.eventListener('destroy',task);
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
        task = this.createTask(task, option);

        if (task.name !== undefined) {
            if (this.namedTasks[task.name] !== undefined) {
                this.stop(this.namedTasks[task.name]); //除旧
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
        return task.id
    }
    reset(ids, task, option = 0) {
        this.stop(ids);
        return this.add(task, option);
    }
    find(ids) {
        if (ids === undefined) {
            return []
        }
        if (Array.isArray(ids)) {
            return ids.map(id => {
                return this.find(id);
            }).flat(Infinity).filter(Boolean)
        }
        if (ids instanceof PollingTask) {
            return [ids]
        }
        return [this.tasks[ids] || this.delayProcess[ids]].filter(Boolean)
    }
    createTask(callback, option = 0) {
        let task = new PollingTask(callback, option);
        let notify = task.notify;
        let delay = task.delay;
        let stop = task.stop;

        task.notify = () => {
            notify.call(task);
            this.tasks[task.id] = task;
            delete this.delayProcess[task.id];
        };
        task.delay = () => {
            delay.call(task);
            this.delayProcess[task.id] = task;
            delete this.tasks[task.id];
        };
        task.stop = () => {
            stop.call(task);
            if (this.delayProcess[task.id]) {
                this.delayProcess[task.id].count = 0
            }
            if (this.tasks[task.id]) {
                this.tasks[task.id].count = 0
            }
        };
        task.next = () => {
            if (task.delaying || task.sleeping || task.manual) {
                return
            }
            if (task.canNextCircle) {
                task.canNextCircle = false;
                this.tasks[task.id] = this.delayProcess[task.id] ? this.delayProcess[task.id] : this.tasks[task.id];
                delete this.delayProcess[task.id];
            } else {
                task.nextStep(callback);
            }
        };

        return task;
    }

    findGroupIds(groupName) {
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
        return ids
    }
    sleepGroup(groupName) {
        this.sleep(this.findGroupIds(groupName))
    }
    notifyGroup(groupName) {
        this.notify(this.findGroupIds(groupName))
    }
    stopGroup(groupName) {
        this.stop(this.findGroupIds(groupName))
    }

    notify(ids) {
        this.find(ids).forEach(task => {
            task.notify()
        })
    }
    notifyAll() {
        this.notify(this.find([...Object.keys(this.tasks), ...Object.keys(this.delayProcess)]))
    }
    sleep(ids) {
        this.find(ids).forEach(task => {
            task.sleep()
        })
    }
    sleepAll() {
        this.sleep([...Object.keys(this.tasks), ...Object.keys(this.delayProcess)])
    }
    delay(ids) {
        this.find(ids).forEach(task => {
            task.delay()
        })
    }
    delayAll() {
        this.delay([...Object.keys(this.tasks), ...Object.keys(this.delayProcess)])
    }
    delayGroup(groupName) {
        this.delay(this.findGroupIds(groupName))
    }
    stop(ids) {
        this.find(ids).forEach(task => {
            task.stop()
        })
    }
    stopAll() {
        this.tasks = {};
        this.delayProcess = {}; //手动确认结束任务
    }
    next(ids) {
        this.find(ids).forEach(task => {
            task.next()
        })
    }
}