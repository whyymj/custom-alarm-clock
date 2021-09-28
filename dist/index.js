/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var t={amdO:{}};function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),t.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},t.r({}),function(){for(var e=0,n=["webkit","moz"],r=0;r<n.length&&!t.g.requestAnimationFrame;++r)t.g.requestAnimationFrame=t.g[n[r]+"RequestAnimationFrame"],t.g.cancelAnimationFrame=t.g[n[r]+"CancelAnimationFrame"]||t.g[n[r]+"CancelRequestAnimationFrame"];t.g.requestAnimationFrame||(t.g.requestAnimationFrame=function(n){var r=(new Date).getTime(),o=Math.max(0,16.7-(r-e)),i=t.g.setTimeout((function(){n(r+o)}),o);return e=r+o,i}),t.g.cancelAnimationFrame||(t.g.cancelAnimationFrame=function(t){clearTimeout(t)})}();const n=new(function(){function t(){var e,n,r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=[],(e="callbacks")in this?Object.defineProperty(this,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):this[e]=n;var o=(new Date).getTime(),i=0;!function t(){return r.callbacks.forEach((function(t){t(i)})),i=(new Date).getTime()-o,o+=i,requestAnimationFrame(t)}()}var n;return(n=[{key:"add",value:function(t){var n,r=function(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(r="Object"===r&&t.constructor?t.constructor.name:r)||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0;return{s:n=function(){},n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw i}}}}(this.callbacks);try{for(r.s();!(n=r.n()).done;)if(n.value===t)return}catch(t){r.e(t)}finally{r.f()}this.callbacks.push(t)}},{key:"remove",value:function(t){this.callbacks=this.callbacks.filter((function(e){return e!==t}))}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(t.prototype,n),t}());function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}var f=function(){function t(){u(this,t)}return l(t,[{key:"notify",value:function(t){this.get(t).forEach((function(t){t.notify()}))}},{key:"notifyAll",value:function(){this.notify(taskPool.getAll())}},{key:"notifyGroup",value:function(t){this.notify(taskPool.getGroup(t))}},{key:"sleep",value:function(t){console.log(t,"********"),this.get(t).forEach((function(t){t.sleep()}))}},{key:"sleepAll",value:function(){this.sleep(taskPool.getAll())}},{key:"sleepGroup",value:function(t){this.sleep(taskPool.getGroup(t))}},{key:"delay",value:function(t){this.get(t).forEach((function(t){t.delay()}))}},{key:"delayAll",value:function(){this.delay(taskPool.getAll())}},{key:"delayGroup",value:function(t){this.delay(taskPool.getGroup(t))}},{key:"stop",value:function(t){this.get(t).forEach((function(t){t.stop()}))}},{key:"stopAll",value:function(){this.tasks={},this.delayProcess={},this.namedTasks={},this.group={}}},{key:"stopGroup",value:function(t){this.stop(taskPool.getGroup(t))}},{key:"next",value:function(t){this.get(t).forEach((function(t){t.next()}))}}]),t}();const y=new(function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(e,f);var t=function(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=a(t);return function(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return i(t)}(this,e?(n=a(this).constructor,Reflect.construct(o,arguments,n)):o.apply(this,arguments))}}(e);function e(){var r;u(this,e),c(i(r=t.call(this)),"tasks",{}),c(i(r),"delayProcess",{}),c(i(r),"namedTasks",{}),c(i(r),"group",{});var o,a=(new Date).getTime();return n.add((function(){o=(new Date).getTime()-a,a+=o,r.forEach((function(t,e){t.delaying||(0<t.count?t.leftTime<0?(t.manual&&r.manualTask(t),a>=t.nextTime&&t.run(a)):t.leftTime=t.leftTime-o:r.remove(e))}))})),r}return l(e,[{key:"forEach",value:function(t){for(var e in this.tasks)t(this.tasks[e],e)}},{key:"add",value:function(t){void 0!==t.name&&(void 0!==this.namedTasks[t.name]&&this.find(this.namedTasks[t.name]).forEach((function(t){t.stop()})),this.namedTasks[t.name]=t.id),void 0!==t.groupName&&(this.group[t.id]=t.groupName),t.delaying?t.delay():this.tasks[t.id]=t}},{key:"remove",value:function(t){var e=this;this.get(t).forEach((function(n){void 0!==n.name&&delete e.namedTasks[n.name],void 0!==n.groupName&&delete e.group[n.id],"function"==typeof n.eventListener&&n.eventListener("destroy",n),delete e.delayProcess[n.id],delete e.tasks[t]}))}},{key:"get",value:function(t){var e=this;return void 0===t?[]:Array.isArray(t)?t.map((function(t){return e.find(t)})).flat(1/0).filter(Boolean):"object"==r(t)&&t.id?this.get(t.id):[this.tasks[t]||this.delayProcess[t]].filter(Boolean)}},{key:"getGroup",value:function(t){if(void 0!==t){var e,n=[];for(e in this.group)this.group[e]===t&&n.push(e);return this.get(n)}console.error("请输入groupName")}},{key:"update",value:function(){}},{key:"manualTask",value:function(t){var e=this;this.get(t).forEach((function(t){e.delayProcess[t.id]=t,delete e.tasks[t.id]}))}},{key:"autoTask",value:function(t){var e=this;this.get(t).forEach((function(t){e.tasks[t.id]=t,delete e.delayProcess[t.id]}))}},{key:"getAll",value:function(){var t,e,n=[];for(t in this.tasks)n.push(this.tasks[t]);for(e in this.delayProcess)n.push(this.delayProcess[e]);return n}}]),e}());function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function g(t,e,n){return e&&m(t.prototype,e),n&&m(t,n),t}function k(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var O=function(){function t(e,n){v(this,t),k(this,"id",void 0),k(this,"cycle",1),k(this,"count",1/0),k(this,"immediate",!1),k(this,"manual",!1),k(this,"sleeping",!1),k(this,"delaying",!1),k(this,"delayable",!0),k(this,"sleepable",!0),k(this,"stopable",!0),k(this,"name",void 0),k(this,"itercount",0),k(this,"canNextCircle",!0),k(this,"callbacks",[]),k(this,"yieldIdx",0),k(this,"nextTime",0),k(this,"leftTime",0),k(this,"skip",null),k(this,"groupName",void 0),k(this,"eventListener",null),t.idx++,this.id=t.idx,this.setOption(n),this.add(e),"function"==typeof this.eventListener&&this.eventListener("created",this)}return g(t,[{key:"add",value:function(t){var e=this;if(Array.isArray(t))t.forEach((function(t){e.add(t)}));else if("function"==typeof t){var n,r=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0;return{s:e=function(){},n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){a=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw o}}}}(this.callbacks);try{for(r.s();!(n=r.n()).done;)if(n.value===t)return}catch(t){r.e(t)}finally{r.f()}this.callbacks.push(t)}}},{key:"setOption",value:function(t){if("number"==typeof t&&t==t)this.cycle=t;else if("object"===b(t)){var e,n=["notify","sleep","stop","next","canNextCircle","nextTime","callbacks","leftTime","constructor"];for(e in t)void 0!==t[e]&&(n.includes(e)||(this[e]=t[e]))}var r;this.cycle=Math.max(this.cycle,1)||1,this.leftTime=this.immediate?0:this.cycle,this.delaying||(r=(new Date).getTime(),this.immediate?this.nextTime=r:this.nextTime=r+this.cycle)}},{key:"refresh",value:function(){var t=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],e=(new Date).getTime();this.yieldIdx=0;var n,r,o=(n=this.nextTime,r=e,o=this.cycle,n<=r?Math.max(1,Math.ceil((r-n)/o)):0);this.nextTime=this.nextTime+this.cycle*o,this.leftTime=this.nextTime-e,this.canNextCircle=!0,this.sleeping||this.delaying||!t||(this.itercount++,this.count--),"function"==typeof this.eventListener&&this.eventListener("refreshed",this)}},{key:"notify",value:function(){var t=(new Date).getTime();console.log(this.delaying,"::::: 1",new Date(this.nextTime),this.leftTime),this.delaying&&(this.nextTime=t+this.leftTime),console.log("::::: 2",new Date(this.nextTime),this.leftTime),this.nextTime||(this.immediate?this.nextTime=t:this.nextTime=t+this.cycle),this.delaying=!1,this.sleeping=!1,"function"==typeof this.eventListener&&this.eventListener("notified",this),y.autoTask(this)}},{key:"sleep",value:function(){this.sleepable&&(this.sleeping=!0,"function"==typeof this.eventListener&&this.eventListener("sleeped",this))}},{key:"delay",value:function(){this.delayable&&(this.delaying=!0,"function"==typeof this.eventListener&&this.eventListener("delayed",this),y.manualTask(this))}},{key:"next",value:function(){this.delaying||this.sleeping||!this.manual||(this.canNextCircle?(this.canNextCircle=!1,y.autoTask(this)):task.nextStep(callback))}},{key:"stop",value:function(){this.stopable&&("function"==typeof this.eventListener&&this.eventListener("cleared",this),manualTask.remove(this))}}]),t}();O.idx=0;var w=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,O);var t=function(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h(t);return function(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t)}(this,e?(n=h(this).constructor,Reflect.construct(r,arguments,n)):r.apply(this,arguments))}}(e);function e(n,r){return v(this,e),t.call(this,n,r)}return g(e,[{key:"nextStep",value:function(){0<this.leftTime||this.sleeping||this.delaying||(this.skip&&this.skip()?this.refresh(!1):(this.yieldIdx<this.callbacks.length&&(this.callbacks[this.yieldIdx](),this.yieldIdx++),this.yieldIdx>=this.callbacks.length&&this.refresh()))}},{key:"run",value:function(){if(this.skip&&this.skip())this.refresh(!1);else{if(!this.sleeping){if(this.manual)return void this.nextStep();this.callbacks.forEach((function(t){return t()}))}this.refresh()}}}]),e}();var j=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e;return(e=[{key:"add",value:function(t){var e=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return Array.isArray(n)?n.map((function(n){return e.add(t,n)})):(n=new w(t,n),y.add(n),n)}},{key:"reset",value:function(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;return this.stop(t),this.add(e,n)}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(t.prototype,e),t}();function P(t){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function T(t){return"object"==P(t=0<arguments.length&&void 0!==t?t:0)&&t.start?T(t.start):("string"==typeof t?t=new Date(t).getTime():t instanceof Date?t=t.getTime():"object"==P(t)?t=function(t,e,n,r,o,i,a){var c=0<arguments.length&&void 0!==t?t:-1;return t=1<arguments.length&&void 0!==e?e:-1,e=2<arguments.length&&void 0!==n?n:-1,n=3<arguments.length&&void 0!==r?r:-1,r=4<arguments.length&&void 0!==o?o:-1,o=5<arguments.length&&void 0!==i?i:-1,i=6<arguments.length&&void 0!==a?a:-1,c=parseInt(c),t=parseInt(t),e=parseInt(e),n=parseInt(n),r=parseInt(r),o=parseInt(o),i=parseInt(i),a=new Date,c=-1<c?c:a.getFullYear(),t=-1<t?t:a.getMonth()+1,e=-1<e?e:a.getDate(),n=-1<n?n:a.getHours(),r=-1<r?r:a.getMinutes(),o=-1<o?o:a.getSeconds(),i=-1<i?i:a.getMilliseconds(),new Date("".concat(c,"/").concat(t,"/").concat(e," ").concat(n,":").concat(r,":").concat(o,":").concat(i))}(t.year,t.month,t.day,t.hour,t.min,t.sec,t.msec).getTime():"number"==typeof t&&(t=(new Date).getTime()+t),"number"==typeof t?t:(new Date).getTime())}function S(t,e,n){return(S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){if(t=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=A(t)););return t}(t,e),t)return(e=Object.getOwnPropertyDescriptor(t,e)).get?e.get.call(n):e.value})(t,e,n||t)}function x(t,e){return(x=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function A(t){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function E(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)),r}function D(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?E(Object(n),!0).forEach((function(e){var r,o;r=t,e=n[o=e],o in r?Object.defineProperty(r,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[o]=e})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function I(t){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)),r}function R(t){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function C(t,e){var n;if("function"==typeof t)n=function(){return t(e)};else{if(!Array.isArray(t))throw new Error("callbacks are needed");n=t.map((function(t){if("function"==typeof t)return function(){return t(e)}})).filter(Boolean)}return n}function G(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)),r}function L(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?G(Object(n),!0).forEach((function(e){M(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function M(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function F(t){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var B=new(function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&x(t,e)}(n,j);var t,e=function(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=A(t);return function(t,e){if(e&&("object"===I(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t)}(this,e?(n=A(this).constructor,Reflect.construct(r,arguments,n)):r.apply(this,arguments))}}(n);function n(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),e.call(this)}return(t=[{key:"add",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r=(new Date).getTime();return e=function(t){var e={cycle:1e3,count:1,immediate:!1,manual:!1},n=(new Date).getTime();(e="object"==I(t)?D(D({},e),t):e).start=T(t)||n;var r=e.start;return t=e.cycle||1,e.count=e.count+Math.min(Math.floor((r-n)/t),0),e.start=Math.max(Math.ceil((n-r)/t),0)*t+r,e}(e),(t=S(A(n.prototype),"add",this).call(this,t,e)).leftTime=e.start-r,t.nextTime=e.start,t}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(n.prototype,t),n}()),N=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),M(this,"status",void 0),M(this,"taskIds",void 0),M(this,"options",void 0),M(this,"callback",void 0),this.callback=C(e,this),this.options=function(t){var e={cycle:1e3,count:1,immediate:!1,manual:!1};return"object"==F(t)?e=L(L({},e),t):"number"==typeof t&&t==t?e.cycle=t:"string"==typeof t?e.start=t:"boolean"==typeof t&&(e.manual=t),e}.call(this,n);var o=this.options.eventListener;this.options.eventListener=function(t,e){"function"==typeof o&&o(t,r),r.status=r},this.taskIds=B.add(this.callback,this.options).id}var e;return(e=[{key:"clear",value:function(){y.stop(this.taskIds)}},{key:"sleep",value:function(){y.sleep(this.taskIds)}},{key:"delay",value:function(){y.delay(this.taskIds)}},{key:"notify",value:function(){y.notify(this.taskIds)}},{key:"reset",value:function(t){this.taskIds=polling.reset(this.taskIds,this.callback,void 0===t?this.options:t)}},{key:"next",value:function(){y.next(this.taskIds)}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(t.prototype,e),t}();function q(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var H=new j,U=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),q(this,"status",void 0),q(this,"taskIds",void 0),q(this,"options",void 0),q(this,"callback",void 0),this.callback=C(e,this),this.options=function(t){var e=this,n="object"===R(t)?function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?_(Object(n),!0).forEach((function(e){var r,o;r=t,e=n[o=e],o in r?Object.defineProperty(r,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[o]=e})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t):{cycle:t};return n.eventListener=function(n){"function"==typeof t.eventListener&&t.eventListener(n),e.status=n},n}.call(this,n),this.taskIds=H.add(this.callback,this.options).id}var e;return(e=[{key:"clear",value:function(){y.stop(this.taskIds)}},{key:"sleep",value:function(){y.sleep(this.taskIds)}},{key:"delay",value:function(){y.delay(this.taskIds)}},{key:"notify",value:function(){y.notify(this.taskIds)}},{key:"reset",value:function(t){this.taskIds=H.reset(this.taskIds,this.callback,void 0===t?this.options:t)}},{key:"next",value:function(){y.next(this.taskIds)}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(t.prototype,e),t}();function $(t,e){return($=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function z(t){return(z=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Y(t){return(Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function J(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)),r}function K(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?J(Object(n),!0).forEach((function(e){var r,o;r=t,e=n[o=e],o in r?Object.defineProperty(r,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[o]=e})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):J(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var Q=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&$(t,e)}(e,N);var t=function(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=z(t);return function(t,e){if(e&&("object"===Y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t)}(this,e?(n=z(this).constructor,Reflect.construct(r,arguments,n)):r.apply(this,arguments))}}(e);function e(n,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),t.call(this,n,(n={cycle:1,count:1,immediate:!1,manual:!1},(r=r)instanceof Date?n=K(K({},n),{},{start:r}):"number"==typeof r&&r==r||"string"==typeof r?n.start=r:"object"==Y(r)&&(n=K(K({},n),{},{start:r.start})),n))}return e}();function V(t){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var W,X,Z=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e;return(e=[{key:"clear",value:function(t){"object"==V(t)&&t.clear&&t.clear()}},{key:"clearAll",value:function(){y.stopAll()}},{key:"clearGroup",value:function(t){y.stopGroup(t)}},{key:"sleep",value:function(t){"object"==V(t)&&t.sleep&&t.sleep()}},{key:"sleepAll",value:function(){taskPoolk.sleepAll()}},{key:"sleepGroup",value:function(t){y.sleepGroup(t)}},{key:"delay",value:function(t){"object"==V(t)&&t.delay&&t.delay()}},{key:"delayAll",value:function(){y.delayAll()}},{key:"delayGroup",value:function(t){y.delayGroup(t)}},{key:"notify",value:function(t){y.notify(t)}},{key:"notifyAll",value:function(){y.notifyAll()}},{key:"notifyGroup",value:function(t){y.notifyGroup(t)}},{key:"setTimeout",value:function(t,e){return new Q(t,e)}},{key:"setInterval",value:function(t,e){return new U(t,e)}},{key:"setClock",value:function(t,e){return new N(t,e)}},{key:"setDailyClock",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{h:0,m:0,s:0,ms:0},n=new Date;n.setHours(e.h||0),n.setMinutes(e.m||0),n.setSeconds(e.s||0),n.setMilliseconds(e.ms||0),this.setClock(t,{start:n,count:1/0,cycle:864e5})}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(t.prototype,e),t}());W=void 0,X=function(t){t.default=Z,t.setTimeout=Z.setTimeout,t.setInterval=Z.setInterval,t.setClock=Z.setClock,t.clear=Z.clear.bind(Z),t.clearGroup=Z.clearGroup.bind(Z),t.clearAll=Z.clearAll.bind(Z),t.sleep=Z.sleep.bind(Z),t.sleepGroup=Z.sleepGroup.bind(Z),t.sleepAll=Z.sleepAll.bind(Z),t.delay=Z.delay.bind(Z),t.delayGroup=Z.delayGroup.bind(Z),t.delayAll=Z.delayAll.bind(Z),t.notify=Z.notify.bind(Z),t.notifyGroup=Z.notifyGroup.bind(Z),t.notifyAll=Z.notifyAll.bind(Z),t.setDailyClock=Z.setDailyClock.bind(Z)},"object"===("undefined"==typeof exports?"undefined":V(exports))?X(exports):"function"==typeof define&&t.amdO?define(["exports"],X):X((W="undefined"!=typeof globalThis?globalThis:W||self).clock_polling={})})();