import Polling from './core/polling'
import {taskPool} from './core/task'
import timer from './core/timer.js'
import {
    getCallback,
    getOption
} from './util/index'

let polling = new Polling(timer);

export default class Interval {
    status;
    taskIds;
    options;
    callback;
    constructor(callback, options) {
        this.callback = getCallback(callback, this);
        this.options = getOption.call(this, options);
        this.taskIds = polling.add(this.callback, this.options).id;
    }
    clear() {
        taskPool.stop(this.taskIds);
    }
    sleep() {
        taskPool.sleep(this.taskIds);
    }
    delay() {
        taskPool.sleep(this.taskIds);
    }
    notify() {
        taskPool.notify(this.taskIds);
    }
    reset(option) {
        this.taskIds = polling.reset(this.taskIds, this.callback, option === undefined ? this.options : option);
    }
    next() {
        taskPool.next(this.taskIds);
    }
}