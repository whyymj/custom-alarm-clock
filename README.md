# custom-alarm-clock

利用requestAnimationFrame（不支持的环境采用 setTimeout ,周期默认 1000/60 ms）封裝的闹钟功能插件；主要功能包括:定时启动，重复次数定制，暂停重启等功能;

## Installation

Using npm:

```shell
$ npm i --save custom-alarm-clock
```

In Node.js:


setClock

```js
const alarmClock = require('custom-alarm-clock') 
let time1 = new Date().getTime();

//该闹钟将在'2021/9/22 18:18:30'之后运行1次，
alarmClock.setClock((task) => {
    console.log('setClock 2021/9/22 18:18:30', new Date());//
}, '2021/9/22 18:18:30');

//该闹钟将在1000ms之后运行1次，
alarmClock.setClock((task) => {
    console.log('setClock 2021/9/22 18:18:30', new Date());//
}, 1000);


//该闹钟将在'2021/9/22 18:18:30'之后运行，每隔1000ms运行一次，共运行3次
alarmClock.setClock((task) => {
    console.log('test setClock 2021/9/22 18:18:30', new Date());
}, {
    start: '2021/9/22 18:18:30',//闹钟定时,string视为指定日期,  new Date(start)，number视作延迟 start ms
    count: 3,//闹钟重复次数,
    cycle: 1000,//重复间隔 ms; 0 相当于requestAnimationFrame
})

alarmClock.setClock(() => {
    console.log('设置闹钟每天9:00运行，跳过周六周日', new Date());
}, {
    start: new Date('2021/9/21 9:00:00'),//
    cycle: 86400000, //24*60*60*1000
    count: Infinity,
    skip() {
        return new Date().getDay() < 6 && new Date().getDay() > 0; //周六周日跳过
    }
})
```

In Node.js:


clock sleep & notify

```js
const alarmClock = require('custom-alarm-clock');

let count=0;
let taskObject = alarmClock.setClock((task) => {
    console.log('测试闹钟停止', new Date());
    count++;
    if(count>5){
        count=0;
        task.sleep();//callback入参为定时任务实例，可以用来临时暂停任务; task === taskObject;
    }
}, {
    start: 0,
    cycle: 1000, //24*60*60*1000
    count: Infinity,
    skip() { 
        return new Date().getSeconds() % 2;
    }
})

alarmClock.setTimeout(() => {
    console.log('alarm restart');
    taskObject.notify();//暂停的任务可以重新唤醒
}, 10000);

```

In Node.js:

Asynchronous operation such as ajax requestion; you can decide when start the next circle.

异步操作如果耗时较长，或者周期较短，例如：每秒请求一次耗时1s左右的接口；可以手动控制下次查询的开启。

```js
const alarmClock = require('custom-alarm-clock');

alarmClock.setClock((task) => {
    console.log('测试闹钟', new Date());
    alarmClock.setTimeout(() => {//模拟异步操作
        console.log('next');
        task.next();//下一轮循环将在next()后开启。
    }, 1000)
}, {
    start: 0,
    cycle: 1000, //24*60*60*1000
    count: Infinity,
    manual: true,//设置闹钟手动开启下一轮循环
})

```


In Node.js:

named task；

如果设置了闹钟的名称（name），name相同的clock只会保留最后一个；适用于SPA的页面切换时的定时任务重置，不需要手动clear；

```js
const alarmClock = require('custom-alarm-clock');

//这里的task1不会启动，将被task2顶替
let task1 = alarmClock.setClock((task) => {
    console.log('测试闹钟1');
}, {
    start: 0,
    cycle: 0, //24*60*60*1000
    count: Infinity,
    name:'testName',//
})

let task2 = alarmClock.setClock((task) => {
    console.log('测试闹钟2');
}, {
    start: 1000,
    cycle: 1000, //24*60*60*1000
    count: Infinity,
    name:'testName',//task2 的name 与task1 相同；相当于 task1.clear()
})


```


In Node.js:

sleepAll/ notifyAll / clearAll

```js

alarmClock.sleepAll();//用于睡眠全部运行中的闹钟
alarmClock.notifyAll();//用于唤醒全部睡眠中的闹钟
alarmClock.clearAll();//用于清除全部闹钟，释放资源
```
All suggestions and opinions are welcome. 

QQ:454413790
Email: 454413790@qq.com
