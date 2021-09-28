import Task from './core/task'
import {
    getCallback,
    getOption
} from './util/index'
 export default class Interval {
    status;
    task;
    options;
    callback;
    constructor(callback, options) {
        this.callback = getCallback(callback, this);
        this.options = getOption.call(this, options);
        this.task = new Task(this.callback, this.options);
    }
    clear() {
        this.task.stop();
    }
    sleep() {
        this.task.sleep();
    }
    delay() {
        this.task.delay();
    }
    reset(option) {
        this.task = this.task.reset(option??this.options);
    }
    notify() {
        this.task.notify();
    }
    next() {
        this.task.next();
    }
}