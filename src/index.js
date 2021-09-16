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
    stop(id) {
        if (typeof id == 'object') {
            this.clock.stopClock(id.clock);
            this.polling.stopPolling(id.polling);
        }
    }
    addClock(callback, options) {
        let that = this;
        return {
            clock: that.clock.add(callback, options)
        }
    }
    addPolling(callback, options) {
        let that = this;
        return {
            polling: that.polling.add(callback, options)
        }
    }
    addClockPolling(callback, options) {
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
        id['polling'] = that.polling.setSeize(callback, {
            ...defaultOption,
            immediate: true,
        })
        id['clock'] = that.clock.add(() => {
            that.polling.addSeize(id['polling'])
        }, defaultOption.start)
        return id
    }
    stopAll() {
        this.clock.stopAll();
        this.polling.stopAll();
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
    exports.addClock = clock_polling.addClock.bind(clock_polling);
    exports.addPolling = clock_polling.addPolling.bind(clock_polling);
    exports.addClockPolling = clock_polling.addClockPolling.bind(clock_polling);
    exports.stopAll = clock_polling.stopAll.bind(clock_polling);
    exports.stop = clock_polling.stop.bind(clock_polling);
})))