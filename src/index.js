import clock from './clock'
/**
 * 全局挂载
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ClockPolling = {}));
}(this, (function (exports) {
    // exports.default = ClockPolling;
    exports.clock=clock
})))