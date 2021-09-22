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
    console.log('test setClock 2021/9/22 18:18:30', new Date());
}, {
    start: 2000,
    cycle: 1000,
    count: 3
})