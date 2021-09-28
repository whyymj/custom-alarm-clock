import Timer from './timer.js'
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
    constructor() {
        super();
        let start = new Date().getTime();
        let interval = 0;
        Timer.add(
            () => {
                interval = new Date().getTime() - start;
                start += interval;
                this.forEach((task, k) => {
                    if (task.delaying) {
                        return;
                    }
                    if (task.count > 0) {
                        if (task.leftTime < 0) {
                            if (task.manual) {
                                this.manualTask(task)
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
                })
            }
        );
    }
    forEach(callback) {
        for (let k in this.tasks) {
            callback(this.tasks[k], k)
        }
    }
    add(task) {

        if (task.name !== undefined) {
            if (this.namedTasks[task.name] !== undefined) {
                this.get(this.namedTasks[task.name]).forEach(t => {
                    t.stop()
                })
            }
            this.namedTasks[task.name] = task.id; //迎新
        }
        if (task.status === 'destroyed'||task.status === 'beforeDestroy') {
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
export default new TaskPool();