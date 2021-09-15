const clock = require('./dist/index.js').clock;

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        clock.addClockTask(() => {
            console.log('clock '+i)
        }, 1000)
    }, 1000 * i)
}