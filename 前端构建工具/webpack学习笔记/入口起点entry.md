## webpack的entry

在webpack中可以有多种方式定义entry属性。

### 单个入口（简写语法）：entry:string|Array\<string\>

> 单个入口写法如下：
>
> ```javascript
> const config = {
>     entry:"./path/to/my/entry/file.js"
> };
> module.exports = config;
> ```
>
> 上面写法是下面的简写：
>
> ```javascript
> const config = {
>     entry:{
>         main:'./path/to/my/entry/file.js'
>     }
> }
> ```
>
> **如果向entry传入一个数组**，[文件路径数组]将会创建“**多个主入口（multi-main entry）**”。想要多个依赖文件一起注入，并且将他们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用。

### 对象语法：entry:{[entryChunkName]:string|Array\<string\>}

> 对象语法写法如下
>
> ```javascript
> const config = {
>     entry:{
>         app:'./src/app.js',
>         vendors:'./src/vendors.js'
>     }
> }
> ```
>
> 对象语法比较繁琐，但是这个是应用程序中定义入口的最可扩展的方式。

