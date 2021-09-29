let now = new Date().getTime();
const alarmClock = require('./dist/index.js');
// alarmClock.setTimeout((task) => {
//     console.log('test setTimeout 0',new Date().getTime()-now);
// }, 0)
// alarmClock.setTimeout((task) => {
//     console.log('test setTimeout 1000',new Date().getTime()-now);
// }, 1000)
// alarmClock.setTimeout((task) => {
//     console.log('test setTimeout 10000',new Date().getTime()-now);
// }, 10000)

// alarmClock.setInterval((task) => {
//     console.log('test setInterval 100');
// }, 100)
let start = 0

// alarmClock.setDailyClock((task) => {
//     console.log('测试分组1',new Date());
// }, { 
//     h:16,
//     m:38
// })
console.log(new Date())
alarmClock.setClock((task) => {
    console.log( '设置闹钟每天9:00运行，跳过周六周日', new Date());
}, {
    start: 500, //如果日期已是过去时，将其作为起点推算到下一次启动时间，cycle将会减去跳过的周期次数；
    cycle: 1000, //24*60*60*1000
    count: 3,
    groupName: 'testName', //task2 的name 与task1 相同；相当于 task1.clear()
});
let task2 = alarmClock.setClock((task) => {
    console.log('测试分组2*** ', new Date());
    task.sleep(2000)
}, {
    start: 0,
    cycle: 1000,
    count: 3,
    groupName: 'testName', //task2 的name 与task1 相同；相当于 task1.clear()
});
alarmClock.sleepGroup("testName")
setTimeout(() => {
    console.log("start", new Date());
    alarmClock.notifyGroup("testName")
}, 3000)