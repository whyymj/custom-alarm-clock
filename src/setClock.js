import {PollingTask} from './core/task'
import {
    analysizeTime
} from './util/getTime'
import {
    getCallback,
} from './util/index'


function getDefaultOption(options) {
    let defaultOption = {
        cycle: 1000, //循环周期ms
        count: 1, //重复次数
        immediate: false, //立即执行
        manual: false
    }
    let now = new Date().getTime();
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
    defaultOption.start = analysizeTime(options) || now;
    let start = defaultOption.start;
    let cycle = defaultOption.cycle || 1;

    defaultOption.count = defaultOption.count + Math.min(Math.floor((start - now) / cycle), 0);
    defaultOption.start = Math.max(Math.ceil((now - start) / cycle), 0) * cycle + start;
    let eventListener = defaultOption.eventListener;
    defaultOption.eventListener = (event, task) => {
        if (typeof eventListener == 'function') {
            eventListener(event, task);
        }
        this.status = event;
    }
    return defaultOption;
}


export default class AlarmClock {
    status;
    task;
    options;
    callback;
    constructor(callback, options) {
        this.callback = getCallback(callback, this);
        this.options = getDefaultOption.call(this, options);
        let now = new Date().getTime();
        this.task = new PollingTask(this.callback, this.options);
        this.task.leftTime = this.options.start - now;
        this.task.nextTime = this.options.start;
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
    notify() {
        this.task.notify();
    }
    next() {
        this.task.next();
    }
}
