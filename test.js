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
let count = 0;

// let task=clockPolling.setClock(() => {
//     count++;
//     if(count>5){
//         task.suspend()
//         console.log('!!!!!!! task1 suspend !!!!!!')
//     }
//     console.log('!!!!!!!!!!!!! task1',count)
// }, {
//     cycle:1000,
// })

let task2 = clockPolling.setClock((task) => {
    count++;
    if(count>5){
        // task.suspend();
    }
    task.next()
    console.log('!!!!!!!!!!!!! task2', count)
}, {
    start: 1000,
    cycle: 1000,
    times: 5,
    immediate: true,
    manual: true
})
setTimeout(() => {
    // task2.continue()
    console.log('!+++task2')

}, 10000)