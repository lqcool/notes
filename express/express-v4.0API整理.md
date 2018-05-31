## express-v4.0API整理

express()

创建一个Express应用。express是一个由 *express* 模块导出的入口（top-level）函数。 

```js
var express = require("express");
var app = express();
```

### 内置API

1、express.static(root,[options]);

express.static是 Express 内置的唯一一个中间件。是基于 [serve-static](https://github.com/expressjs/serve-static) 开发的，负责托管 Express 应用内的静态资源。 

root 参数指的是静态资源文件所在的根目录。 

options对象是可选的，支持以下属性： 

| 属性         | 描述                                                         | 类型     | 默认值       |
| ------------ | ------------------------------------------------------------ | -------- | ------------ |
| dotfiles     | Option for serving dotfiles. Possible values are “allow”, “deny”, and “ignore” | String   | “ignore”     |
| etag         | 启动或者禁用Etag生成                                         | Boolean  | true         |
| extensions   | Sets file extension fallbacks.                               | Boolean  | `false`      |
| index        | Sends directory index file. Set `false` to disable directory indexing. | Mixed    | “index.html” |
| lastModified | Set the `Last-Modified` header to the last modified date of the file on the OS. Possible values are `true` or `false`. | Boolean  | `true`       |
| maxAge       | Set the max-age property of the Cache-Control header in milliseconds or a string in [ms format](https://www.npmjs.org/package/ms) | Number   | 0            |
| redirect     | Redirect to trailing “/” when the pathname is a directory.   | Boolean  | `true`       |
| setHeaders   | Function for setting HTTP headers to serve with the file.    | Function |              |



app.all(path,callback,[,callback...])

该方法就如同标准的[app.METHOD()](http://www.expressjs.com.cn/4x/api.html#app.METHOD) 方法们，它能够匹配所有的http方法，对于特定路径前缀或任意匹配映射“全局”逻辑是有用的。例如，如果在所有其他路由定义的顶部放置以下内容，则要求从此点上的所有路由都需要身份验证，并自动加载用户。请记住，这些回调不必作为端点：loadUser可以执行任务，然后调用NEXT（）以继续匹配后续路由。

```
app.all('*', requireAuthentication, loadUser);
```
一种等价写法如下：

```
app.all('*', requireAuthentication)
app.all('*', loadUser);
```
下面的和前面十分相似，但是它只限制从“/API”开始的路径：

```
app.all('/api/*', requireAuthentication);
```