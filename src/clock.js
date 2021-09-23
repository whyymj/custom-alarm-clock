
import Task from './util/task.js'

import {analysizeTime} from './util/getTime'
class ClockTask extends Task {
    clock;
    callbacks=[];
    name;
    runtime=0
    constructor(callback, time) {
        super(callback, time);
        this.clock =  time;
        this.addCallback(callback);
    }
    addCallback(callback){
        if(typeof callback == 'function'){
            this.callbacks.push(callback) ;
        }else if(Array.isArray(callback)){
            callback.forEach(cb=>{
                this.addCallback(cb)
            })
        }
    }
    run(){
        this.callbacks.forEach(fun=>{
            fun();
        })
    }
}
export default class Clock {
    timingTasks = {};
    taskIdx = 0;
    sleepId = {};
    clearId = {}
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            now = now.getTime()
            for (let t in this.timingTasks) {
                if (t <= now) {
                    this.timingTasks[t].forEach(item => {
                        if (this.sleepId[item.id] || this.clearId[item.id]) {
                            delete this.sleepId[item.id];
                            delete this.clearId[item.id];
                        } else {
                            item.run()
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
            let task = new ClockTask(callback, time); 
            if(option.name!==undefined){
                task.name=option.name;
            }
            this.timingTasks[task.clock] = this.timingTasks[task.clock] || []
            ids.push(task.id)
            this.timingTasks[task.clock].push(task);
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
        this.sleepId = {};
        this.clearId = {}
    }
    sleepAll() {
        for (let k in this.timingTasks) {
            if (this.timingTasks[k]) {
                this.timingTasks[k].forEach(item => {
                    this.sleepId[item.id] = true
                })
            }
        }
    }
    sleep(ids) {
        this.find(ids).forEach(item => {
            this.sleepId[item.id] = true
        })
    }
    notify (ids) {
        delete this.sleepId[ids]
    }
    notifyAll() {
        this.sleepId = {}
    }

}