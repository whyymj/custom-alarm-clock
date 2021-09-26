/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={amdO:{}};function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,o=c(e);return function(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return a(e)}(this,n?(r=c(this).constructor,Reflect.construct(o,arguments,r)):o.apply(this,arguments))}}function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),e.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.r({});var y=function(){function e(){s(this,e)}return f(e,[{key:"notify",value:function(e){this.get(e).forEach((function(e){e.notify()}))}},{key:"notifyAll",value:function(){this.notify(p.getAll())}},{key:"notifyGroup",value:function(e){this.notify(p.getGroup(e))}},{key:"sleep",value:function(e){this.get(e).forEach((function(e){e.sleep()}))}},{key:"sleepAll",value:function(){this.sleep(p.getAll())}},{key:"sleepGroup",value:function(e){this.sleep(p.getGroup(e))}},{key:"delay",value:function(e){this.get(e).forEach((function(e){e.delay()}))}},{key:"delayAll",value:function(){this.delay(p.getAll())}},{key:"delayGroup",value:function(e){this.delay(p.getGroup(e))}},{key:"stop",value:function(e){this.get(e).forEach((function(e){e.stop()}))}},{key:"stopAll",value:function(){this.tasks={},this.delayProcess={},this.namedTasks={},this.group={}}},{key:"stopGroup",value:function(e){this.stop(p.getGroup(e))}},{key:"next",value:function(e){this.get(e).forEach((function(e){e.next()}))}}]),e}(),p=new(function(){r(t,y);var e=i(t);function t(){var n;s(this,t);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return u(a(n=e.call.apply(e,[this].concat(o))),"tasks",{}),u(a(n),"delayProcess",{}),u(a(n),"namedTasks",{}),u(a(n),"group",{}),n}return f(t,[{key:"forEach",value:function(e){for(var t in this.tasks)e(this.tasks[t],t)}},{key:"add",value:function(e){void 0!==e.name&&(void 0!==this.namedTasks[e.name]&&this.find(this.namedTasks[e.name]).forEach((function(e){e.stop()})),this.namedTasks[e.name]=e.id),void 0!==e.groupName&&(this.group[e.id]=e.groupName),e.delaying?e.delay():this.tasks[e.id]=e,this.tasks[k]=e}},{key:"remove",value:function(e){var t=this;this.get(e).forEach((function(n){void 0!==n.name&&delete t.namedTasks[n.name],void 0!==n.groupName&&delete t.group[n.id],"function"==typeof n.eventListener&&n.eventListener("destroy",n),delete t.delayProcess[n.id],delete t.tasks[e]}))}},{key:"get",value:function(e){var t=this;return void 0===e?[]:Array.isArray(e)?e.map((function(e){return t.find(e)})).flat(1/0).filter(Boolean):e instanceof b?this.get(e.id):[this.tasks[e]||this.delayProcess[e]].filter(Boolean)}},{key:"getGroup",value:function(e){if(void 0!==e){var t,n=[];for(t in this.group)this.group[t]===e&&n.push(t);return this.get(n)}console.error("请输入groupName")}},{key:"update",value:function(){}},{key:"manualTask",value:function(e){var t=this;this.get(e).forEach((function(e){t.delayProcess[e.id]=e,delete t.tasks[e.id]}))}},{key:"autoTask",value:function(e){var t=this;this.get(e).forEach((function(e){t.tasks[e.id]=e,delete t.delayProcess[e.id]}))}},{key:"getAll",value:function(){var e,t,n=[];for(e in this.tasks)n.push(this.tasks[e]);for(t in this.delayProcess)n.push(this.delayProcess[t]);return n}}]),t}()),h=function(){function e(t,n){s(this,e),u(this,"id",void 0),u(this,"cycle",1),u(this,"count",1/0),u(this,"immediate",!1),u(this,"manual",!1),u(this,"sleeping",!1),u(this,"delaying",!1),u(this,"delayable",!0),u(this,"sleepable",!0),u(this,"stopable",!0),u(this,"name",void 0),u(this,"itercount",0),u(this,"canNextCircle",!0),u(this,"callbacks",[]),u(this,"yieldIdx",0),u(this,"nextTime",0),u(this,"leftTime",0),u(this,"skip",null),u(this,"groupName",void 0),u(this,"eventListener",null),e.idx++,this.id=e.idx,this.setOption(n),this.add(t),"function"==typeof this.eventListener&&this.eventListener("created",this)}return f(e,[{key:"add",value:function(e){var t=this;if(Array.isArray(e))e.forEach((function(e){t.add(e)}));else if("function"==typeof e){var r,o=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0;return{s:t=function(){},n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){c=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw i}}}}(this.callbacks);try{for(o.s();!(r=o.n()).done;)if(r.value===e)return}catch(e){o.e(e)}finally{o.f()}this.callbacks.push(e)}}},{key:"setOption",value:function(e){if("number"==typeof e&&e==e)this.cycle=e;else if("object"===t(e)){var n,r=["notify","sleep","stop","next","canNextCircle","nextTime","callbacks","leftTime","constructor"];for(n in e)void 0!==e[n]&&(r.includes(n)||(this[n]=e[n]))}var o;this.cycle=Math.max(this.cycle,1)||1,this.leftTime=this.immediate?0:this.cycle,this.delaying||(o=(new Date).getTime(),this.immediate?this.nextTime=o:this.nextTime=o+this.cycle)}},{key:"refresh",value:function(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],t=new Date;this.yieldIdx=0;var n=function(e,t,n){return e<=t?Math.max(1,Math.ceil((t-e)/n)):0}(this.nextTime,t.getTime(),this.cycle);this.nextTime=this.nextTime+this.cycle*n,this.leftTime=this.nextTime-t.getTime(),this.canNextCircle=!0,this.sleeping||this.delaying||!e||(this.itercount++,this.count--),"function"==typeof this.eventListener&&this.eventListener("refreshed",this)}},{key:"notify",value:function(){var e=(new Date).getTime();this.delaying&&(this.nextTime=e+this.leftTime),this.nextTime||(this.immediate?this.nextTime=e:this.nextTime=e+this.cycle),this.delaying=!1,this.sleeping=!1,"function"==typeof this.eventListener&&this.eventListener("notified",this),p.autoTask(this)}},{key:"sleep",value:function(){this.sleepable&&(this.sleeping=!0,"function"==typeof this.eventListener&&this.eventListener("sleeped",this))}},{key:"delay",value:function(){this.delayable&&(this.delaying=!0,"function"==typeof this.eventListener&&this.eventListener("delayed",this),p.manualTask(this))}},{key:"next",value:function(){this.delaying||this.sleeping||!this.manual||(this.canNextCircle?(this.canNextCircle=!1,p.autoTask(this)):task.nextStep(callback))}},{key:"stop",value:function(){this.stopable&&("function"==typeof this.eventListener&&this.eventListener("cleared",this),manualTask.remove(this))}}]),e}();h.idx=0;var b=function(){r(t,h);var e=i(t);function t(n,r){return s(this,t),e.call(this,n,r)}return f(t,[{key:"nextStep",value:function(){0<this.leftTime||this.sleeping||this.delaying||(this.skip&&this.skip()?this.refresh(!1):(this.yieldIdx<this.callbacks.length&&(this.callbacks[this.yieldIdx](),this.yieldIdx++),this.yieldIdx>=this.callbacks.length&&this.refresh()))}},{key:"run",value:function(){if(this.skip&&this.skip())this.refresh(!1);else{if(!this.sleeping){if(this.manual)return void this.nextStep();this.callbacks.forEach((function(e){return e()}))}this.refresh()}}}]),t}();function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),d(this,"tasks",{}),d(this,"namedTasks",{}),d(this,"group",{}),d(this,"delayProcess",{}),this.mainThread=function(e,t,n){p.forEach((function(e,t){e.delaying||(0<e.count?(e.leftTime=e.leftTime-n,e.leftTime<=0&&(e.manual&&p.manualTask(e),e.run())):p.remove(t))}))},t.add(this.mainThread)}var t;return(t=[{key:"add",value:function(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return Array.isArray(n)?n.map((function(n){return t.add(e,n)})):(e=new b(callback,n),p.add(e),e)}},{key:"reset",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;return this.stop(e),this.add(t,n)}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}();function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e){return"object"==m(e=0<arguments.length&&void 0!==e?e:0)&&e.start?g(e.start):("string"==typeof e?e=new Date(e).getTime():e instanceof Date?e=e.getTime():"object"==m(e)?e=function(e,t,n,r,o,i,a){var c=0<arguments.length&&void 0!==e?e:-1;return e=1<arguments.length&&void 0!==t?t:-1,t=2<arguments.length&&void 0!==n?n:-1,n=3<arguments.length&&void 0!==r?r:-1,r=4<arguments.length&&void 0!==o?o:-1,o=5<arguments.length&&void 0!==i?i:-1,i=6<arguments.length&&void 0!==a?a:-1,c=parseInt(c),e=parseInt(e),t=parseInt(t),n=parseInt(n),r=parseInt(r),o=parseInt(o),i=parseInt(i),a=new Date,c=-1<c?c:a.getFullYear(),e=-1<e?e:a.getMonth()+1,t=-1<t?t:a.getDate(),n=-1<n?n:a.getHours(),r=-1<r?r:a.getMinutes(),o=-1<o?o:a.getSeconds(),i=-1<i?i:a.getMilliseconds(),new Date("".concat(c,"/").concat(e,"/").concat(t," ").concat(n,":").concat(r,":").concat(o,":").concat(i))}(e.year,e.month,e.day,e.hour,e.min,e.sec,e.msec).getTime():"number"==typeof e&&(e=(new Date).getTime()+e),"number"==typeof e?e:(new Date).getTime())}function O(e,t,n){return(O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){if(e=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=j(e)););return e}(e,t),e)return(t=Object.getOwnPropertyDescriptor(e,t)).get?t.get.call(n):t.value})(e,t,n||e)}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function T(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)),r}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){var r,o;r=e,t=n[o=t],o in r?Object.defineProperty(r,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[o]=t})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var A=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(n,v);var e,t=function(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=j(e);return function(e,t){if(t&&("object"===S(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e)}(this,t?(n=j(this).constructor,Reflect.construct(r,arguments,n)):r.apply(this,arguments))}}(n);function n(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t.call(this,e)}return(e=[{key:"add",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r=(new Date).getTime();return t=function(e){var t={cycle:1e3,count:1,immediate:!1,manual:!1},n=(new Date).getTime();(t="object"==S(e)?P(P({},t),e):t).start=g(e)||n;var r=t.start;return e=t.cycle||1,t.count=t.count+Math.min(Math.floor((r-n)/e),0),t.start=new Date(Math.max(Math.ceil((n-r)/e),0)*e+r),t}(t),(e=O(j(n.prototype),"add",this).call(this,e,t)).leftTime=t.start-r,e.nextTime=t.start,e}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(n.prototype,e),n}();function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}!function(){for(var t=0,n=["webkit","moz"],r=0;r<n.length&&!e.g.requestAnimationFrame;++r)e.g.requestAnimationFrame=e.g[n[r]+"RequestAnimationFrame"],e.g.cancelAnimationFrame=e.g[n[r]+"CancelAnimationFrame"]||e.g[n[r]+"CancelRequestAnimationFrame"];e.g.requestAnimationFrame||(e.g.requestAnimationFrame=function(n){var r=(new Date).getTime(),o=Math.max(0,16.7-(r-t)),i=e.g.setTimeout((function(){n(r+o)}),o);return t=r+o,i}),e.g.cancelAnimationFrame||(e.g.cancelAnimationFrame=function(e){clearTimeout(e)})}();var E=new(function(){function e(){var t,n,r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n=[],(t="callbacks")in this?Object.defineProperty(this,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):this[t]=n;var o=new Date,i=o,a=o.getTime(),c=a;!function e(){i=new Date,c=i.getTime(),r.callbacks.forEach((function(e){e(o,i,c-a)})),o=i,a=c,requestAnimationFrame(e)}()}var t;return(t=[{key:"add",value:function(e){var t,n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?x(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return{s:t=function(){},n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){a=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw o}}}}(this.callbacks);try{for(n.s();!(t=n.n()).done;)if(t.value===e)return}catch(e){n.e(e)}finally{n.f()}this.callbacks.push(e)}},{key:"remove",value:function(e){this.callbacks=this.callbacks.filter((function(t){return t!==e}))}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}());function I(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)),r}function D(e){return(D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(e,t){var n;if("function"==typeof e)n=function(){return e(t)};else{if(!Array.isArray(e))throw new Error("callbacks are needed");n=e.map((function(e){if("function"==typeof e)return function(){return e(t)}})).filter(Boolean)}return n}function G(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)),r}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function L(e){return(L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var M=new A(E),F=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),C(this,"status",void 0),C(this,"taskIds",void 0),C(this,"options",void 0),C(this,"callback",void 0),this.callback=_(t,this),this.options=function(e){var t={cycle:1e3,count:1,immediate:!1,manual:!1};return"object"==L(e)?t=R(R({},t),e):"number"==typeof e&&e==e?t.cycle=e:"string"==typeof e?t.start=e:"boolean"==typeof e&&(t.manual=e),t}.call(this,n);var o=this.options.eventListener;this.options.eventListener=function(e,t){"function"==typeof o&&o(e,r),r.status=r},this.taskIds=M.add(this.callback,this.options).id}var t;return(t=[{key:"check",value:function(){return M.find(this.taskIds)}},{key:"clear",value:function(){M.stop(this.taskIds)}},{key:"sleep",value:function(){M.sleep(this.taskIds)}},{key:"delay",value:function(){M.delay(this.taskIds)}},{key:"notify",value:function(){M.notify(this.taskIds)}},{key:"reset",value:function(e){this.taskIds=M.reset(this.taskIds,this.callback,void 0===e?this.options:e)}},{key:"next",value:function(){M.next(this.taskIds)}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}();function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B=new v(E),q=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),N(this,"status",void 0),N(this,"taskIds",void 0),N(this,"options",void 0),N(this,"callback",void 0),this.callback=_(t,this),this.options=function(e){var t=this,n="object"===D(e)?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){var r,o;r=e,t=n[o=t],o in r?Object.defineProperty(r,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[o]=t})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e):{cycle:e};return n.eventListener=function(n){"function"==typeof e.eventListener&&e.eventListener(n),t.status=n},n}.call(this,n),this.taskIds=B.add(this.callback,this.options).id}var t;return(t=[{key:"clear",value:function(){p.stop(this.taskIds)}},{key:"sleep",value:function(){p.sleep(this.taskIds)}},{key:"delay",value:function(){p.sleep(this.taskIds)}},{key:"notify",value:function(){p.notify(this.taskIds)}},{key:"reset",value:function(e){this.taskIds=B.reset(this.taskIds,this.callback,void 0===e?this.options:e)}},{key:"next",value:function(){p.next(this.taskIds)}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}();function U(e,t){return(U=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function $(e){return($=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function z(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)),r}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?z(Object(n),!0).forEach((function(t){var r,o;r=e,t=n[o=t],o in r?Object.defineProperty(r,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[o]=t})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):z(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Y(e){return(Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var J=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&U(e,t)}(t,F);var e=function(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=$(e);return function(e,t){if(t&&("object"===Y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e)}(this,t?(n=$(this).constructor,Reflect.construct(r,arguments,n)):r.apply(this,arguments))}}(t);function t(n,r){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),e.call(this,n,(n={cycle:1,count:1,immediate:!1,manual:!1},"object"==Y(r=r)?n=H(H({},n),{},{start:r.start}):("number"==typeof r&&r==r||"string"==typeof r)&&(n.start=r),n))}return t}();function K(e){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Q=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t;return(t=[{key:"clear",value:function(e){"object"==K(e)&&e.clear&&e.clear()}},{key:"clearAll",value:function(){p.stopAll()}},{key:"sleep",value:function(e){"object"==K(e)&&e.sleep&&e.sleep()}},{key:"delay",value:function(e){"object"==K(e)&&e.delay&&e.delay()}},{key:"delayAll",value:function(){p.delayAll()}},{key:"delayGroup",value:function(e){p.delayGroup(e)}},{key:"sleepAll",value:function(){taskPoolk.sleepAll()}},{key:"notify",value:function(e){p.notify(e)}},{key:"notifyAll",value:function(){p.notifyAll()}},{key:"clearGroup",value:function(e){p.stopGroup(e)}},{key:"sleepGroup",value:function(e){p.sleepGroup(e)}},{key:"notifyGroup",value:function(e){p.notifyGroup(e)}},{key:"setTimeout",value:function(e,t){return new J(e,t)}},{key:"setInterval",value:function(e,t){return new q(e,t)}},{key:"setClock",value:function(e,t){return new F(e,t)}},{key:"setDailyClock",value:function(e){this.setClock(e,1<arguments.length&&void 0!==arguments[1]?arguments[1]:{h:0,m:0,s:0,ms:0,times:1})}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}());A=void 0,E=function(e){e.default=Q,e.setTimeout=Q.setTimeout,e.setInterval=Q.setInterval,e.setClock=Q.setClock.bind(Q),e.clear=Q.clear.bind(Q),e.clearGroup=Q.clearGroup.bind(Q),e.clearAll=Q.clearAll.bind(Q),e.sleep=Q.sleep.bind(Q),e.sleepGroup=Q.sleepGroup.bind(Q),e.sleepAll=Q.sleepAll.bind(Q),e.delay=Q.delay.bind(Q),e.delayGroup=Q.delayGroup.bind(Q),e.delayAll=Q.delayAll.bind(Q),e.notify=Q.notify.bind(Q),e.notifyGroup=Q.notifyGroup.bind(Q),e.notifyAll=Q.notifyAll.bind(Q)},"object"===("undefined"==typeof exports?"undefined":K(exports))?E(exports):"function"==typeof define&&e.amdO?define(["exports"],E):E((A="undefined"!=typeof globalThis?globalThis:A||self).clock_polling={})})();