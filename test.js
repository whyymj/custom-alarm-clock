const alarmClock = require('./dist/index.js');

// alarmClock.setTimeout((task) => {
//     console.log('test setTimeout 1000');
// }, 1000)

// alarmClock.setInterval((task) => {
//     console.log('test setInterval 1000');
// }, 1000)

alarmClock.setClock((task) => {
    console.log('测试闹钟1');
}, {
    start: 0,
    cycle: 0, //24*60*60*1000
    count: Infinity,
    name:'testName'
})

alarmClock.setClock((task) => {
    console.log('测试闹钟2');
}, {
    start: 1000,
    cycle: 1000, //24*60*60*1000
    count: Infinity,
    name:'testName'
})

