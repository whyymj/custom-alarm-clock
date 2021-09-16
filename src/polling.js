export default class PollingTask {
    tasks = {};
    tasksIdx = 0;
    manualEndTasks = {}; //手动确认结束任务
    constructor(Timer) {
        this.mainThread = (last, now, interval) => {
            for (let k in this.tasks) {
                let item = this.tasks[k];
                if (item.times > 0) {
                    if (item.left > interval) {
                        item.left = item.left - interval;
                    } else {
                        item.left = item.cycle;
                        if (item.manual) {
                            item.start();
                        } else {
                            item.times--;
                        }
                        item.callback.forEach(fun => fun(item.end));
                    }
                } else {
                    delete this.tasks[k];
                }
            }
        }
        Timer.add(this.mainThread);
        this.destroy = () => {
            this.Timer.remove(this.mainThread);
        }
    }

    addPollingTask(callback, option = 0) {
        if (Array.isArray(option)) {
            return option.forEach(item => {
                this.addPollingTask(callback, item)
            })
        }
        this.tasksIdx++;
        this.tasks[this.tasksIdx] = this.setOption(callback, option);
    }
    setOption(callback, option = 0) {
        if (typeof callback === 'function') {
            callback = [callback];
        } else if (Array.isArray(callback)) {
            callback = callback.filter(fun => typeof fun === 'function');
        } else {
            return;
        }
        let options = {
            cycle: 0, //循环周期ms
            times: Infinity, //重复次数
            immediate: false, //立即执行
            left: 0, //下次剩余时间
            lastTime: 0, //上次时间
            manual: false,
        };
        if (typeof option === 'number' && option === option) {
            options.cycle = option;
            options.left = options.immediate ? 0 : option;
        } else if (typeof option === 'object') {
            options = {
                ...options,
                ...option,
            }
        }
        options.callback = callback;
        options.id = this.tasksIdx
        options.start = () => {
            this.manualEndTasks[options.id] = options;
            delete this.tasks[options.id];
        }
        options.end = options.manual ? () => {
            this.tasks[options.id] = this.manualEndTasks[options.id];
            delete this.manualEndTasks[options.id];
            options.times--;
        } : () => {}
        
        return options; 
    }
}