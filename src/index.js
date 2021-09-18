import Clock from './clock'
import Polling from './polling'
import Timer from './util/timer.js'

function getDefaultOption(options) {
    let defaultOption = {
        start: 0,
        cycle: 0, //循环周期ms
        times: Infinity, //重复次数
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
    suspend(task) {
        if (typeof task == 'object') {
            if (task.suspend) {
                task.suspend();
            }
        }
    }
    suspendAll() {
        this.clock.suspendAll();
        this.polling.suspendAll();
    }
    continue (task) {
        if (task.clock) {
            this.clock.continue(task.clock)
        }
        if (task.polling) {
            this.polling.continue(task.polling)
        }
    }
    continueAll() {
        this.clock.continueAll();
        this.polling.continueAll();
    }
    setTimeout(callback, options) { //setTimeout 
        let that = this;
        let task = {}
        let taskIds = this.clock.add(() => callback(task), options)
        Object.assign(task, {
            clock: taskIds,
            callback,
            options,
            check(){
                return that.clock.find(taskIds)
            },
            clear() {
                that.clock.stop(taskIds);
            },
            suspend() {
                that.clock.suspend(taskIds);
            },
            continue () {
                that.clock.continue(taskIds);
            },
            reset(option) {
                taskIds = that.clock.reset(taskIds, callback, option === undefined ? options : option);
            }
        })
        return task;
    }
    setInterval(callback, options) { //setInterval 
        let that = this;
        let task = {}
        let taskIds = this.polling.add(callback, options)
        Object.assign(task, {
            polling: taskIds,
            callback,
            options,
            check(){
                return that.polling.find(taskIds)
            },
            clear() {
                that.polling.stop(taskIds);
            },
            suspend() {
                that.polling.suspend(taskIds);
            },
            continue () {
                that.polling.continue(taskIds);
            },
            reset(option) {
                taskIds = that.polling.reset(taskIds, callback, option === undefined ? options : option);
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
            suspending: true,
        })
        id['clock'] = this.clock.add(() => {
            this.polling.continue(id['polling'])
        }, options.start)
        return id
    }
    setClock(callback, options) {
        if (typeof callback !== 'function') {
            throw new Error('need callback')
        }
        let task = {}
        let defaultOption = getDefaultOption(options);
        let id = this.getClockIds(() => callback(task), defaultOption);
        let that = this;



        Object.assign(task, {
            clock: id['clock'],
            polling: id['polling'],
            callback,
            options,
            check(){
                return {
                    polling:that.polling.find(id.polling),
                    clock:that.clock.find(id.clock),
                }
            },
            next() {
                that.polling.next(id.polling);
            },
            clear() {
                that.clock.stop(id.clock);
                that.polling.stop(id.polling)
            },
            suspend() {
                that.clock.suspend(id.clock);
                that.polling.suspend(id.polling)
            },
            continue () {
                that.clock.continue(id.clock);
                that.polling.continue(id.polling)
            },
            reset(option) {
                if(option===undefined) {
                    option=options;
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
                        times: Infinity, //repeat 次数
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
    exports.suspend = clock_polling.suspend.bind(clock_polling);
    exports.suspendAll = clock_polling.suspendAll.bind(clock_polling);
    exports.continue = clock_polling.continue.bind(clock_polling);
    exports.continueAll = clock_polling.continueAll.bind(clock_polling);
})))