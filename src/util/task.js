function idle() {
    // console.warn('需要开启手动模式')
}
class Task {
    id;
    cycle = 1; //循环周期ms
    count = Infinity; //重复次数
    immediate = false; //立即执行
    manual = false; //手动控制
    sleeping = false; //只是回调不运行
    delaying = false; //整个任务暂停
    delayable = true; //
    sleepable = true; //
    stopable = true; //
    name; //任务名称
    itercount = 0; //执行次数统计
    canNextCircle = true; //NEXT操作节流
    tasks = []; //callbacks
    yieldIdx = 0; //当前 callback index
    nextTime = 0; //下次启动的时间
    leftTime = 0; //距离下次剩余时间
    skip = null; //判断是否跳过该轮循环的judger
    groupName; //任务分组名
    eventListener = null; //任务结束后回调 
    constructor(task, option) {
        Task.idx++
        this.id = Task.idx;
        this.setOption(option);
        this.addTasks(task);
        if (typeof this.eventListener == 'function') {
            this.eventListener('created',this);
        }
    }
    addTasks(task) {
        if (Array.isArray(task)) {
            task.forEach(cb => {
                this.addTasks(cb);
            })
            return;
        }
        if (typeof task != 'function') {
            return
        }
        for (let cb of this.tasks) {
            if (cb === task) {
                return
            }
        }
        this.tasks.push(task);
    }
    setOption(option) {
        if (typeof option === 'number' && option === option) {
            this.cycle = option;
        } else if (typeof option === 'object') {
            let keys = ['notify', 'sleep', 'stop', 'next', 'canNextCircle', 'nextTime', 'tasks', 'leftTime', 'constructor'];
            for (let k in option) {
                if (option[k] !== undefined) {
                    if (keys.includes(k)) {
                        console.error('无法覆盖：' + k);
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
        let now = new Date();
        this.yieldIdx = 0;
        let skipNum = skip(this.nextTime, now.getTime(), this.cycle);
        
        this.nextTime = this.nextTime + this.cycle * skipNum;
        this.leftTime = (this.nextTime - now.getTime());
        this.canNextCircle = true;
        if (!this.sleeping && !this.delaying && finishRun) {
            this.itercount++;
            this.count--;
        }
        if (typeof this.eventListener == 'function') {
            this.eventListener('refreshed',this);
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
        this.delaying = false;
        this.sleeping = false;
        if (typeof this.eventListener == 'function') {
            this.eventListener('notified',this);
        }
    };
    sleep() {
        if(!this.sleepable){
            return
        }
        this.sleeping = true;
        if (typeof this.eventListener == 'function') {
            this.eventListener('sleeped',this);
        }
    };
    delay() {
        if(!this.delayable){
            return
        }
        this.delaying = true;
        if (typeof this.eventListener == 'function') {
            this.eventListener('delayed',this);
        }
    };
    stop() {
        if(!this.stopable){
            return
        }
        if (typeof this.eventListener == 'function') {
            this.eventListener('cleared',this);
        }
    };
}
Task.idx = 0;

function skip(start, end, interval) {
    if (end >= start) {
        return Math.max(1,Math.ceil((end - start) / interval));
    }
    return 0
}
class PollingTask extends Task {
    constructor(task, option) {
        super(task, option);
    }
    nextStep() {
        if (this.leftTime > 0 || this.sleeping || this.delaying) {
            return;
        }
        if (this.skip && this.skip()) {
            this.refresh(false);
            return
        }
        if (this.yieldIdx < this.tasks.length) {
            this.tasks[this.yieldIdx]();
            this.yieldIdx++;
        }
        if (this.yieldIdx >= this.tasks.length) {
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
                this.tasks.forEach(fun => fun());
            }
        }
        this.refresh()
    }
}

export default PollingTask;