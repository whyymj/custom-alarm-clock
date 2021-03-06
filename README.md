# custom-alarm-clock

利用requestAnimationFrame（不支持的环境采用 setTimeout ,周期默认 1000/60 ms）封裝的闹钟功能插件；

主要功能包括: **定时启动，重复次数定制，暂停重启** 等功能;

## Installation

Using npm:

```shell
$ npm i --save custom-alarm-clock
```

------------


In Node.js:

**.setClock（callback, option）**

```js
const alarmClock = require('custom-alarm-clock') ;

// 1.该闹钟将在'2021/9/22 18:18:30'之后运行1次

alarmClock.setClock((task) => {
    console.log('setClock will run at 2021/9/22 18:18:30');
}, '2021/9/22 18:18:30');

// 2.该闹钟将在1000ms之后运行1次，
alarmClock.setClock((task) => {
    console.log('setClock will run 1000ms later');
}, 1000);


// 3.该闹钟将在'2021/9/22 18:18:30'之后运行，每1000ms运行一次，共运行3次
alarmClock.setClock((task) => {
    console.log('test setClock 2021/9/22 18:18:30', new Date());
}, {
    start: '2021/9/22 18:18:30',//闹钟定时,string视为指定日期,  new Date(start)，number视作延迟 start ms
    count: 3,//闹钟重复次数,
    cycle: 1000,//重复间隔 ms; 0 相当于requestAnimationFrame
})

// 4.跳过某次循环
alarmClock.setClock(() => {
    console.log('设置闹钟每天9:00运行，跳过周六周日', new Date());
}, {
    start: new Date('2021/9/21 9:00:00'),//如果日期已是过去时，将其作为起点推算到下一次启动时间，cycle将会减去跳过的周期次数；
    cycle: 86400000, //24*60*60*1000
    count: Infinity,
    skip(task) {
        return !(new Date().getDay() < 6 && new Date().getDay() > 0);  // 周六周日跳过
    }
});

// 5.cycle为0时，相当于 requestAnimationFrame;
alarmClock.setClock(()=>{
    console.log('此时相当于使用requestAnimationFrame')
},{
    start:0,
    cycle: 0,
    count: Infinity,
})
```
**上面例子中，由于Api使用 requestAnimationFrame 实现，回调函数调用的最小间隔时间是两次 requestAnimationFrame 的运行间隔时间；**

**假设浏览器帧率为60,那么 cycle < 1000/60 时，回调函数调用频率将不会高于60。**

------------


In Node.js:

**clock    .sleep() & .notify() & .delay()**

**闹钟可以任意暂停重启。**

```js
let count=0;
let taskObject = alarmClock.setClock((task) => {
    console.log('测试闹钟停止', new Date());
    count++;
    if(count>5){// 5s后该闹钟sleep，未被销毁；
        count=0;
        task.sleep();//callback入参为定时任务实例，可以用来临时暂停任务;
        //task.delay(); // sleep()跳过本轮运行，delay()推迟运行。 例如：8:00闹钟，今天sleep掉，1小时后notify，明天依然8:00响；8:00的闹钟delay后，1小时后notify；则明天9:00才响；
    }
}, {
    start: 0,
    cycle: 1000,
    count: Infinity
})

alarmClock.setTimeout(() => {
    console.log('alarm restart');
    taskObject.notify();//sleep的闹钟可以重新唤醒
}, 10000);

alarmClock.setClock((task) => {
     task.sleep(5000);//传入数字表示稍后自启动，ms
    //  task.delay(5000); //暂停5后自启动
},1000)
```

------------


In Node.js:

**Manual Operation**

Asynchronous operation such as ajax requestion; you can decide when start the next circle.

异步操作如果耗时较长，或者周期较短，例如：每秒请求一次耗时1s-2s的接口；可以手动控制下次查询的开启。

```js
alarmClock.setClock((task) => {
    console.log('测试闹钟', new Date());
    alarmClock.setTimeout(() => { //模拟异步操作
        task.next(); // 下一轮循环将在next()后开启。
    }, Math.random()*2000)
}, {
    start: 0,
    cycle: 1000, 
    count: Infinity,
    manual: true, //设置闹钟手动开启下一轮循环; 手动模式无法 .delay / .sleep
})

```


------------


In Node.js:

**Named Task；**

如果设置了闹钟的名称（name），name相同的clock只会保留最后一个；适用于高频重复创建任务 -- 防抖操作；

```js

//这里的task1不会启动，将被task2顶替
let task1 = alarmClock.setClock((task) => {
    console.log('测试闹钟1');
}, {
    name:'testName',//
})

let task2 = alarmClock.setClock((task) => {
    console.log('测试闹钟2');
}, {
    name:'testName',//task2 的name 与task1 相同；相当于 task1.clear()
})


```

------------



In Node.js:

**Task Group**

设置了groupName后的闹钟可以用 .sleepGroup(groupName)/.delayGroup(groupName)/.notifyGroup(groupName) 统一操作;

```js
const alarmClock = require('custom-alarm-clock');

let task1 = alarmClock.setClock((task) => {
    console.log('测试分组1');
}, {
    start: 0,
    cycle: 0, 
    count: 3,
    groupName:'groupName',//
    eventListener(eventName){//生命周期函数
        //eventName: created,mounted,destroyed,sleeped,notified...
    }
})

let task2 = alarmClock.setClock((task) => {
    console.log('测试分组2');
}, {
    start: 1000,
    cycle: 1000, 
    count: 3,
    groupName:'groupName',
})

alarmClock.sleepGroup('groupName');
// alarmClock.delayGroup('groupName');
// alarmClock.notifyGroup('groupName');

```

------------


In Node.js:

**全局Api**

```js

alarmClock.sleepAll();//用于睡眠全部运行中的闹钟
alarmClock.notifyAll();//用于唤醒全部睡眠中的闹钟
alarmClock.clearAll();//用于清除全部闹钟，释放资源

alarmClock.setTimeout();//用法与原生setTimeout类似;setTimeout(callback,Number/String/Date)
alarmClock.setInterval();//用法与原生setInterval类似;setInterval(callback,Number/Object)
alarmClock.setClock();//

```

------------

In Node.js:

**其他**

```js
//keyframes ： [百分比]：回调函数； “百分比”是指cycle的百分比，在两个 main task 之间触发；（>=1.0.6）
alarmClock.setInterval((task) => {console.log('this is main task'}, { 
    cycle: 10000,
    count: 10,
    keyframes:{//两次main task调用之间的时间点;
        '10%':()=>{},//距离上次main task 结束1s后触发
        '30%':()=>{},//距离上次main task 结束3s后触发//距离上次main task 结束1s后触发
        '100%':()=>{},//本次main task执行前触发
    }
})


```

------------


**All suggestions and opinions are welcome.**

**QQ:454413790**

**Email: 454413790@qq.com**
