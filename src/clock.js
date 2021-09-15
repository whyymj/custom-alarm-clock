import Timer from './util/timer.js'
import {
    sameDayTime,
    yMdhms,
} from './util/getTime.js'
class ClockTask {
    timingTasks = {};
    frequency = 1000 / 60;

    constructor() {
        Timer.add((last, now, interval) => {
            now = now.getTime()
            for (let t in this.timingTasks) {
                if (t <= now) {
                    this.timingTasks[t].forEach(fun => {
                        fun()
                    })
                    delete this.timingTasks[t]
                }
            }
        })
    }
    addClockTask(callback, time = 0) {
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
    // startClockTask(t = 0) {
    //     this.pollingTasks[t].forEach(task => {
    //         task();
    //     });
    // }

    // clockStart() {
    //     for (let time in this.pollingTasks) {
    //         let t = parseInt(time);
    //         this.startClockTask(t);
    //         clearInterval(this.pollingBars[t]);
    //         this.pollingBars[t] = setInterval(() => {
    //             this.startClockTask(t);
    //         }, t)
    //     }
    //     return this;
    // }
    // clearClock() {
    //     for (let time in this.pollingTasks) {
    //         let t = parseInt(time);
    //         clearInterval(this.pollingBars[t]);
    //     }
    //     this.pollingTasks = [];
    //     this.pollingBars = [];
    //     return this;
    // }
    // dialyStart() {
    //     this.timingTasks.forEach(task => {
    //         task();
    //     })

    //     this.startTime = this.startTime || this.getTodayStartTime(7, 0, 0, 0).getTime();
    //     clearInterval(this.throttleInterval);
    //     this.throttleInterval = setInterval(() => { //防止计时器误差,每秒(/frequency)检查一次
    //         let today = this.getTodayStartTime(7, 0, 0, 0).getTime();
    //         if (this.startTime < today) {
    //             this.startTime = today;
    //             this.dialyStart()
    //         }
    //     }, this.frequency);
    //     return this;
    // }
    // startOnce() {
    //     this.disposableTasks.forEach(task => {
    //         task();
    //     })
    //     this.disposableTasks = []
    // }
    // startAll() {
    //     this.clockStart();
    //     this.dialyStart();
    //     this.startOnce();
    //     return this;
    // }
    // clearAll() {
    //     this.startTime = 0;
    //     this.timingTasks = [];
    //     this.disposableTasks = [];
    //     this.clearClock();
    //     clearInterval(this.throttleInterval)
    //     return this
    // }
    // addDialyTask(task) { //每天00:00:00运行一次
    //     this.timingTasks.push(task);
    //     return this
    // }
    // addClockTask(task, interval = 5000) {
    //     interval = Math.max(interval, 100);

    //     this.pollingTasks[interval] = this.pollingTasks[interval] || []
    //     this.pollingTasks[interval].push(task);
    //     return this
    // }
    // delDialyTask(task) {
    //     this.timingTasks = this.timingTasks.filter(item => task != item)
    //     return this
    // }
    // delClockTask(task, time = 0) {
    //     time = Math.max(time, 100);
    //     if (this.pollingTasks[time]) {
    //         this.pollingTasks[time] = this.pollingTasks[time].filter(item => task != item);
    //         return this
    //     }
    //     for (let interval in this.pollingTasks) {
    //         this.pollingTasks[interval] = this.pollingTasks[interval].filter(item => task != item);
    //     }
    //     return this
    // }
    // addOnce(task) {
    //     this.disposableTasks.push(task);
    // }
}
export default new ClockTask()