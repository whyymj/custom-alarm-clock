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


All suggestions and opinions are welcome. 

QQ:454413790
Email: 454413790@qq.com
