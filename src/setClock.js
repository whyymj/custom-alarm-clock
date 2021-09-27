import Clock from './core/clock'
import taskPool from './core/task'
import {
    getCallback,
} from './util/index'

let clock = new Clock();

function getDefaultOption(options) {
    let defaultOption = {
        cycle: 1000, //循环周期ms
        count: 1, //重复次数
        immediate: false, //立即执行
        manual: false
    }
    if (typeof options == 'object') {
        defaultOption = {
            ...defaultOption,
            ...options
        }
    } else if (typeof options == 'number' && options === options) {
        defaultOption.cycle = options;
    } else if (typeof options == 'string') {
        defaultOption.start = options;
    } else if (typeof options == 'boolean') {
        defaultOption.manual = options;
    }
    return defaultOption;
}


export default class AlarmClock {
    status;
    taskIds;
    options;
    callback;
    constructor(callback, options) {
        this.callback = getCallback(callback, this);
        this.options = getDefaultOption.call(this, options);
       
        let eventListener = this.options.eventListener
        this.options.eventListener = (event, task) => {
            if (typeof eventListener == 'function') {
                eventListener(event, this);
            }
            this.status = this;
        }
        this.taskIds = clock.add(this.callback, this.options).id;
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