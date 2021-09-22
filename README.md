# custom-alarm-clock

闹钟功能，包括:定时启动，重复次数定制，暂停重启等功能

## Installation

Using npm:

```shell
$ npm i --save custom-alarm-clock
```

In Node.js:



```js
const snapshot = require('custom-alarm-clock')
//compare array 
var arr1= ['a', 'b', 'c', 'd', 'e'];
var arr2= ['aa', 'b', 'c', '+', 'd', 'e', 'f']
snapshot.compare(arr1,arr2).getDiff(df => {
    console.log(JSON.stringify(df))//
})

//result

[["diff",[],[
    ["update",0,"aa"],
    ["add",3,"+"],
    ["add",5,"f"]
]]]
```



All suggestions and opinions are welcome. 

QQ:454413790
Email: 454413790@qq.com
