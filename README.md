# custom-alarm-clock

闹钟功能，包括:定时启动，重复次数定制，暂停重启等功能;

## Installation

Using npm:

```shell
$ npm i --save custom-alarm-clock
```

In Node.js:


timing function

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
    start: '2021/9/22 18:18:30',//闹钟定时,string视为指定日期 new Date(start)，number视作延迟 start ms
    count: 3,//闹钟重复次数,Infinity则无限循环
    cycle: 1000,//重复间隔 ms
})

```



All suggestions and opinions are welcome. 

QQ:454413790
Email: 454413790@qq.com
