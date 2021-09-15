class PollingTask {
    throttleInterval = null;
    startTime = 0;
    timingTasks = [];
    disposableTasks = [];
    pollingTasks = {};
    pollingBars = {};
    frequency = 1000;

    startClockTask(t = 0) {
        this.pollingTasks[t].forEach(task => {
            task();
        });
    }
    getTodayStartTime(h = 0, min = 0, s = 0, ms = 0) {
        let date = new Date(new Date().setHours(h, min, s, ms)); // // 当天0点
        return date
    }
    clockStart() {
        for (let time in this.pollingTasks) {
            let t = parseInt(time);
            this.startClockTask(t);
            clearInterval(this.pollingBars[t]);
            this.pollingBars[t] = setInterval(() => {
                this.startClockTask(t);
            }, t)
        }
        return this;
    }
    clearClock() {
        for (let time in this.pollingTasks) {
            let t = parseInt(time);
            clearInterval(this.pollingBars[t]);
        }
        this.pollingTasks = [];
        this.pollingBars = [];
        return this;
    }
    dialyStart() {
        this.timingTasks.forEach(task => {
            task();
        })

        this.startTime = this.startTime || this.getTodayStartTime(7, 0, 0, 0).getTime();
        clearInterval(this.throttleInterval);
        this.throttleInterval = setInterval(() => { //防止计时器误差,每秒(/frequency)检查一次
            let today = this.getTodayStartTime(7, 0, 0, 0).getTime();
            if (this.startTime < today) {
                this.startTime = today;
                this.dialyStart()
            }
        }, this.frequency);
        return this;
    }
    startOnce() {
        this.disposableTasks.forEach(task => {
            task();
        })
        this.disposableTasks = []
    }
    startAll() {
        this.clockStart();
        this.dialyStart();
        this.startOnce();
        return this;
    }
    clearAll() {
        this.startTime = 0;
        this.timingTasks = [];
        this.disposableTasks = [];
        this.clearClock();
        clearInterval(this.throttleInterval)
        return this
    }
    addDialyTask(task) { //每天00:00:00运行一次
        this.timingTasks.push(task);
        return this
    }
    addClockTask(task, interval = 5000) {
        interval = Math.max(interval, 100);

        this.pollingTasks[interval] = this.pollingTasks[interval] || []
        this.pollingTasks[interval].push(task);
        return this
    }
    delDialyTask(task) {
        this.timingTasks = this.timingTasks.filter(item => task != item)
        return this
    }
    delClockTask(task, time = 0) {
        time = Math.max(time, 100);
        if (this.pollingTasks[time]) {
            this.pollingTasks[time] = this.pollingTasks[time].filter(item => task != item);
            return this
        }
        for (let interval in this.pollingTasks) {
            this.pollingTasks[interval] = this.pollingTasks[interval].filter(item => task != item);
        }
        return this
    }
    addOnce(task) {
        this.disposableTasks.push(task);
    }
}