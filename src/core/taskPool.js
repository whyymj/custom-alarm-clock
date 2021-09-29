import Timer from './timer.js'
let taskPool = {};
class Operation {
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
    sleep(ids, time) {
        this.get(ids).forEach(task => {
            task.sleep(time)
        })
    }
    sleepAll(time) {
        this.sleep(taskPool.getAll(), time)
    }
    sleepGroup(groupName, time) {
        this.sleep(taskPool.getGroup(groupName), time)
    }
    delay(ids, time) {
        this.get(ids).forEach(task => {
            task.delay(time)
        })
    }
    delayAll(time) {
        this.delay(taskPool.getAll(), time)
    }
    delayGroup(groupName, time) {
        this.delay(taskPool.getGroup(groupName), time)
    }
    clear(ids) {
        this.get(ids).forEach(task => {
            task.clear()
        })
    }
    clearAll() {
        this.tasks = {};
        this.delayProcess = {}; //手动确认结束任务
        this.namedTasks = {};
        this.group = {};
    }
    clearGroup(groupName) {
        this.clear(taskPool.getGroup(groupName))
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
    constructor() {
        super();
        let start = new Date().getTime();
        let interval = 0;

        function notify(task) {
            if (task.notifylefttime < 0) {
                task.notifylefttime = Infinity;
                task.notify();
            } else {
                task.notifylefttime -= interval;
            }
        }
        Timer.add(
            () => {
                interval = new Date().getTime() - start;
                start += interval;
                this.forEach((task, k) => {
                    notify(task);
                    if (task.delaying) {
                        return;
                    }
                    if (task.count > 0) {
                        task.cyclecount++;
                        if (task.leftTime < 0) {
                            if (task.manual) {
                                this.manualTask(task);
                            }
                            if (start >= task.nextTime) {
                                task.run(start);
                            }
                        } else {
                            task.leftTime = task.leftTime - interval;
                        }
                    } else {
                        this.remove(k)
                    }
                }, (task, k) => {
                    notify(task);
                })
            }
        );
    }
    forEach(callback1, callback2) {
        for (let k in this.tasks) {
            callback1(this.tasks[k], k)
        }
        for (let k in this.delayProcess) {
            callback2(this.delayProcess[k], k)
        }
    }
    add(task) {
        if (task.name !== undefined) {
            if (this.namedTasks[task.name] !== undefined) {
                this.get(this.namedTasks[task.name]).forEach(t => {
                    t.clear()
                })
            }
            this.namedTasks[task.name] = task.id; //迎新
        }
        if (task.status === 'destroyed' || task.status === 'beforeDestroy') {
            return
        }
        if (task.groupName !== undefined) {
            this.group[task.id] = task.groupName
        }
        if (task.delaying) {
            task.delay()
        } else {
            this.tasks[task.id] = task; //挂载任务
            task.status = 'mounted'
            if (typeof task.eventListener == 'function') {
                task.eventListener('mounted', task);
            }
        }
    }
    remove(k) {
        this.get(k).forEach(task => {
            if (task.name !== undefined) {
                delete this.namedTasks[task.name];
            }
            if (task.groupName !== undefined) {
                delete this.group[task.id];
            }

            delete this.delayProcess[task.id];
            delete this.tasks[task.id];
            task.status = 'destroyed'
            if (typeof task.eventListener == 'function') {
                task.eventListener('destroyed', task);
            }
        })

    }
    get(ids) {
        if (ids === undefined) {
            return [];
        }
        if (Array.isArray(ids)) {
            return ids.map(id => {
                return this.get(id);
            }).flat(Infinity).filter(Boolean);
        }
        if (typeof ids == 'object' && ids.id) {
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
taskPool = new TaskPool();
export default taskPool;