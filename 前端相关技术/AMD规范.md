## AMD

翻译自：https://github.com/amdjs/amdjs-api/blob/master/AMD.md

异步模块定义（AMD）API指定用于定义模块的机制，使得模块及其依赖项可以异步加载。这个特别适合与浏览器环境，其中模块的同步加载会导致（incurs ）性能、可用性、调试、和跨域访问等问题。

### API 说明（API specification）

#### define() 方法

该规范定义了一个自由变量或者叫做一个全局的变量"define"作为一个方法，方法的结构如下：

 define(id?,dependencies?,factory)

 第一个参数id是一个string类型的，它用来指明（specifies）当前被定义的模块，这个参数是可选的（optional），如果它不存在，模块ID应该默认为加载程序请求给定响应脚本的模块的ID。当存在时，模块ID必须是“顶级”或绝对ID（相对ID是不允许的）



