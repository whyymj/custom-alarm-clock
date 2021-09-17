import Clock from './clock'
import Polling from './polling'
import Timer from './util/timer.js'
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
    clearAll(){
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
    continue(task) {
        if(task.clock){
            this.clock.continue(task.clock)
        }
        if(task.polling){
            this.polling.continue(task.polling)
        }
    }
    continueAll(){
        this.clock.continueAll();
        this.polling.continueAll();
    }
    setTimeout(callback, options) { //setTimeout 
        let that = this;
        let task = this.clock.add(callback, options) 
        return {
            clock: task,
            clear() {
                that.clock.stop(task);
            },
            suspend() {
                that.clock.suspend(task);
            },
            continue () {
                that.clock.continue(task);
            },
            reset(options) {
                that.clock.reset(task, options);
            }
        };
    }
    setInterval(callback, options) { //setInterval 
        let that = this;
        let task = this.polling.add(callback, options)
        return {
            polling: task,
            clear() {
                that.polling.stop(task);
            },
            suspend() {
                that.polling.suspend(task);
            },
            continue () {
                that.polling.continue(task);
            },
            reset(options) {
                that.polling.reset(task, options);
            }
        }
    }
    setClock(callback, options) {
        if(typeof callback !== 'function') {
            throw new Error('need callback')
        }
        let id = {}
        let that = this;

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
        if (defaultOption.immediate) {
            callback()
        }
        id['polling'] = that.polling.add(callback, {
            ...defaultOption,
            immediate: true,
            suspending: true
        })
        id['clock'] = that.clock.add(() => {
            that.polling.continue(id['polling'])
        }, defaultOption.start)
        return {
            clock:id['clock'],
            polling:id['polling'],
            clear() {
                that.clock.stop(id.clock);
                that.polling.stop(id.polling)
            },
            suspend(){
                that.clock.suspend(id.clock);
                that.polling.suspend(id.polling)
            },
            continue(){
                that.clock.continue(id.clock);
                that.polling.continue(id.polling)
            },
            reset(option){
                if(typeof option === 'object'){
                    if(option.start!==undefined){
                        that.clock.reset(option.start);
                    }
                    
                    that.polling.reset(option)
                }else{
                    throw new TypeError(`only object:
                        {start: 0,//start time
                        cycle: 0, //循环周期ms
                        times: Infinity, //repeat 次数
                        immediate: false, //立即执行
                        manual: false,//手动开始下一次轮询
                    }`)
                }
               
            }
        }
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