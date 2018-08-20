## javaScript中的函数节流与函数防抖

问题：在实际开发中我们很可能用到resize和mousemove等事件，但是这些会频繁的触发，如果是在对应的事件处理函数写一些操作dom的方法的话或者说发送一些ajax请求的话，这样肯定非常耗性能，并且给用户的体验也不好。

### 函数节流

 **函数节流的原理**：持续触发一个事件，每隔一段的时间，事件只会执行一次。simplely speaking，就像一个水龙头，我们把它关得很小，流水事件一直在触发，但是是每隔一定的事件才滴出一滴水滴。

 **实现方式：** 一般有两种，第一就是使用时间戳，第二就是使用setTimeout定时器。

 使用时间戳方式：当我们触发事件的时候，取出当前的时间戳，求出当前时间戳和前一次执行的时间戳的差值，如果差值大于我们设定的时间间隔，那么就执行该动作，并更新执行时间，否则，就不执行该动作。

 ```javascript
 //《JavaScript高级程序设计》
 //节流函数
 function throttle(method,context){
     //清除上一次的定时器
     clearTimeout(method.tId);
     //重新设置定时器，设定当前周期之后调用
     method.tId = setTimeout(function(){
         //这里是真正要执行的操作
         method.call(context);
     },100);
 }
 
 //处理函数
 function handOpe(){
     /*do something what you want*/
 }
 
 //regist the aciton at the object named window
 window.onresize = function(){
     throttle(handOpe,window);
 }
 ```

 使用定时器方式：使用定时器的原理就是，当事件触发的时候，检查定时器是否存在，如果存在说明函数还没有执行（因为函数执行中我们清空了timeoutId）所以这个时候我们就不执行，等它执行，并清空定时器，这个时候就可以设置下一个定时器了。

 ```javascript
 
 ```

 **compare**

 - 第一种（时间戳）事件会立即执行，第二种事件会在wait秒后执行
 - 第一种事件停止后没有办法再执行，第二种事件停止后依然会再执行一次事件函数。

### 函数防抖

 **函数防抖** ：如果用手指一直按住一个弹簧，它将不会弹起直到你松手为止。也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。

 原理：通俗的将就是你尽管触发事件，但是我一定在事件触发n秒后才执行，如果你在一个事件触发的n秒内又触发了这个事件，那我就以新的事件的时间为准，n秒后才执行，总之，就是要等到你触发完事件n秒内不再触发事件。

 最简陋的函数防抖方式

 ```javascript
 //例如给添加的onmousemove事件
 var count = 1;
 var container = document.getElementById("container");
 function moveAction(){
     container.innerHTML = count++;
 }
 //注册鼠标移动时间
 container.onmousemove = debounce(moveAction,1000);
 //函数防抖，外面包一层函数debounce的原因是里层函数形成闭包，保存外部函数的变量，也就是上一次的timeoutId，以此方便后面清除。
 function debounce(func,wait){
     var timeout;
     return function(){
         clearTimeout(timeout);
         timeout = setTimeout(func,wait);
     }
 }
 ```

 不使用debounce的时候，注册的事件处理程序的this指向的是id为container的dom节点，但是使用了debounce函数以后this值指向了window，**是由于由`setTimeout()`调用的代码运行在与所在函数完全分离的执行环境上。** [详细可参考MDN setTimeout ](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)这会导致，这些代码中包含的 `this` 关键字在非严格模式会指向 `window` (或全局)对象，严格模式下为 undefined，这和所期望的`this`的值是不一样的。 为了保证一致性，对debounce函数改写如下

 ```javascript
 function debounce(func,wait){
     var timeout;
     return function(){
         var context = this;
         clearTimeout(timeout);
         setTimeout(function(){
             func.apply(context);
         },wait);
     }
 }
 ```

 但是上面的debounce函数还是有问题，就是事件处理函数一般都会传入事件对象e，通过事件对象获取一些数据，但是在上面代码中指定的func里面获取事件对象为undefined，因为根本就没有传如其它的参数，因此需要传入参数。改写如下

 ```javascript
 function debounce(func,wait){
     var timeout;
     return function(){
         var context = this;
         var args = arguments;//接收到参数
         clearTimeout(timeout);
         setTimeout(function(){
             func.apply(context,args);
         },wait);
     }
 }
 ```


### 函数节流（throttle）与函数防抖（debounce）应用场景

 **函数节流（throttle）**

 - 频繁的mousemove/keydown，比如高频的鼠标移动，游戏射击类的
 - 搜索联想（keyup）
 - 进度条（我们可能不需要高频的更新进度）
 - 拖拽的dragover等
 - 高频的点击，抽奖等

 **函数防抖（debounce）**

 - scroll/resize事件
 - 文本连续输入，ajax验证/关键字搜索

更多高级的用法，可以参考下面的链接中！

参考：

[JavaScript专题之跟着 underscore 学节流 ](https://github.com/mqyqingfeng/Blog/issues/26)

[JavaScript专题之跟着underscore学防抖 ](https://github.com/mqyqingfeng/Blog/issues/22)

