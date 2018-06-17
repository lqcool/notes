### Node.js GET/POST请求

服务器与浏览器打交道需要使用到各种方法，例如GET,POST等。

#### 获取GET请求的内容

GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分， 解析分为两种，第一种为手动，第二种为采用node中的url模块中的parse函数来进行转换。

```js
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req,res){
    //针对一个请求，可以使用url的parse解析出参数
    var params = url.parse(req.url,true).query();
}).listen(8080)
```

上面代码中可以通过url模块的parse方法解析参数，例如我们请求的参数为?arg1=1&arg2=2,arg3=3

通过解析以后，params为一个对象：{arg1:1,arg2:2,arg3:3}

#### 获取POST请求的内容

POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。 

比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。 

解析POST方法提交的数据使用querystring来解析

```js
var http = require("http");
var querystring = require('querystring');
http.createServer(function(req,res){
    //定义一个post变量用于暂存请求体的信息
    var post = '';
    //通过req的data事件监听函数，每当接收到请求体的数据，就累加到post变量中
    req.on('data',function(chunk){
        post+=chunk;
    });
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后便于后续的处理
    req.on('end',function(){
        //这里解析参数
        post = querystring.parse(post);
        res.end(util.inpect(post))
    })
}).listen(8080);
```

