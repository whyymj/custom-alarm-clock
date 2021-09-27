import Polling from './polling'
import {
    analysizeTime
} from '../util/getTime'

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
            ...options,
        }
    }
    defaultOption.start = analysizeTime(options) || now;
    let start = defaultOption.start;
    let cycle = defaultOption.cycle || 1;

    defaultOption.count = defaultOption.count + Math.min(Math.floor((start - now) / cycle), 0);
    defaultOption.start = Math.max(Math.ceil((now - start) / cycle), 0) * cycle + start;

    return defaultOption;
}

export default class Clock extends Polling {
    constructor(){
        super();
    }

    add(callback, option = 0) {
        let now = new Date().getTime();
        let defaultOption = getDefaultOption(option);
        let task = super.add(callback, defaultOption);
        task.leftTime = defaultOption.start - now;
        task.nextTime = defaultOption.start;

        return task
    }
}