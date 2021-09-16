const clockPolling = require('./dist/index.js');

// clockPolling.addClock(() => {
//     console.log('clock 3000')
// }, 3000)
// clockPolling.addClock(() => {
//     console.log('clock 17:55:00')
// }, '2021/9/16 17:55:00')



// let count1 = 0
// let task1 = clockPolling.addPolling((end) => {
//     console.log('1 >>>');
//     count1++;
//     setTimeout(end, 100)
// }, {
//     times: 10,
//     manual: true,
//     cycle: 10000
// });

// let count2 = 0
// let task2 = clockPolling.addPolling((end) => {
//     console.log('2 >>>');
//     count2++;
//     if (count2 > 3) {
//         clockPolling.stop(task2)
//     }
//     setTimeout(end, 100)
// }, {
//     manual: true,
//     cycle: 10000,
//     immediate: true,
// })
let count=0;

let task=clockPolling.addClockPolling(() => {
    count++;
    if(count>10){
        clockPolling.stop(task)
    }
    console.log('!!!!!!!!!!!!!',count)
}, 2000)