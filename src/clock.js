
import Polling from './polling'
import {
    analysizeTime
} from './util/getTime'

function getDefaultOption(option) {

    let time = analysizeTime(option)-new Date().getTime();

    let defaultOption = {
        cycle: time,
        count: 1,
    }
    if (typeof time == 'object') {
        defaultOption.groupName=option.groupName; 
    }
    return defaultOption;
}
 
export default class Clock extends Polling{
   
    constructor(Timer) {
       super(Timer);
    }
    add(callback, option = 0) {
        let defaultOption = getDefaultOption(option);
        return super.add(callback,defaultOption);
    }
}