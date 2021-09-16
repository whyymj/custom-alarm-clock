import {
    sameDayTime,
    yMdhms,
} from './util/getTime.js'
export default class ClockTask {
    timingTasks = {};
    frequency = 1000 / 60;
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            now = now.getTime()
            for (let t in this.timingTasks) {
                if (t <= now) {
                    this.timingTasks[t].forEach(fun => {
                        fun()
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
    addClockTask(callback, time = 0) {
        if (Array.isArray(time)) {
            return time.forEach(item => {
                return this.addClockTask(callback, item)
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
                this.timingTasks[clock].push(callback);
            } else if (Array.isArray(callback)) {
                callback.forEach(fun => {
                    if (typeof fun == 'function') {
                        this.timingTasks[clock].push(fun);
                    }
                })
            }
            return
        }
        throw new Error('invalid time')
    }

} 