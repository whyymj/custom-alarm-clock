import {
    yMdhms,
} from './util/getTime.js'

function analysizeTime(time = 0) {
    if(typeof time == 'object'&&time.start){
        return analysizeTime(time.start)
    }
    if (typeof time == 'string') {
        time = new Date(time).getTime();
    } else if (time instanceof Date) {
        time = time.getTime();
    } else if (typeof time == 'object') {
        time = yMdhms(time.year, time.month, time.day, time.hour, time.min, time.sec, time.msec).getTime();
    } else if(typeof time == 'number'){
        time = new Date().getTime()+time
    }
    return time;
}
export default class ClockTask {
    timingTasks = {};
    taskIdx = 0;
    suspendId = {};
    clearId = {}
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            now = now.getTime()
            for (let t in this.timingTasks) {
                if (t <= now) {
                    this.timingTasks[t].forEach(item => {
                        if (this.suspendId[item.id] || this.clearId[item.id]) {
                            delete this.suspendId[item.id];
                            delete this.clearId[item.id];
                        } else {
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
        time = analysizeTime(time) - now;
        let ids = []
        if (typeof time === 'number' && time === time) {
            let clock = now + time;
            this.timingTasks[clock] = this.timingTasks[clock] || []
            if (typeof callback == 'function') {
                this.taskIdx++;
                ids.push(this.taskIdx)
                this.timingTasks[clock].push({
                    id: this.taskIdx,
                    clock,
                    callback
                });
            }
        }
        return ids
    }
    find(ids) {
        if (Array.isArray(ids)) {
            return ids.map(id => {
                return this.find(id)
            }).flat(Infinity).filter(Boolean)
        }

        for (let k in this.timingTasks) {
            let item = this.timingTasks[k];
            if (item.id == ids) {
                return [item];
            }
        }

    }
    reset(ids, time = 0) {
        time = analysizeTime(time);
        this.find(ids).map(item => {
            let now = new Date().getTime();
            let clock = now + time;
            delete this.timingTasks[item.clock];
            item.clock = clock;
            this.timingTasks[clock] = item;
        })
    }
    stop(ids) {
        this.find(ids).forEach(item => {
            this.clearId[item.id] = true
        })
    }
    stopAll() {
        this.timingTasks = {};
        this.suspendId = {};
        this.clearId = {}
    }
    suspendAll() {
        for (let k in this.timingTasks) {
            if (this.timingTasks[k]) {
                this.timingTasks[k].forEach(item => {
                    this.suspendId[item.id] = true
                })
            }
        }
    }
    suspend(ids) {
        this.find(ids).forEach(item => {
            this.suspendId[item.id] = true
        })
    }
    continue (ids) {
        delete this.suspendId[ids]
    }
    continueAll(ids) {
        this.suspendId = {}
    }

}