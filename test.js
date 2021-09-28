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
let start = new Date('2021/9/28 9:48:00')

// alarmClock.setDailyClock((task) => {
//     console.log('测试分组1',new Date());
// }, { 
//     h:16,
//     m:38
// })
console.log(new Date())
let task = alarmClock.setClock((task) => {
    console.log('测试分组2*** ', new Date());
    // task.sleep()
}, {
    start: 2000,
    cycle: 1000,
    count: 3,
    groupName: 'testName', //task2 的name 与task1 相同；相当于 task1.clear()
    eventListener(status,task) {
        if (status === 'destroyed') {
            task.reset();
            console.log('!!!!')
        }else if(status){
            console.log('sleep????',status)
            task.sleep()
        }
    }
});
// task.sleep();
alarmClock.setTimeout(() => {
    task.notify();
    console.log('restart', new Date());
}, 3000)

class Test{
    constructor(){
        return 1
    }
}
console.log(new Test(),'....');