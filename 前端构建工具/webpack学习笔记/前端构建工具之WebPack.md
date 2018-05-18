## WebPack学习笔记

文章摘自《 [webpack中文文档](https://webpack.docschina.org) 》

概念

> 本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。 
>
> WebPack的四个核心：入口（entry）、输出（output）、loader（加载器）、plugins（插件）

入口（entry）

> 入口起点（entry point）指示webpack应该使用哪一个模块用作构建内部依赖图的开始，进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的 。
>
> **entry** ：该属性用来在webpack配置中指定一个入口起点或者多个入口起点。默认的值为当前目录下面的src文件夹，也就是./src。
>
> ```js
> module.exports ={
>     entry:"./path/to/my/entry/index.js" 
> }
> ```
>
> 

出口（output）

> **output** 属性告诉 webpack 在哪里输出它所创建的 *bundles*，以及如何命名这些文件，默认值为 `./dist`。 基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。 可以通过在配置中指定一个output字段，来配置这些处理过程。
>
> ```javascript
> const path = require("path");//这个是Node.js的核心模块，是用来操作文件路径的
> module.exports = {
>     entry:"./path/to/my/entry/index.js",
>     output:{
>         path:path.resolve(__dirname,'dist'),
>         filename:'my-boundle.js'
>     }
> }
> 
> //上面的entry指定构建的开始文件
> //通过output.filename告诉webpack bundle的名称，通过output.path指定想要将bundle生成（emit）到哪里。
> ```

加载器（loader）

> ***loader* 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）**。loader 可以将所有类型的文件转换为 webpack 能够处理的有效[模块](https://webpack.docschina.org/concepts/modules)，然后你就可以利用 webpack 的打包能力，对它们进行处理。 本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。 
>
> 在 webpack 的配置中 **loader** 有两个目标： 
>
> - **test**属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。 
> - **use** 属性，表示进行转换时，应该使用哪个 loader。
>
> ```javascript
> const path = require("path");//Node.js中的一个用于处理文件路径的模块
> const config = {
>     output:{filename:"ny-boundle.js"},
>     module:{
>         rules:[
>             {test:/\.text$/,use:'raw-loader'}
>         ]
>     }
> }
> module.exports = config;
> ```
>
> 以上配置中，对一个单独的module对象定义了rules属性，里面包含两个必须属性：test和use，这告诉webpack编译器(compiler)如下信息：
>
> “**嘿，webpack编译器，当你碰到在[require()或者import语句中被解析为'.txt'的路径]时，在你对它打包之前，先使用raw-loader转换一下**”。
>
> 重要的是要记得，**在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules**。然而，在定义错误时 webpack 会给出严重的警告。为了使你受益于此，如果没有按照正确方式去做，webpack 会“给出严重的警告” 

插件（plugins）

> **loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。**[插件接口](https://webpack.docschina.org/api/plugins)功能极其强大，可以用来处理各种各样的任务。 
>
> 想要**使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中**。**多数插件可以通过选项(option)自定义**。你**也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建它的一个实例**。 
>
> ```javascript
> const path = require("path");
> const config = {
>     //指定入口文件，可以有多个入口文件
>     entry:"xxx/xx.js",
>     //指定输出
>     output:{
>         path:path.resolve(__dirname,'dist');
>         filename:"xxxx/xxx/xxxx.js"
>     },
>     //指定加载器
>     module:{
>         rules:[
>             {test:/\.txt/,"row-loader"}
>         ]
>     },
>     //指定插件
>     plugins:[
>         new webpack.optimize.UglifyJsPlugin(),//这里是实例化一个插件
>         new HtmlWebpackPlugin({template:'./src/index.html'})//实例化插件
>     ]
> };
> module.exports = config;
> ```

模式

> 通过选择 `development` 或 `production` 之中的一个，来设置 `mode` 参数，你可以启用相应模式下的 webpack 内置的优化 
>
> ```javascript
> module.exports = {
>   mode: 'production'  //指定开发或者生产环境，启动相应的优化
> };
> ```