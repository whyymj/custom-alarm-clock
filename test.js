const polling = require('./dist/index.js').polling;
// let arr = []
// for (let i = 0; i < 10; i++) {

//     arr.push(1000 * i)
// }
// clock.addClockTask(() => {
//     console.log('clock ')
// }, arr)
// clock.addClockTask(() => {
//     console.log('clock 10:44:30')
// }, '2021/9/16 10:44:30')
// clock.addClockTask(() => {
//     console.log('clock 10:44:00')
// }, {
//     year: -1,
//     month: -1,
//     day: -1,
//     hour: 10,
//     min: 44,
//     sec: 59,
//     msec: 0
// })



polling.addPollingTask((end)=>{
    console.log('2 >>>')
    setTimeout(()=>{
        end()
    },1000)
},{
    manual:true,
    cycle:1000
});
console.log('???????')

polling.addPollingTask((end)=>{
    console.log('1 >>>')
    setTimeout(()=>{
        end()
    })
},{
    manual:true,
    cycle:2000
})
console.log('!!!!!!!!')