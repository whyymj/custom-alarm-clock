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
//     count: 10,
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
let callbacks = [];
for (let i = 0; i < 10; i++) callbacks.push(() => console.log('time out ' + i))

// clockPolling.setTimeout(callbacks,{
//     start:'2021/09/22 14:52:00'
// });
let time = new Date().getTime()
let task = clockPolling.setClock([...callbacks, () => {
    console.log('setInterval !!!!!', new Date().getTime() - time);
    time = new Date().getTime()
}], {
    start:'2021/09/22 17:21:00',
    cycle: 2000,
    count: 1,
    manual: true,
})
setInterval(() => {
    task.next();
}, 500)

 
// clockPolling.setClock((task) => {

//     console.log('!!!!!!!!!!!!! task2', new Date())
// }, {
//     start: 5000,
//     cycle: 2000,
//     count: 3,
//     immediate: true,
//     // manual: true
// })