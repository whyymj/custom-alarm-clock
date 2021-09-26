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
    cycle: 1000, 
    count: 10,
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


