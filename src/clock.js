import {
    sameDayTime,
    yMdhms,
} from './util/getTime.js'
export default class ClockTask {
    timingTasks = {};
    taskIdx = 0;
    stopId = {}
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            now = now.getTime()
            for (let t in this.timingTasks) {
                if (t <= now) {
                    this.timingTasks[t].forEach(item => {
                        if (this.stopId[item.id]) {
                            delete this.stopId[item.id];
                        }else{
                            item.callback()
                        }
                    })
                    delete this.timingTasks[t]
                }
            }
        }
        Timer.add(this.mainThread);
        this.destroy = () => {
            Timer.remove(this.mainThread);
        }
    }
    add(callback, time = 0) {
        if (Array.isArray(time)) {
            return time.map(item => {
                return this.add(callback, item)
            })
        }
        let now = new Date().getTime();
        if (typeof time == 'string') {
            time = new Date(time).getTime() - now;
        } else if (time instanceof Date) {
            time = time.getTime() - now;
        } else if (typeof time == 'object') {
            time = yMdhms(time.year, time.month, time.day, time.hour, time.min, time.sec, time.msec).getTime() - now;
        }

        if (typeof time === 'number' && time === time) {
            let clock = now + time;
            this.timingTasks[clock] = this.timingTasks[clock] || []
            if (typeof callback == 'function') {
                this.taskIdx++;
                this.timingTasks[clock].push({
                    id: this.taskIdx,
                    callback
                });
            } else if (Array.isArray(callback)) {
                callback.forEach(fun => {
                    if (typeof fun == 'function') {
                        this.taskIdx++;
                        this.timingTasks[clock].push({
                            id: this.taskIdx,
                            callback: fun
                        });
                    }
                })
            }
            return
        }
        throw new Error('invalid time')
    }
    stopClock(ids) {
        if (Array.isArray(ids)) {
            ids.forEach(id => {
                this.stopId[id] = 1
            })
        } else {
            this.stopId[ids] = 1
        }
    }
    stopAll(){
        this.timingTasks = {};
        this.stopId = {}
    }

}