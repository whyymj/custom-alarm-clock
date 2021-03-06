(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
        global.requestAnimationFrame = global[vendors[x] + 'RequestAnimationFrame'];
        global.cancelAnimationFrame = global[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
            global[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!global.requestAnimationFrame) {
        global.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = global.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!global.cancelAnimationFrame) {
        global.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());

class Timer {
    callbacks = [];
    constructor() {
        let start = new Date().getTime();
        let interval = 0;
        const timing = () => {
            this.callbacks.forEach(fun => {
                fun(interval);
            }) 
            interval = new Date().getTime() - start;
            start = start + interval;
            return requestAnimationFrame(timing)
        }
        timing()
    }
    add(callback) {
        for (let fun of this.callbacks) {
            if (fun === callback) {
                return
            }
        }
        this.callbacks.push(callback);
    }
    remove(callback) {
        this.callbacks = this.callbacks.filter(fun => {
            return fun !== callback;
        })
    }
}
export default new Timer();