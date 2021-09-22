/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var t={amdO:{}};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),t.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},t.r({});var e=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=++t.idx};e.idx=0;var n=e;function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=s(t);return function(t,e){if(e&&("object"===f(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return a(t)}(this,e?(n=s(this).constructor,Reflect.construct(i,arguments,n)):i.apply(this,arguments))}}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t){return"object"==f(t=0<arguments.length&&void 0!==t?t:0)&&t.start?y(t.start):("string"==typeof t?t=new Date(t).getTime():t instanceof Date?t=t.getTime():"object"==f(t)?t=function(t,e,n,i,o,r,c){var l=0<arguments.length&&void 0!==t?t:-1;return t=1<arguments.length&&void 0!==e?e:-1,e=2<arguments.length&&void 0!==n?n:-1,n=3<arguments.length&&void 0!==i?i:-1,i=4<arguments.length&&void 0!==o?o:-1,o=5<arguments.length&&void 0!==r?r:-1,r=6<arguments.length&&void 0!==c?c:-1,l=parseInt(l),t=parseInt(t),e=parseInt(e),n=parseInt(n),i=parseInt(i),o=parseInt(o),r=parseInt(r),c=new Date,l=-1<l?l:c.getFullYear(),t=-1<t?t:c.getMonth()+1,e=-1<e?e:c.getDate(),n=-1<n?n:c.getHours(),i=-1<i?i:c.getMinutes(),o=-1<o?o:c.getSeconds(),r=-1<r?r:c.getMilliseconds(),new Date("".concat(l,"/").concat(t,"/").concat(e," ").concat(n,":").concat(i,":").concat(o,":").concat(r))}(t.year,t.month,t.day,t.hour,t.min,t.sec,t.msec).getTime():"number"==typeof t&&(t=(new Date).getTime()+t),t)}var p=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,n);var t=l(e);function e(n,o){var r;return i(this,e),u(a(r=t.call(this,n,o)),"clock",void 0),u(a(r),"callbacks",[]),u(a(r),"name",void 0),u(a(r),"runtime",0),r.clock=o,r.addCallback(n),r}return r(e,[{key:"addCallback",value:function(t){var e=this;"function"==typeof t?this.callbacks.push(t):Array.isArray(t)&&t.forEach((function(t){e.addCallback(t)}))}},{key:"run",value:function(){this.callbacks.forEach((function(t){t()}))}}]),e}(),h=function(){function t(e){var n=this;i(this,t),u(this,"timingTasks",{}),u(this,"taskIdx",0),u(this,"sleepId",{}),u(this,"clearId",{}),this.mainThread=function(t,e,i){for(var o in e=e.getTime(),n.timingTasks)o<=e&&(n.timingTasks[o].forEach((function(t){n.sleepId[t.id]||n.clearId[t.id]?(delete n.sleepId[t.id],delete n.clearId[t.id]):t.run()})),delete n.timingTasks[o])},e.add(this.mainThread),this.destroy=function(){e.remove(n.mainThread)}}return r(t,[{key:"add",value:function(t){var e=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;if(Array.isArray(n))return n.map((function(n){return e.add(t,n)}));var i=y(n),o=[];return"number"==typeof i&&i==i&&(i=new p(t,i),void 0!==n.name&&(i.name=n.name),this.timingTasks[i.clock]=this.timingTasks[i.clock]||[],o.push(i.id),this.timingTasks[i.clock].push(i)),o}},{key:"find",value:function(t){var e,n=this;if(Array.isArray(t))return t.map((function(t){return n.find(t)})).flat(1/0).filter(Boolean);for(e in this.timingTasks){var i=this.timingTasks[e];if(i.id==t)return[i]}return[]}},{key:"reset",value:function(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;return this.stop(t),this.add(e,n)}},{key:"stop",value:function(t){var e=this;this.find(t).forEach((function(t){e.clearId[t.id]=!0}))}},{key:"stopAll",value:function(){this.timingTasks={},this.sleepId={},this.clearId={}}},{key:"sleepAll",value:function(){var t,e=this;for(t in this.timingTasks)this.timingTasks[t]&&this.timingTasks[t].forEach((function(t){e.sleepId[t.id]=!0}))}},{key:"sleep",value:function(t){var e=this;this.find(t).forEach((function(t){e.sleepId[t.id]=!0}))}},{key:"notify",value:function(t){delete this.sleepId[t]}},{key:"notifyAll",value:function(){this.sleepId={}}}]),t}();function d(t){return function(t){if(Array.isArray(t))return v(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||b(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function b(t,e){if(t){if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(t,e):void 0}}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function k(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function w(t,e,n){return e&&k(t.prototype,e),n&&k(t,n),t}function T(t,e){return(T=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function O(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function A(t){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function j(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var x=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&T(t,e)}(e,n);var t=function(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=A(t);return function(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return O(t)}(this,e?(n=A(this).constructor,Reflect.construct(i,arguments,n)):i.apply(this,arguments))}}(e);function e(n,i){var o;return g(this,e),j(O(o=t.call(this,n,i)),"cycle",1),j(O(o),"count",1/0),j(O(o),"immediate",!1),j(O(o),"manual",!1),j(O(o),"sleeping",!1),j(O(o),"absolute",!1),j(O(o),"name",void 0),j(O(o),"itercount",0),j(O(o),"canNextCircle",!0),j(O(o),"tasks",[]),j(O(o),"yieldIdx",0),j(O(o),"nextTime",0),j(O(o),"left",0),j(O(o),"waiting",0),o.set(i),"function"==typeof n?o.addTasks(n):Array.isArray(n)&&n.forEach((function(t){o.addTasks(t)})),o.cycle=Math.max(o.cycle,1)||1,o}return w(e,[{key:"addTasks",value:function(t){if("function"==typeof t){var e,n=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=b(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return{s:e=function(){},n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,r=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return r=t.done,t},e:function(t){c=!0,o=t},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw o}}}}(this.tasks);try{for(n.s();!(e=n.n()).done;)if(e.value===t)return}catch(t){n.e(t)}finally{n.f()}this.tasks.push(t)}}},{key:"set",value:function(t){if("number"==typeof t&&t==t)this.cycle=t;else if("object"===m(t)){var e,n=["notify","sleep","stop","next","canNextCircle","nextTime","tasks","left"];for(e in t)void 0!==t[e]&&(n.includes(e)?console.error("无法覆盖："+e):this[e]=t[e])}var i;this.left=this.immediate?0:this.cycle,this.sleeping||(i=(new Date).getTime(),this.immediate?this.nextTime=i:this.nextTime=i+this.cycle)}},{key:"refresh",value:function(){var t=new Date;this.yieldIdx=0;var e=function(t,e,n){return n<e-t?Math.ceil((e-t)/n):1}(this.absolute?this.nextTime:t.getTime(),t.getTime(),this.cycle);this.nextTime=(this.absolute?this.nextTime:t.getTime())+this.cycle*e,this.count--,this.left=this.nextTime-t.getTime(),this.canNextCircle=!0,this.itercount++}},{key:"nextStep",value:function(t){0<this.left?this.waiting=1:(this.waiting=0,t&&t(),this.yieldIdx<this.tasks.length?(this.tasks[this.yieldIdx](),this.yieldIdx++):this.refresh())}},{key:"run",value:function(){this.manual?this.waiting&&this.nextStep():(this.tasks.forEach((function(t){return t()})),this.refresh())}}]),e}();function I(){}var P=function(){function t(e){var n=this;g(this,t),j(this,"tasks",{}),j(this,"tasksIdx",0),j(this,"sleepProcess",{}),this.mainThread=function(t,e,i){for(var o in n.tasks){var r=n.tasks[o];r.sleeping||(0<r.count?(r.left=r.left-i,r.left<=0&&(r.manual&&(n.sleepProcess[o]=r,delete n.tasks[o]),r.run())):delete n.tasks[o])}},e.add(this.mainThread),this.destroy=function(){n.Timer.remove(n.mainThread)}}return w(t,[{key:"add",value:function(t){var e=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return Array.isArray(n)?n.map((function(n){return e.add(t,n)})):(t=this.setOption(t,n),null!=n&&n.sleeping?this.sleepProcess[t.id]=t:this.tasks[t.id]=t,t.id)}},{key:"reset",value:function(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;return this.stop(t),this.add(e,n)}},{key:"find",value:function(t){var e=this;return(Array.isArray(t)?t.map((function(t){return e.find(t)})).flat(1/0):[this.tasks[t]||this.sleepProcess[t]]).filter(Boolean)}},{key:"setOption",value:function(t){var e=this;return(t=new x(t,1<arguments.length&&void 0!==arguments[1]?arguments[1]:0)).notify=function(){var n=(new Date).getTime();t.nextTime||(t.immediate?t.nextTime=n:t.nextTime=n+t.cycle),t.sleeping=!1,e.tasks[t.id]=t,delete e.sleepProcess[t.id]},t.sleep=function(){t.sleeping=!0,e.sleepProcess[t.id]=t,delete e.tasks[t.id]},t.stop=function(){e.sleepProcess[t.id]&&(e.sleepProcess[t.id].count=0),e.tasks[t.id]&&(e.tasks[t.id].count=0)},t.next=t.manual?function(n){t.sleeping||(t.canNextCircle&&(t.canNextCircle=!1,e.tasks[t.id]=e.sleepProcess[t.id]||e.tasks[t.id],delete e.sleepProcess[t.id]),t.nextStep(n))}:I,t.sleeping&&t.sleep(),t}},{key:"notify",value:function(t){this.find(t).forEach((function(t){t.notify()}))}},{key:"notifyAll",value:function(){this.notify(this.find([].concat(d(Object.keys(this.tasks)),d(Object.keys(this.sleepProcess)))))}},{key:"sleep",value:function(t){this.find(t).forEach((function(t){t.sleep()}))}},{key:"sleepAll",value:function(){this.sleep(this.find([].concat(d(Object.keys(this.tasks)),d(Object.keys(this.sleepProcess)))))}},{key:"stop",value:function(t){this.find(t).forEach((function(t){t.stop()}))}},{key:"stopAll",value:function(){this.tasks={},this.sleepProcess={}}},{key:"next",value:function(t){this.find(t).forEach((function(t){t.next()}))}}]),t}();function S(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}!function(){for(var e=0,n=["webkit","moz"],i=0;i<n.length&&!t.g.requestAnimationFrame;++i)t.g.requestAnimationFrame=t.g[n[i]+"RequestAnimationFrame"],t.g.cancelAnimationFrame=t.g[n[i]+"CancelAnimationFrame"]||t.g[n[i]+"CancelRequestAnimationFrame"];t.g.requestAnimationFrame||(t.g.requestAnimationFrame=function(n){var i=(new Date).getTime(),o=Math.max(0,16.7-(i-e)),r=t.g.setTimeout((function(){n(i+o)}),o);return e=i+o,r}),t.g.cancelAnimationFrame||(t.g.cancelAnimationFrame=function(t){clearTimeout(t)})}();const E=function(){function t(){var e,n,i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=[],(e="callbacks")in this?Object.defineProperty(this,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):this[e]=n;var o=new Date,r=o,c=o.getTime(),l=c;!function t(){r=new Date,l=r.getTime(),i.callbacks.forEach((function(t){t(o,r,l-c)})),o=r,c=l,requestAnimationFrame(t)}()}var e;return(e=[{key:"add",value:function(t){var e,n=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return S(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return{s:e=function(){},n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,r=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return r=t.done,t},e:function(t){c=!0,o=t},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw o}}}}(this.callbacks);try{for(n.s();!(e=n.n()).done;)if(e.value===t)return}catch(t){n.e(t)}finally{n.f()}this.callbacks.push(t)}},{key:"remove",value:function(t){this.callbacks=this.callbacks.filter((function(e){return e!==t}))}}])&&function(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}(t.prototype,e),t}();function C(t,e){var n,i=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)),i}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?C(Object(n),!0).forEach((function(e){D(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function D(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function R(t){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function F(t,e){var n;if("function"==typeof t)n=function(){return t(e)};else{if(!Array.isArray(t))throw new Error("callbacks are needed");n=t.map((function(t){if("function"==typeof t)return function(){return t(e)}})).filter(Boolean)}return n}var M,q=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),D(this,"clock",null),D(this,"polling",null),D(this,"timer",null),this.timer=new E,this.clock=new h(this.timer),this.polling=new P(this.timer)}var e;return(e=[{key:"clear",value:function(t){"object"==R(t)&&t.clear&&t.clear()}},{key:"clearAll",value:function(){this.clock.stopAll(),this.polling.stopAll()}},{key:"sleep",value:function(t){"object"==R(t)&&t.sleep&&t.sleep()}},{key:"sleepAll",value:function(){this.clock.sleepAll(),this.polling.sleepAll()}},{key:"notify",value:function(t){t.clock&&this.clock.notify(t.clock),t.polling&&this.polling.notify(t.polling)}},{key:"notifyAll",value:function(){this.clock.notifyAll(),this.polling.notifyAll()}},{key:"setTimeout",value:function(t,e){var n=this,i={},o=this.clock.add(F(t,i),e);return Object.assign(i,{clock:o,callback:t,options:e,check:function(){return n.clock.find(o)},clear:function(){n.clock.stop(o)},sleep:function(){n.clock.sleep(o)},notify:function(){n.clock.notify(o)},reset:function(r){o=n.clock.reset(o,F(t,i),void 0===r?e:r)}}),i}},{key:"setInterval",value:function(t,e){var n=this,i={},o=this.polling.add(F(t,i),e);return Object.assign(i,{polling:o,callback:t,options:e,check:function(){return n.polling.find(o)},clear:function(){n.polling.stop(o)},sleep:function(){n.polling.sleep(o)},notify:function(){n.polling.notify(o)},reset:function(r){o=n.polling.reset(o,F(t,i),void 0===r?e:r)},next:function(){n.polling.next(o)}}),i}},{key:"getClockIds",value:function(t,e){var n=this,i={};return i.polling=this.polling.add(t,_(_({absolute:!1},e),{},{immediate:!0,sleeping:!0})),i.clock=this.clock.add((function(){n.polling.notify(i.polling)}),e.start),i}},{key:"setClock",value:function(t,e){var n,i={},o=(o={start:0,cycle:0,count:1/0,immediate:!1,manual:!1},"object"==R(n=e)?o=_(_({},o),n):"number"==typeof n&&n==n?o.cycle=n:"string"==typeof n?o.start=n:"boolean"==typeof n&&(o.manual=n),o),r=this.getClockIds(F(t,i),o),c=this;return Object.assign(i,{clock:r.clock,polling:r.polling,callback:t,options:e,check:function(){return{polling:c.polling.find(r.polling),clock:c.clock.find(r.clock)}},next:function(){c.polling.next(r.polling)},clear:function(){c.clock.stop(r.clock),c.polling.stop(r.polling)},sleep:function(){c.clock.sleep(r.clock),c.polling.sleep(r.polling)},notify:function(){c.clock.notify(r.clock),c.polling.notify(r.polling)},reset:function(t){if("object"!==R(t=void 0===t?e:t))throw new TypeError("only object:\n                        {start: 0,//start time\n                        cycle: 0, //循环周期ms\n                        count: Infinity, //repeat 次数\n                        immediate: false, //立即执行\n                        manual: false,//手动开始下一次轮询\n                    }");void 0!==t.start&&c.clock.reset(t.start),c.polling.reset(t)}}),o.immediate&&t(i),i}}])&&function(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}(t.prototype,e),t}());M=void 0,e=function(t){t.default=q,t.setTimeout=q.setTimeout.bind(q),t.setInterval=q.setInterval.bind(q),t.setClock=q.setClock.bind(q),t.clear=q.clear.bind(q),t.clearAll=q.clearAll.bind(q),t.sleep=q.sleep.bind(q),t.sleepAll=q.sleepAll.bind(q),t.notify=q.notify.bind(q),t.notifyAll=q.notifyAll.bind(q)},"object"===("undefined"==typeof exports?"undefined":R(exports))?e(exports):"function"==typeof define&&t.amdO?define(["exports"],e):e((M="undefined"!=typeof globalThis?globalThis:M||self).clock_polling={})})();