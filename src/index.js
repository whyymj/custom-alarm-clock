import Clock from './setClock'
import Interval from './setInterval'
import Timeout from './setTimeout'
import taskPool from './core/taskPool'
class ClockPolling {
    clear(task) {
        if (typeof task == 'object') {
            if (task.clear) {
                task.clear();
            }
        }
    }
    clearAll() {
        taskPool.stopAll();
    }
    clearGroup(groupName) {
        taskPool.stopGroup(groupName);
    }
    sleep(task) {
        if (typeof task == 'object') {
            if (task.sleep) {
                task.sleep();
            }
        }
    }
    sleepAll() {
        taskPoolk.sleepAll();
    }
    sleepGroup(groupName) {
        taskPool.sleepGroup(groupName);
    }
    delay(task) {
        if (typeof task == 'object') {
            if (task.delay) {
                task.delay();
            }
        }
    }
    delayAll() {
        taskPool.delayAll();
    }
    delayGroup(groupName) {
        taskPool.delayGroup(groupName)
    }
    notify(task) {
        taskPool.notify(task)
    }
    notifyAll() {
        taskPool.notifyAll();
    }
    notifyGroup(groupName) {
        taskPool.notifyGroup(groupName);
    }
    setTimeout(callback, options) { //setTimeout 
        return new Timeout(callback, options);
    }
    setInterval(callback, options) { //setInterval 
        return new Interval(callback, options)
    }
    setClock(callback, options) {
        return new Clock(callback, options);
    }
    setDailyClock(callback, options = {
        h: 0,
        m: 0,
        s: 0,
        ms: 0,
    }) {
        let start = new Date();
        start.setHours(options.h || 0);
        start.setMinutes(options.m || 0);
        start.setSeconds(options.s || 0);
        start.setMilliseconds(options.ms || 0);
        this.setClock(callback, {
            start,
            count: Infinity,
            cycle: 86400000,
        });
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
    exports.setTimeout = clock_polling.setTimeout;
    exports.setInterval = clock_polling.setInterval;
    exports.setClock = clock_polling.setClock;
    exports.clear = clock_polling.clear.bind(clock_polling);
    exports.clearGroup = clock_polling.clearGroup.bind(clock_polling);
    exports.clearAll = clock_polling.clearAll.bind(clock_polling);
    exports.sleep = clock_polling.sleep.bind(clock_polling);
    exports.sleepGroup = clock_polling.sleepGroup.bind(clock_polling);
    exports.sleepAll = clock_polling.sleepAll.bind(clock_polling);
    exports.delay = clock_polling.delay.bind(clock_polling);
    exports.delayGroup = clock_polling.delayGroup.bind(clock_polling);
    exports.delayAll = clock_polling.delayAll.bind(clock_polling);
    exports.notify = clock_polling.notify.bind(clock_polling);
    exports.notifyGroup = clock_polling.notifyGroup.bind(clock_polling);
    exports.notifyAll = clock_polling.notifyAll.bind(clock_polling);
    exports.setDailyClock = clock_polling.setDailyClock.bind(clock_polling);
})))