const alarmClock = require('./dist/index.js');
let time1 = new Date().getTime();
// alarmClock.setTimeout((task) => {
//     console.log('test setTimeout 1000', new Date().getTime() - time1);
//     task.reset()
// }, 1000)

// alarmClock.setInterval((task) => {
//     console.log('test setInterval 1000', new Date().getTime() - time1);

// }, 1000) 

alarmClock.setClock((task) => {
    console.log('测试闹钟停止', new Date());
    alarmClock.setTimeout(() => {//模拟异步操作
        console.log('next');
        task.next();
    }, 10000)
}, {
    start: 0,
    cycle: 1000, //24*60*60*1000
    count: Infinity,
    manual: true,
})

