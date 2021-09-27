import Clock from './setClock'
function getDefaultOption(options) {
    let defaultOption = {
        cycle: 1, //循环周期ms
        count: 1, //重复次数
        immediate: false, //立即执行
        manual: false
    }
    if (typeof options == 'object') {
        defaultOption = {
            ...defaultOption,
            start:options.start,
        }
    } else if (typeof options == 'number' && options === options) {
        defaultOption.start = options;
    } else if (typeof options == 'string') {
        defaultOption.start = options;
    }
    return defaultOption;
}

export default class Timeout extends Clock{
    constructor(callback, options) {
      super(callback, getDefaultOption(options));
    }
}