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
let start = 0

// alarmClock.setDailyClock((task) => {
//     console.log('测试分组1',new Date());
// }, { 
//     h:16,
//     m:38
// })
console.log(new Date())
let task1 = alarmClock.setClock((task) => {
    // task.sleep()
    setTimeout(() => {
        task.next()
        console.log('测试分组1*** ',new Date());
    }, 1000)
}, {
    start: start,
    cycle: 1000,
    count: 3,
    manual: true,
    groupName: 'testName', //task2 的name 与task1 相同；相当于 task1.clear()

});
let task2 = alarmClock.setClock((task) => {
    console.log('测试分组2*** ',new Date());
}, {
    start: start,
    cycle: 1000,
    count: 3,
    groupName: 'testName', //task2 的name 与task1 相同；相当于 task1.clear()

}); 
alarmClock.sleepGroup("testName")
setTimeout(()=>{
console.log("start",new Date());
    alarmClock.notifyGroup("testName")
},3000)
 
 