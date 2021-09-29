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
        this.task.clear();
    }
    sleep(time) {
        this.task.sleep(time);
    }
    delay(time) {
        this.task.delay(time);
    }
    notify() {
        this.task.notify();
    }
    next() {
        this.task.next();
    }
}