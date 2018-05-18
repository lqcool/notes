## 插件plugins

插件是webpack的支柱功能，webpack本身自身也是构建于插件之上，在 webpack 配置中用到的**相同的插件系统**之上！插件目的在于解决 [loader](https://webpack.docschina.org/concepts/loaders) 无法实现的**其他事**。

### 剖析

> webpack **插件**是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 属性的 JavaScript 对象。`apply` 属性会被 webpack compiler 调用，并且 compiler 对象可在**整个**编译生命周期访问。 
>
> 例如下面就是一个例子：**ConsoleLogOnBuildWebpackPlugin.js** 
>
> ```javascript
> const pluginName = "ConsoleLogOnBuildWebpackPlugin";
> class ConsoleLogOnBuildWebpackPlugin {
>     apply(compiler){
>         compiler.hooks.run.tap(pluginName,compilation=>{
>             console.log("webpack 构建过程开始！");
>         });
>     }
> }
> ```
>
> compiler hook的tab方法第一个参数，应该是驼峰命名的插件名称。建议为此使用一个常量，以便它可以在hook中复用。

### 用法

> 由于**插件**可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 属性传入 `new` 实例。
>
> 根据你的 webpack 用法，这里有多种方式使用插件。

### 配置

> webpack.config.js
>
> ```javascript
> const HtmlWebpackPlugin = require("html-webpack-plugin");//通过npm安装
> const webpack = require("webpack");//访问内置的插件
> const path = require("path");
> 
> const config = {
>     entry:"./path/to/my/entry/file.js",
>     output:{
>         filename:"my-bundle.js",
>         path:path.resolve(__dirname,'dist')
>     },
>     module:{
>         rules:[
>             {
>                 test:/\.(js|jsx)$/,
>                 use:"babel-loader"
>             }
>         ]
>     },
>     plugins:[
>         new webpack.optimize.UglifyJsPlugin(),
>         new HtmlWebpackPlugin({template:'./src/index.html'})
>     ]
> }
> 
> module.exports = config;
> ```
>
> 

### Node API

> 即便使用 Node API，用户也应该在配置中传入 `plugins` 属性。`compiler.apply` 并不是推荐的使用方式。 
>
> some-node-script.js
>
> ```javascript
> const webpack = require("webpack");//访问webpack运行时runtime
> const configuration = require("./webpack.config.js");
> 
> let compiler = webpack(configuration);
> compiler.apply(new webpack.ProgressPlugin());
> 
> compiler.run(function(err,stats){
>     //some code
> });
> ```
>
> 



