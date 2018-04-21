## Ajax

> Ajax技术的核心是XMLHttpRequest对象。XMLHttpRequext实际上就是在浏览器和服务器之间加入了中间层，这个中间层起到了代理作用，并负责通信。
>
> Ajax的技术组成
>
> ![21](https://github.com/LQ55/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/21.png)
>
> **XMLHttpRequest对象的方法**
>
> | 方法                                                         | 描述                                                         |
> | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | open(string method,string url,boolean asynch,string name,string pwd) | 建立HTTP请求，method参数用于指定HTTP请求方法，url指定资源地址，asynch 参数表示采用异步方式发送，默认为true，也就是默认是异步,false表示同步，name和pwd可选，指定用户名和密码 |
> | abort()                                                      | 停止当前请求                                                 |
> | getAllResponseHeaders()                                      | 返回HTTP响应的头部信息                                       |
> | getResponseHeader(string header)                             | 返回指定的一个响应的头部信息，例如getResponseHeader("Content-Type")会返回响应类型的值 |
> | send(varian content)                                         | 向服务器发送请求，参数指定随着HTTP请求发送的数据，**参数类型可以为字符串类型和文档对象** |
> | setRequestHeader(string header, string value)                | 设置HTTP请求的头部信息，要成功发送请求，必须在在调用open()方法之后且在调用send()方法之前调用setRequestHeader() |
> | overrideMimeType(String mime)                                | XMLHttpRequest2级的方法，用于重写服务器返回的MIME类型。因为XHR会根据服务器返回的MIME类型具体的处理响应。overrideMimeType方法必须在send方法之前 |
> |                                                              |                                                              |
>
> **XMLHttpRequest对象的属性**
>
> | 属性               | 描述                                                         |
> | ------------------ | ------------------------------------------------------------ |
> | readyState         | （prop）请求处理状态描述，**有五个阶段**<br />（1）0：（未初始化）未初始化，XMLHttpRequest对象已经创建，但是没有初始化请求<br />（2）1：（启动）正在加载请求的URL，在调用open()方法后与调用send()方法之间就进入改状态，**这个时候没有发生网络通信**<br />（3）2：（发送）加载完成，调用send()方法后就进入了改状态<br />（4）3：（接收）在交互中，**收到了部分响应数据**，但是responseText和responseXML处于不可用状态<br />（5）4：（完成）完成，已经从服务器端收到了完整的响应数据。 |
> | responseText       | （prop）服务器响应的数据部分，数据类型为字符串               |
> | responseXML        | 服务器响应的数据部分，数据类型为一个XML文档对象（DOM）       |
> | status             | （prop）服务器响应状态，得到的标准HTTP协议的响应状态码，如404，200，500等等（在超时终止之后再访问status属性，将会报错，可以将status检查语句放在try-catch中） |
> | statusText         | （prop）状态码的说明，与status相对应，如status=404，那么statusText=Not Found |
> | onreadystatechange | （function）当readyState属性发生变化的时候，XMLHttpRequest对象自动调用由onreadystatechange所指定的JavaScript |
> | timeout            | （prop）开始是IE添加的属性，后来被纳入XMLHttpRequest2级规范中来。用来进行超时设定 |
> | ontimeout          | （function）对应于timeout的回掉函数，如果规定时间没有接收到响应，将会调用这个函数 |
> | onloadstart        | （function）对应于loadstart事件的回掉函数，在接收到响应数据的第一个字节的时候触发的回掉函数 |
> | onprogress         | （function）对应于progress事件的回掉函数，在接收到响应期间持续不断的触发的回掉函数 |
> | onabort            | （function）对应于abort事件的回掉函数，在调用abort()方法而终止连接时触发的回掉函数 |
> | onload             | （function）对应于load事件的回掉函数，在接收到完整的响应数据时触发的回掉函数 |
> | onloadend          | （function）对应于loadend事件的回掉函数，在通信完成或者触发error、abort或load事件后触发的回掉函数 |
>
> **创建XMLHttpRequest对象**
>
> ```javascript
> function createXHR(){
>     if(window.XMLHttpRequest){
>         return new XMLHttpRequest();
>     }
>     //IE中会遇到3种不同版本的XHR对象var i , len;
>     else if(window.ActiveXObject){
>         var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.2.0","MSXML2.XMLHttp"];
>         var i , len;
>         for(i = 0,len = version.length; i < len; i ++){
>             try{
>                 new ActiveXObjct(versions[i]);
>                 autuments.callee.activeXString = versions[i];
>                 break;
>             }catch(ex){
>                 //跳过
>             }
>         }
>     }
>     else{
>         throw new Error("No XHR object available.");
>     }
> }
> ```
> **发送XHR请求，并监听响应**
>
> ```javascript
> //HTTP中状态码304表示访问的资源没有经过修改，可以使用缓存中的数据
> var xhr = createXHR();//创建XHR对象，这个时候xhr.readyState=0，是未初始化状态
> xhr.onreadystatechange = function(){
>     if(xhr.readyState == 4){//当xhr.readyState=4的时候，表示已经收到了全部的响应数据，可以在客户端使用了
>         if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
>             var responseText = xhr.responseText;//这里可以操作数据了
>         } 
>         else{
>             //出错了
>         }
>     }
> }
> xhr.open(method,url,true);//初始化一个请求，这个时候xhr.readyState=1
> xhr.send(null);//发送一个请求，这个时候xhr.readyState=2
> //xhr.readyState=3的时候表示已经收到了部分数据
>
> ```
>
>  **GET和POST请求方式不同之处**
>
> | 比较内容     | GET方式                           | POST方式                         |
> | ------------ | --------------------------------- | -------------------------------- |
> | 数据传输载体 | URL                               | HTTP头键值对                     |
> | 数据长度     | 通常1024字节                      | 无限制                           |
> | 安全性       | URL明文传输，不安全               | 可加密后在HTTP头中传输，较为安全 |
> | 请求提交方式 | 可以为form，也可以为任意的URL连接 | 只能以form方式提交               |
> | 一般用途     | 获取信息                          | 提交信息（也可以获取信息）       |
>
