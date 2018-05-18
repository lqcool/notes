## webpack的配置

> 你可能已经注意到，很少有webpack配置看起来完全相同，这是因为webpack的配置文件，是导出一个对象的javaScript文件，此对象，由webpack根据对象定义的属性进行解析。**因为webpack的配置是标准的Node.js CommonJs模块** ，可以做到如下事情：
>
> - 通过 `require(...)` 导入其他文件
> - 通过 `require(...)` 使用 npm 的工具函数
> - 使用 JavaScript 控制流表达式，例如 `?:` 操作符
> - 对常用值使用常量或变量
> - 编写并执行函数来生成部分配置
>
> 请在合适的时机使用这些特性。 虽然技术上可行，**但应避免以下做法**： 
>
> - 在使用 webpack 命令行接口(CLI)（应该编写自己的命令行接口(CLI)，或[使用 `--env`](https://webpack.docschina.org/configuration/configuration-types/)）时，访问命令行接口(CLI)参数
> - 导出不确定的值（调用 webpack 两次应该产生同样的输出文件）
> - 编写很长的配置（应该将配置拆分为多个文件）

### 基本的配置

> webpack.config.js
>
> ```
> var path = require("path");
> 
> module.exports = {
>     mode:"development",
>     entry:"./src/app.js",
>     output:{
>         filename:"app.boundle.js",
>         path:path.resolve(__dirname,'dist')
>     }
> }
> ```



