
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
let start = new Date('2021/9/27 16:00:00')

alarmClock.setClock((task) => {
    console.log('测试分组1',new Date().getTime()-start.getTime());
}, { 
    start,
    cycle: 1000, 
    count: 10,
    groupName:'testName',//
})
// alarmClock.setInterval((task) => {
//     console.log('测试分组2*** ',new Date().getTime()-now);
// }, {
//     start: 3000,
//     cycle: 2000, 
//     count: 3,
//     groupName:'testName',//task2 的name 与task1 相同；相当于 task1.clear()
// })


