
import Clock from './clock'
import Polling from './polling'
import Timer from './util/timer.js'

function getDefaultOption(options) {
    let defaultOption = {
        start: 0,
        cycle: 0, //循环周期ms
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
function getCallback(callback,params){
    let task;
    if (typeof callback == 'function') {
        task = () => callback(params)
    } else if (Array.isArray(callback)) {
        task = callback.map(fun => {
            if(typeof fun == 'function'){
                return () => fun(params)
            }
        }).filter(Boolean)
    }else{
        throw new Error('callbacks are needed')
    } 
    return task
}
class ClockPolling {
    clock = null;
    polling = null;
    timer = null;
    constructor() {
        this.timer = new Timer()
        this.clock = new Clock(this.timer);
        this.polling = new Polling(this.timer);
    }
    clear(task) {
        if (typeof task == 'object') {
            if (task.clear) {
                task.clear();
            }
        }
    }
    clearAll() {
        this.clock.stopAll();
        this.polling.stopAll()
    }
    sleep(task) {
        if (typeof task == 'object') {
            if (task.sleep) {
                task.sleep();
            }
        }
    }
    sleepAll() {
        this.clock.sleepAll();
        this.polling.sleepAll();
    }
    notify(task) {
        if (task.clock) {
            this.clock.notify(task.clock)
        }
        if (task.polling) {
            this.polling.notify(task.polling)
        }
    }
    notifyAll() {
        this.clock.notifyAll();
        this.polling.notifyAll();
    }
    setTimeout(callback, options) { //setTimeout 
        let that = this;
        let task = {}
        let taskIds = this.clock.add(getCallback(callback,task), options)
        Object.assign(task, {
            clock: taskIds,
            callback,
            options,
            check() {
                return that.clock.find(taskIds)
            },
            clear() {
                that.clock.stop(taskIds);
            },
            sleep() {
                that.clock.sleep(taskIds);
            },
            notify() {
                that.clock.notify(taskIds);
            },
            reset(option) {
                taskIds = that.clock.reset(taskIds, getCallback(callback,task), option === undefined ? options : option);
            }
        })
        return task;
    }
    setInterval(callback, options) { //setInterval 
        let that = this;
        let task = {}
        let taskIds = this.polling.add(getCallback(callback,task), options)
        Object.assign(task, {
            polling: taskIds,
            callback,
            options,
            check() {
                return that.polling.find(taskIds)
            },
            clear() {
                that.polling.stop(taskIds);
            },
            sleep() {
                that.polling.sleep(taskIds);
            },
            notify() {
                that.polling.notify(taskIds);
            },
            reset(option) {
                taskIds = that.polling.reset(taskIds, getCallback(callback,task), option === undefined ? options : option);
            },
            next() {
                that.polling.next(taskIds);
            }
        })
        return task
    }
    getClockIds(callback, options) {

        let id = {}
        id['polling'] = this.polling.add(callback, {
            absolute: false,
            ...options,
            immediate: true,
            sleeping: true,
        })
        id['clock'] = this.clock.add(() => {
            this.polling.notify(id['polling'])
        }, options.start)
        return id
    }
    setClock(callback, options) {
         
        let task = {}
        let defaultOption = getDefaultOption(options);
        let id = this.getClockIds(getCallback(callback,task), defaultOption);
        let that = this;

        Object.assign(task, {
            clock: id['clock'],
            polling: id['polling'],
            callback,
            options,
            check() {
                return {
                    polling: that.polling.find(id.polling),
                    clock: that.clock.find(id.clock),
                }
            },
            next() {
                that.polling.next(id.polling);
            },
            clear() {
                that.clock.stop(id.clock);
                that.polling.stop(id.polling)
            },
            sleep() {
                that.clock.sleep(id.clock);
                that.polling.sleep(id.polling)
            },
            notify() {
                that.clock.notify(id.clock);
                that.polling.notify(id.polling)
            },
            reset(option) {
                if (option === undefined) {
                    option = options;
                }
                if (typeof option === 'object') {
                    if (option.start !== undefined) {
                        that.clock.reset(option.start);
                    }

                    that.polling.reset(option)
                } else {
                    throw new TypeError(`only object:
                        {start: 0,//start time
                        cycle: 0, //循环周期ms
                        count: Infinity, //repeat 次数
                        immediate: false, //立即执行
                        manual: false,//手动开始下一次轮询
                    }`)
                }

            }
        })
        if (defaultOption.immediate) {
            callback(task)
        }
        return task
    }

}
let clock_polling = new ClockPolling();
/**
 * 全局挂载
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.clock_polling = {}));
}(this, (function (exports) {
    exports.default = clock_polling;
    exports.setTimeout = clock_polling.setTimeout.bind(clock_polling);
    exports.setInterval = clock_polling.setInterval.bind(clock_polling);
    exports.setClock = clock_polling.setClock.bind(clock_polling);
    exports.clear = clock_polling.clear.bind(clock_polling);
    exports.clearAll = clock_polling.clearAll.bind(clock_polling);
    exports.sleep = clock_polling.sleep.bind(clock_polling);
    exports.sleepAll = clock_polling.sleepAll.bind(clock_polling);
    exports.notify = clock_polling.notify.bind(clock_polling);
    exports.notifyAll = clock_polling.notifyAll.bind(clock_polling);
})))