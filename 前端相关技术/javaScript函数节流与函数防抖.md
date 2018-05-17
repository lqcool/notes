## javaScript中的函数节流与函数防抖

> 问题：在实际开发中我们很可能用到resize和mousemove等事件，但是这些会频繁的触发，如果是在对应的事件处理函数写一些操作dom的方法的话或者说发送一些ajax请求的话，这样肯定非常耗性能，并且给用户的体验也不好。

### 函数节流

> **函数节流**：simplely speak**就是让一个函数无法在很短的时间间隔内连续调用** ，只有当上一次函数执行过了你规定的时间间隔才能进行下一次该函数调用。也就是会说预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。通俗的讲：如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。

> **函数节流原理以及实例代码** ：函数节流是使用定时器，触发一个事件的时候，先使用定时器（setTimeout）让这个事件延迟一会再执行，如果这个时间间隔内又出发了时间，那就清除掉原来的定时器，再重新设置一个定时器延迟一会执行。
>
> 第一种：来自《javaScript高级程序设计》
>
> ```javascript
> //《JavaScript高级程序设计》
> //节流函数
> function throttle(method,context){
>     //清除上一次的定时器
>     clearTimeout(method.tId);
>     //重新设置定时器，设定当前周期之后调用
>     method.tId = setTimeout(function(){
>         //这里是真正要执行的操作
>         method.call(context);
>     },100);
> }
>
> //处理函数
> function handOpe(){
>     /*do something what you want*/
> }
>
> //regist the aciton at the object named window
> window.onresize = function(){
>     throttle(handOpe,window);
> }
> ```
>
> 第二种：使用闭包的方法形成一个是由做用原图来存放定时器的timer
>
> ```javascript
> var throttle = function(fn,delay){
>     var timer = null;
>     console.log(this);//window
>     return function(){//闭包，保证了全局的timer
>         var context = this;
>         console.log(context);//btn
>         var args = arguments;
>         clearTimeout(timer);
>         timer = setTimeout(function(){
>             fn.apply(context,args);
>         });
>     }
> }
>
> function handOpe(){
>     /*do something what you want*/
> }
>
> window.onresize = function(){
>     throttle(handOpe,100);
> }
>
> //$("#btn").on("click",throttle(handOpe,1000));
> ```
>
> 

### 函数防抖

> **函数防抖** ：如果用手指一直按住一个弹簧，它将不会弹起直到你松手为止。也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。
>
> 原理：通俗的将就是你尽管触发事件，但是我一定在事件触发n秒后才执行，如果你在一个事件触发的n秒内又触发了这个事件，那我就以新的事件的时间为准，n秒后才执行，总之，就是要等到你触发完事件n秒内不再触发事件。
>
> 最简陋的函数防抖方式
>
> ```javascript
> //例如给添加的onmousemove事件
> var count = 1;
> var container = document.getElementById("container");
> function moveAction(){
>     container.innerHTML = count++;
> }
> //注册鼠标移动时间
> container.onmousemove = debounce(moveAction,1000);
> //函数防抖，外面包一层函数debounce的原因是里层函数形成闭包，保存外部函数的变量，也就是上一次的timeoutId，以此方便后面清除。
> function debounce(func,wait){
>     var timeout;
>     return function(){
>         clearTimeout(timeout);
>         timeout = setTimeout(func,wait);
>     }
> }
> ```
>
> 不使用debounce的时候，注册的事件处理程序的this指向的是id为container的dom节点，但是使用了debounce函数以后this值指向了window，**是由于由`setTimeout()`调用的代码运行在与所在函数完全分离的执行环境上。[**详细可参考MDN setTimeout **](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)**这会导致，这些代码中包含的 `this` 关键字在非严格模式会指向 `window` (或全局)对象，严格模式下为 undefined，这和所期望的`this`的值是不一样的。 为了保证一致性，对debounce函数改写如下
>
> ```javascript
> function debounce(func,wait){
>     var timeout;
>     return function(){
>         var context = this;
>         clearTimeout(timeout);
>         setTimeout(function(){
>             func.apply(context);
>         },wait);
>     }
> }
> ```
>
> 但是上面的debounce函数还是有问题，就是事件处理函数一般都会传入事件对象e，通过事件对象获取一些数据，但是在上面代码中指定的func里面获取事件对象为undefined，因为根本就没有传如其它的参数，因此需要传入参数。改写如下
>
> ```javascript
> function debounce(func,wait){
>     var timeout;
>     return function(){
>         var context = this;
>         var args = arguments;//接收到参数
>         clearTimeout(timeout);
>         setTimeout(function(){
>             func.apply(context,args);
>         },wait);
>     }
> }
> ```
>
> 
>
> 

### 函数节流（throttle）与函数防抖（debounce）应用场景

> **函数节流（throttle）**
>
> - 频繁的mousemove/keydown，比如高频的鼠标移动，游戏射击类的
> - 搜索联想（keyup）
> - 进度条（我们可能不需要高频的更新进度）
> - 拖拽的dragover等
> - 高频的点击，抽奖等
>
> **函数防抖（debounce）**
>
> - scroll/resize事件
> - 文本连续输入，ajax验证/关键字搜索

参考：[JS魔法堂：函数节流（throttle）与函数去抖（debounce）](http://www.cnblogs.com/fsjohnhuang/p/4147810.html)

[函数节流和防抖](http://www.cnblogs.com/cloud-/p/6726428.html)