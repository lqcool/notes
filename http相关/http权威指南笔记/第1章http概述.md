## 第1章 http概述

![6](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/6.png)

***HTTP 网络协议栈***

------



### 1.1 http--因特网的多媒体信使
> http使用的是可靠的数据传输协议，使用的是可靠的数据传输协议，因此即使数据来自地球的另一端，它也能够确保数据在传输的过程中不会被损坏或产生混乱。
> 

### 1.2 Web客户端和服务器

> 1. 服务器：Web 内容(web资源：Web resource)都是存储在 Web 服务器上的。Web 服务器所使用的是 HTTP 协议，因此经常会被称为 HTTP 服务器。
> 2. Web客户端：能够发送http请求的，典型的来说就是浏览器。

### 1.3 资源

> 最简单的 Web 资源就是 Web 服务器文件系统中的静态文件。这些文件可以包含任意内容：文本文件、 HTML 文件........。资源不一定是静态文件，还可以动态的生成。![1](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/1.png)

#### 1.3.1 媒体类型(MIME)

> 1. 因特网上有数千种不同的数据类型，HTTP 仔细地给每种要通过 Web 传输的对象都打上了名为 MIME 类型 （MIME type）的数据格式标签。
>
> 2. 当 Web 浏览器从服务器中取回一个对象时，会去查看相关的 MIME 类型，看看它是否知道应该如何处理这个对象。大多数浏览器都可以处理数百种常见的对象类型：显示图片文件、解析并格式化HTML文件....。![2](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/2.png)
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

#### 1.3.2 URI（统一资源标识符）

> 1. URI（Uniform Resource Identi?er，URI）：服务器资源名被称为统一资源标识符。在世界范围内唯一标识并定位资源。![3](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/3.png)
> 2. URI有两种形式：URL和URN。

#### 1.3.3 URL（统一资源定位符）

> URL(Uniform Resource Location)：统一资源定位符，是资源标识符的最常见的形式。
>
> 大部分URL结构：方案+服务器Internet网址+某个资源。
>
> 例如：https://github.com/lqcool/notes
>
> - 方案：指明访问资源使用的协议类型，例子中是https协议（https://）
> - 服务器地址：指明服务器的Internet网址，例子中就是（github.com）
> - 资源：指明要访问的资源，例子中就是（/lqcool/notes）
>
> 现在大部分（几乎所有）的URI都是URL。

#### 1.3.4 URN（统一资源名）

> URN(Uniform Resource Name)：统一资源名。
>
> URN是作为特定内容的唯一名称使用，与目前资源所在地没有关系，使用URN就可以把资源四处搬移，同时对于同一个URN可以通过多种不同的方案（协议）来访问。
>
> URN目前任然处于试验阶段。

### 1.4 事务

> http事务：由一条请求命令和一个响应结果组成。（客户端请求，服务器响应结果）
>
> 数据如何进行：这种通信通过名为http报文（HTTP message）的格式化数据块进行的。
>
> ![4](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/4.png)

#### 1.4.1 方法 

> HTTP method：HTTP支持几种不同命令的方法，这些命令被称为HTTP方法。方法是告诉服务器要执行什么动作。
>
> 常见的HTTP method：
>
> | HTTP方法 | 描述                                             |
> | -------- | ------------------------------------------------ |
> | GET      | 从服务器向客户端发送命名资源                     |
> | PUT      | 将来自客户端的数据存储到一个命名的服务器资源中去 |
> | DELETE   | 从服务器中删除命名资源                           |
> | POST     | 将客户端数据发送到一个服务器的网管应用程序       |
> | HEAD     | 仅仅发送命名资源响应中的HTTP首部                 |

#### 1.4.2 状态码

> 状态码：一个三位数字的代码，告知客户端请求是否成功，或者是否需要采取其它动作。
>
> 常见的HTTP状态码：
>
> | HTTP状态吗 | 描述                                   |
> | ---------- | -------------------------------------- |
> | 200        | ok。文档正确返回                       |
> | 302        | Redirect（重定向）。到其他地方获取资源 |
> | 404        | Not Found（没找到）。无法找到这个资源  |
>
> 随着状态码一起的还有原因短语，例如：200 Ok，200 Document attached......。

