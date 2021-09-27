import {
    PollingTask,
} from './task.js'
import taskPool from './taskPool'

export default class Polling {
    add(callback, option = 0) {
        if (Array.isArray(option)) {
            return option.map(item => {
                return this.add(callback, item)
            })
        }
        let task = new PollingTask(callback, option);
        taskPool.add(task);
        return task;
    }
    reset(ids, task, option = 0) {
        this.stop(ids);
        return this.add(task, option);
    }
}