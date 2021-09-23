const alarmClock = require('./dist/index.js');
let time1 = new Date().getTime();
// alarmClock.setTimeout((task) => {
//     console.log('test setTimeout 1000', new Date().getTime() - time1);
//     task.reset()
// }, 1000)

// alarmClock.setInterval((task) => {
//     console.log('test setInterval 1000', new Date().getTime() - time1);

// }, 1000)

alarmClock.setClock(() => {
    console.log('测试设置闹钟每天9:00运行，跳过周六周日', new Date());
}, {
    start: new Date('2021/9/21 9:00:00'),
    cycle: 1000, //24*60*60*1000
    count: Infinity,
    skip() { 
        return new Date().getMinutes() % 2;
    }
})