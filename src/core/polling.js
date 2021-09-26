import {
    PollingTask,
    taskPool
} from './task.js'

export default class Polling {
    tasks = {};
    namedTasks = {}
    group = {};
    delayProcess = {}; //手动确认结束任务
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            taskPool.forEach((task, k) => {
                if (task.delaying) {
                    return;
                }
                if (task.count > 0) {
                    task.leftTime = task.leftTime - interval;
                    if (task.leftTime <= 0) {
                        if (task.manual) {
                            taskPool.manualTask(task)
                        }
                        task.run();
                    }
                } else {
                    taskPool.remove(k)
                }
            })
        }
        Timer.add(this.mainThread);
    }
    add(task, option = 0) {
        if (Array.isArray(option)) {
            return option.map(item => {
                return this.add(task, item)
            })
        }
        task = new PollingTask(callback, option);
        taskPool.add(task);
        return task;
    }
    reset(ids, task, option = 0) {
        this.stop(ids);
        return this.add(task, option);
    }
   
}