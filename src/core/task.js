import taskPool from './taskPool';
function skip(start, end, interval) {
    if (end >= start) {
        return Math.max(1, Math.ceil((end - start) / interval));
    }
    return 0
}
class Task {
    id;
    cycle = 1; //循环周期ms
    count = Infinity; //重复次数
    immediate = false; //立即执行
    manual = false; //手动控制
    sleeping = false; //只是回调不运行
    delaying = false; //整个任务暂停
    delayable = true; //可否delay
    sleepable = true; //可否sleep
    stopable = true; //可否stop
    name; //任务名称
    itercount = 0; //执行次数统计
    canNextCircle = true; //NEXT操作节流
    callbacks = []; //callbacks
    yieldIdx = 0; //当前 callback index
    nextTime = 0; //下次启动的时间
    leftTime = 0; //距离下次剩余时间
    skip = null; //判断是否跳过该轮循环的judger
    groupName; //任务分组名
    eventListener = null; //任务结束后回调 ,生命周期函数 
    status = '';
    option=null;
    constructor(callback, option) {
        Task.idx++
        this.id = Task.idx;
        this.setOption(option);
        this.add(callback);
        this.status = 'created';
        // if (typeof this.eventListener == 'function') {
        //     this.eventListener(this.status, this);
        // } 
        taskPool.add(this);
    }
    add(callback) {
        if (Array.isArray(callback)) {
            callback.forEach(cb => {
                this.add(cb);
            })
            return;
        }
        if (typeof callback != 'function') {
            return
        }
        for (let cb of this.callbacks) {
            if (cb === callback) {
                return
            }
        }
        this.callbacks.push(callback);
    }
    setOption(option) {
        this.option = option;
        if (typeof option === 'number' && option === option) {
            this.cycle = option;
        } else if (typeof option === 'object') {
            let keys = ['notify', 'sleep', 'stop', 'next', 'canNextCircle', 'nextTime', 'callbacks', 'leftTime', 'constructor'];
            for (let k in option) {
                if (option[k] !== undefined) {
                    if (keys.includes(k)) {
                        continue;
                    }
                    this[k] = option[k];
                }
            }
        }
        this.cycle = Math.max(this.cycle, 1) || 1;
        this.leftTime = this.immediate ? 0 : this.cycle;
        if (!this.delaying) {
            let now = new Date().getTime();
            if (this.immediate) {
                this.nextTime = now;
            } else {
                this.nextTime = now + this.cycle;
            }
        }
    }
    refresh(finishRun = true) {
        let now = new Date().getTime();
        this.yieldIdx = 0;
        let skipNum = skip(this.nextTime, now, this.cycle);
        this.nextTime = this.nextTime + this.cycle * skipNum;
        this.leftTime = (this.nextTime - now);
        this.canNextCircle = true;
        if (!this.sleeping && !this.delaying && finishRun) {
            this.itercount++;
            this.count--;
        }
    }
    notify() {
        let now = new Date().getTime(); 
        if (this.delaying) {
            this.nextTime = now + this.leftTime;
        } 
        if (!this.nextTime) {
            if (this.immediate) {
                this.nextTime = now;
            } else {
                this.nextTime = now + this.cycle;
            }
        }        
        taskPool.autoTask(this)
        this.status = 'notified';
        if (typeof this.eventListener == 'function'&&(this.delaying||this.sleeping)) {
            this.delaying = false;
            this.sleeping = false;
            this.eventListener(this.status, this);
            return
        }
        this.delaying = false;
        this.sleeping = false;

    };
    sleep() {
        if (!this.sleepable) {
            return
        }
        this.status = 'sleeped';
        if (typeof this.eventListener == 'function'&&!this.sleeping) {
            this.sleeping = true;
            this.eventListener(this.status, this);
            return
        }
        this.sleeping = true;
    };
    delay() {
        if (!this.delayable) {
            return
        }
        taskPool.manualTask(this)
        this.status = 'delayed';
        if (typeof this.eventListener == 'function'&&!this.delaying) {
            this.delaying = true;
            this.eventListener(this.status, this);
            return
        }
        this.delaying = true;
    };
    next() {
        if (this.delaying || this.sleeping || !this.manual) {
            return
        }
        if (this.canNextCircle) {
            this.canNextCircle = false;
            taskPool.autoTask(this);
        } else {
            task.nextStep(callback);
        }
    };
    stop() {
        if (!this.stopable) {
            return;
        }
        this.status = 'beforeDestroy';
        taskPool.remove(this);
    };
}
Task.idx = 0;


export class PollingTask extends Task {
    constructor(callback, option) {
        super(callback, option);
    }
    nextStep() {
        if (this.leftTime > 0 || this.sleeping || this.delaying) {
            return;
        }
        if (this.skip && this.skip()) {
            this.refresh(false);
            return
        }
        if (this.yieldIdx < this.callbacks.length) {
            this.callbacks[this.yieldIdx]();
            this.yieldIdx++;
        }
        if (this.yieldIdx >= this.callbacks.length) {
            this.refresh();
        }
    }
    run() {
        if (this.skip && this.skip()) {
            this.refresh(false);
            return
        }
        if (!this.sleeping) {
            if (this.manual) {
                this.nextStep();
                return
            } else {
                this.callbacks.forEach(fun => fun());
            }
        }
        this.refresh()
    } 
}