### 1.5 报文（包括请求报文和响应报文）

> HTTP报文都是纯文本，不是二进制代码，由一行行简单的字符串组成的。
>
> HTTP请求报文：从Web客户端发送到Web服务器的HTTP报文。
>
> HTTP响应报文：服务器发往客户端的报文。
>
> ![5](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/5.png)

> HTTP报文的组成：起始行+首部字段+主体
>
> - 起始行：<u>**在请求报文中说明要做什么，在响应报文中说明出现了什么情况。**</u>
> - 首部字段：起始行后面0个或者多个首部字段，格式为键值对通过（:）隔开，首部以空格结束。
> - 主体：报文主体，可以包含所有的数据类型，例如文本或者二进制。

### 1.6 连接

#### 1.6.1 TCP/IP

> HTTP是应用层协议。无需关心网络通信具体细节，这些细节都交给了通用可靠的TCP/IP协议。
>
> TCP提供：
>
> - 无差错的数据传输
> - 按序传输（数据总会按照发送的顺序到达）
> - 未分段的数据流（可以在任意时刻以任意尺寸将数据发送出去）
>
> TCP隐藏了各种网络和硬件的特点以及弱点，使得各种计算机和网络都能进行可靠的通信。
>
> HTTP 协议位于 TCP 的上层。HTTP 使用 TCP 来传输其报文数据。与之类似，TCP 则位于 IP 的上层。

#### 1.6.2连接、IP地址以及端口号 

> URL的主机名可以使用域名也可以使用IP地址。
>
> 连接：HTTP客户端向服务器发送报文之前，需要用网际协议地址和端口号与服务器之间建立一条连接。
>
> 主机名：是IP地址比较人性化的别称，通过域名服务(Domain Name Service，DNS）机制进行转换。
>
> ![7](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/7.png)

> 显示资源步骤：
>
> 1. <u>浏览器从URL中解析出服务器的主机名</u>
> 2. <u>浏览器将服务器的主机名转换为服务器的IP地址</u>
> 3. <u>浏览器解析端口</u>
> 4. <u>浏览器与WEB服务器建立一条TCP/IP连接</u>
> 5. <u>浏览器向服务器发送一条HTTP请求报文</u>
> 6. <u>服务器响应一条HTTP响应报文</u>
> 7. <u>关闭连接，浏览器显示文档</u>

### 1.7 协议版本

> | HTTP版本  | 描述                                                         |
> | --------- | ------------------------------------------------------------ |
> | HTTP/0.9  | 原型版本称为HTTP/0.9。这个协议有很多严重的设计缺陷，只应该用于与老客户端的交互，HTTP/0.9 只支持 GET 方法，不支持多媒体内容的 MIME 类型、各种 HTTP 首部，或者版本号。 |
> | HTTP/1.0  | 得到广泛使用，HTTP/1.0 添加了版本号、各种 HTTP 首部、一些额外的方法，以及对多媒体对象的处理。 |
> | HTTP/1.0+ | 其中很多特性，包括持久的 keep-alive 连接、虚拟主机支持，以及代理连接支持都被加入到 HTTP 之中，并成为非官方的事实标准。 |
> | HTTP/1.1  | <u>是当前使用的版本</u>，HTTP/1.1 重点关注的是校正 HTTP 设计中的结构性缺陷，明确语义，引入重要的性能优化措施，并删除一些不好的特性。 |
> | HTTP-NG   | HTTP-NG 是 HTTP/1.1 后继结构的原型建议，它重点关注的是性能的大幅优化，以及更强大的服务逻辑远程执行框架。 |

### 1.8 Web的结构组件

> * 代理：位于客户端和服务器之间的 HTTP 中间实体
> * 缓存：HTTP 的仓库，使常用页面的副本可以保存在离客户端更近的地方
> * 网关：连接其他应用程序的特殊 Web 服务器
> * 隧道：对 HTTP 通信报文进行盲转发的特殊代理
> * Agent代理：发起自动 HTTP 请求的半智能 Web 客户端
