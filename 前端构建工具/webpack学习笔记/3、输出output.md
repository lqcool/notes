## webpack输出

配置 `output` 选项可以控制 webpack 如何向硬盘写入编译文件。**注意，即使可以存在多个`入口`起点，但只指定一个`输出`配置。** 

### 用法

> 配置output的最低要求是，将它的值设置为一个对象，包括两个属性：
>
> - filename：用于输出文件的文件名
> - path：目标输出目录path的绝对路径
>
> ```javascript
> const config = {
>     output:{
>         filename:"bundle.js",
>         path:"/home/proj/public/assets"
>     }
> }
> module.exports = config;
> ```
>
> 上面的配置会将一个单独的bundle.js文件输出到/home/proj/public/assets目录中

### 多文件入口起点

> 如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用[占位符(substitutions)](https://webpack.docschina.org/configuration/output#output-filename)来确保每个文件具有唯一的名称。
>
> ```javascript
> const config = {
>     entry:{
>         app:"./src/app.js",
>         search:"./src/search.js"
>     },
>     output:{
>         filename:"[name].js",
>         path:_dirname+'/dist'
>     }
> }
> ```
>
>  上面代码会将写入到硬盘：./dist/app.js，./dist/search.js



