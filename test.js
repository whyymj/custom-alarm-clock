const alarmClock = require('./dist/index.js');

// alarmClock.setTimeout((task) => {
//     console.log('test setTimeout 1000');
// }, 1000)

// alarmClock.setInterval((task) => {
//     console.log('test setInterval 1000');
// }, 1000)

alarmClock.setClock((task) => {
    console.log('测试分组1',new Date());
}, {
    start: '2021/9/25 16:13:30',
    cycle: 1000, 
    count: 60,
    groupName:'testName',//
})

// alarmClock.setTimeout((task) => {
//     console.log('测试分组2');
// }, {
//     start: 3000,
//     cycle: 1000, 
//     count: 3,
//     groupName:'testName',//task2 的name 与task1 相同；相当于 task1.clear()
// })


// alarmClock.delayGroup('testName');
console.log('!!!!!!',new Date());

// alarmClock.setClock(()=>{
//     alarmClock.sleepGroup('testName');
//     console.log('delayGroup!!!',new Date());
// }, {
//     start: '2021/9/25 15:19:35',
//     count: 1,
// })
// alarmClock.setClock(()=>{
//     alarmClock.notifyGroup('testName');
//     console.log('notifyGroup!!!',new Date());
// }, {
//     start: '2021/9/25 15:33:30',
//     count: 1,
// })