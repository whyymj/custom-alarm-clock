let now = new Date().getTime();
const alarmClock = require('./dist/index.js');
let start = '2021/9/29 18:27:00'
alarmClock.setTimeout((task) => {
    console.log('test setTimeout 0',new Date());
}, start)
// alarmClock.setTimeout((task) => {
//     console.log('test setTimeout 1000',new Date().getTime()-now);
// }, 1000)
alarmClock.setInterval((task) => {
    console.log('test setTimeout 10000',new Date(),new Date().getTime()-now);
}, { 
    cycle: 1000,
    count: 10,
    immediate: true,
})


// alarmClock.setDailyClock((task) => {
//     console.log('测试分组1',new Date());
// }, { 
//     h:16,
//     m:38
// })
// console.log(new Date())
// // let t1 = alarmClock.setClock(() => {
//     console.log('??')
//     alarmClock.setClock((task) => {
//         console.log('此时相当于使用requestAnimationFrame',new Date());
//         task.delay(1000)
//     }, {
//         start: 1000,
//         cycle: 1000,
//         count: 2,
//         name:1
//     })
// }, {
//     start: 0,
//     cycle: 1000,
//     count: 10,
// })