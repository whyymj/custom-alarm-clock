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


let task=clockPolling.setClock(() => {
  
        console.log('!!!!!!! task1  !!!!!!')
}, {
    cycle:1000,
    times:3,
})

let task2 = clockPolling.setClock((task) => {

    console.log('!!!!!!!!!!!!! task2', new Date())
}, { 
    start:'2021/9/18 18:26:01',
    cycle: 2000,
    times:3,
    immediate: true,
    // manual: true
}) 