### 第1章 http概述

#### 1.1 http--因特网的多媒体信使
> http使用的是可靠的数据传输协议，使用的是可靠的数据传输协议，因此即使数据来自地球的另一端，它也能够确保数据在传输的过程中不会被损坏或产生混乱。
> 

#### 1.2 Web客户端和服务器

> 1. 服务器：Web 内容(web资源：Web resource)都是存储在 Web 服务器上的。Web 服务器所使用的是 HTTP 协议，因此经常会被称为 HTTP 服务器。
> 2. Web客户端：能够发送http请求的，典型的来说就是浏览器。

#### 1.3 资源

> 最简单的 Web 资源就是 Web 服务器文件系统中的静态文件。这些文件可以包含任意内容：文本文件、 HTML 文件........。资源不一定是静态文件，还可以动态的生成。![1](https://github.com/LQ55/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/1.png)

##### 1.3.1 媒体类型(MIME)

> 1. 因特网上有数千种不同的数据类型，HTTP 仔细地给每种要通过 Web 传输的对象都打上了名为 MIME 类型 （MIME type）的数据格式标签。
>
> 2. 当 Web 浏览器从服务器中取回一个对象时，会去查看相关的 MIME 类型，看看它是否知道应该如何处理这个对象。大多数浏览器都可以处理数百种常见的对象类型：显示图片文件、解析并格式化HTML文件....。![2](https://github.com/LQ55/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/2.png)
>
> 3. MIME 类型是一种文本标记，表示一种主要的对象类型和一个特定的子类型，中间由一条斜杠来分隔。
>
>    (1) HTML格式文档：text/html。
>
>    (2)普通的ASCLL文本文档：text/plain。
>
>    (3)JPEG格式图片：image/jpeg。
>
>    (4)GIF格式图片：image/gif。

##### 1.3.2 URI

> URI（Uniform Resource Identi?er，URI）：服务器资源名被称为统一资源标识符。在世界范围内唯一标识并定位资源。![3](https://github.com/LQ55/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/3.png)
>
> 
