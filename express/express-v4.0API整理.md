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

