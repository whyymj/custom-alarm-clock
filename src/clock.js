import {
    yMdhms,
} from './util/getTime.js'
import Task from './util/task.js'

function analysizeTime(time = 0) {
    if (typeof time == 'object' && time.start) {
        return analysizeTime(time.start)
    }
    if (typeof time == 'string') {
        time = new Date(time).getTime();
    } else if (time instanceof Date) {
        time = time.getTime();
    } else if (typeof time == 'object') {
        time = yMdhms(time.year, time.month, time.day, time.hour, time.min, time.sec, time.msec).getTime();
    } else if (typeof time == 'number') {
        time = new Date().getTime() + time
    }
    return time;
}
class ClockTask extends Task {
    clock;
    callback;
    name;
    runtime=0
    constructor(callback, time) {
        super(callback, time);
        this.clock =  time;
        this.callback = callback;
    }
}
export default class Clock {
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
    add(callback, option = 0) {
        if (Array.isArray(option)) {
            return option.map(item => {
                return this.add(callback, item)
            })
        } 
        let time = analysizeTime(option);
        let ids = [];
        if (typeof time === 'number' && time === time) {
            if (typeof callback == 'function') {
                let task = new ClockTask(callback, time); 
                if(option.name!==undefined){
                    task.name=option.name;
                }
                this.timingTasks[task.clock] = this.timingTasks[task.clock] || []
                ids.push(task.id)
                this.timingTasks[task.clock].push(task);
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
        return []
    }
    reset(ids, callback, time = 0) {
        this.stop(ids);
        return this.add(callback, time)
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