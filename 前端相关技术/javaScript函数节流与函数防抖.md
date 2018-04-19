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
> ```javascript
> var debounce = function(fn,idle){
>     var last;
>     return function(){
>         var context = this;
>         var args = arguments;
>         
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