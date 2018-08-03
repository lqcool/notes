###图解HTTP小记

（1）HTTP协议和TCP/IP协议族内的其它众多协议相同，用于客户端和服务器端的通信。

（2）HTTP协议规定，请求是从客户端发出。（换句话说就是请求是先从客户端开始建立，服务器在收到请求之前不会有答复）

（3）请求和响应的报文格式

请求报文格式：请求报文由请求方法、请求URI、协议版本、可选的首部字段和内容实体组成。

一个简单的请求报文：

```http
POST /form/entry HTTP/1.1
HOST:hackr.jp
Connection:keep-alive
Content-Type:application/x-www-form-urlencoded
Content-length:16

name=ueno&age=37
```

如上体所示就是一个简单的POST请求报文的格式：

第一行中的`POST`表示请求的方法名称，除了POST还有GET、HEADE、PUT等等。`/form/entry`表示请求的URI。`HTTP/1.1`表示请求所使用的协议版本，当前使用的协议版本为HTTP/1.1。后面紧跟着就是请求所携带的首部字段，如`HOST:hackr.jp`、`Connection:keep-alive`、`Content-Type:application/w-www-form-urlencode`，首部字段后很多，这里就不一一列举了。在后面的`name=ueno&age=37`就是请求体，请求体是携带请求数据的地方，虽然在其它地方也可以携带请求数据。



响应报文的格式 ：响应报文基本上有协议版本、状态吗（表示请求成果或者失败的数字代码）、用于解释状态码的原因短语、可选的响应首部字段以及实体主体构成。

```http
HTTP/1.1 200 OK
Date:Tue, 10 Jul 2018 06:50:15 GMT
Content-Length:362
Content-Type:text/html

<html>
	.....
</html>
```

上面是一个简单的响应报文的格式。记住在资源实体主体和响应首部之间是有一个空行分开的。

（4）HTTP是无状态协议，就是在HTTP这个级别，对于请求或者响应都不做持久化处理，这样做的目的就是为了更快的处理大量的事务，确保协议的可伸缩性，同时减少服务器的CPU以及内存的消耗，因此就把HTTP协议设计的简单。

（5）cookie技术出现的原因：HTTP是无状态协议，这样就无法判断是哪个用户的操作，也就是无法查看到用户的登陆状态，由此出现了cookie技术。服务器端通过在响应报文中加入Set-Cookie首部字段，通知客户端保存cookie。

（6）指定访问URI的方式有很多

```http
GET http://hackr.jp/index.html HTTP/1.1

GET /index.html HTTP/1.1
HOST:hackr.jp
```

上面列举的两种指定URI的方式都可以请求到资源。第一种就是将完整URI放到请求行中，第二种就是在请求行中指定资源在服务器上的位置，而将主机的指定放到了HOST的首部字段中。

（7）只是访问特定的服务器，而不访问资源，直接使用*代替URI

```http
OPTIONS * HTTP/1.1
HOST:www.hackr.jp
```

上面的例子也是查询服HTTP服务器支持的HTTP方法种类

（8）TRACE方法一般和Max-Forward首部联合使用，Connect方法要求用隧道协议连接代理，实现用隧道协议进TCP通信。主要使用SSL（Secure Sockets Layer）安全套接字和(Transport Layer Secuity)传输层安全协议把内容加密后经网络隧道传输。

（9）HTTP方法名区分大小写，需要使用大写。（请求头中）

（10）持久连接keep-alive的特点是只要任意一方没有明确提出断开连接的意愿，则保持TCP连接状态。HTTP/1.1中所有的连接默认是持久连接

（11）持久连接使得多数请求以管道化（pipelining）方式发送成为可能。管道化技术出现后，不用等待响应就可以直接发送下一个请求。这样就可以同时并发发送多个请求，不需要一个接着一个的等待响应了。

（12）多部分对象集合（Multipart）

发送的邮件里面可以包括正文，文件，图片等等，不同类型的信息，是因为采用了MIME（Multipurpose Internet Mail Extensions，多用途因特网邮件扩展）机制，允许处理图片、文本、视频等多个不同类型的数据。MIME扩展中使用一个叫做多部分对象集合（Multipart）的方法来容纳多分不同类型的数据。

多部分对象集合包含的对象有multipart/form-data、multipart/byteranges

- multipart/form-data

这个在Web表单文件上传的时候使用

```
Content-Type:multipart/form-data;bundary=AaB03x;

--AaB03x
Content-Disposition:form-data;name="filed1"

Jon Blow
--AaB03x
Content-Disposition:form-data;name="price";filename="file1.txt"
Content-Type:text/plain
...(file1.txt的数据)...
--AaB03x
(下面是其它种类的数据)
```

- multipart/byteranges

状态吗206（Partial Content，部分内容）响应报文包含多个范围的内容时候使用。

```
HTTP/1.1 206 Partial Content
Date:Fri, 13 Jul 2012 02:45:26 GMT
Last-Modified:Fri, 31 Aug 2007 02:02:20 GMT
Content-Type:multipart/byteranges;bundary=THIS_STRING_SEPARATES

--THIS_STRING_SEPARATES
Content-Type:application/pdf
Content-Range:byte 500-9999/8000

(...这里就是范围指定的数据...)
--THIS_STRING_SEPARATES
Content-Type:application/pdf
Content-Range:byte 500-9999/8000

(...这里就是范围指定的数据...)
--THIS_STRING_SEPARATES--
```

多部分对象集合使用bundary字符串来划分多部分对象集合指明的各类实体，在bundary字符串指定的各各个实体的起始行之前插入--标记（--ABx），在集合对应的字符串的最后插入--标记（--ABx--）作为结束。

同时多部分对象集合的每个部分都可以包含首部，同时还可以嵌套使用。

（13）进行范围请求的时候使用Range首部字段指定请求范围

```
Range:bytes=5001-10000（请求5001字节到10000字节的内容）
或则使用
Range:bytes=5001-（请求5001之后的全部）
```

当服务器无法响应范围请求的时候，就会返回200 OK状态码，并将所有数据返回。

（14）通信数据转发程序：代理、网关、隧道

代理：（应用程序），直接转发请求，不改变URI

（15）Cache-Control头部信息

public和private指令

```
Cache-Control:public
注：表明其它用户也可以利用缓存
```

```
Cache-Control:private
注：响应只会以特定的用户作为对象，缓存服务器对该特定的用户提供资源缓存服务，对于其它的用户发送过来的请求，代理服务器不会返回缓存
```

no-cache指令

```
Cache-Control:no-cache
注：该指令不是说不缓存，而是为了防止从缓存中返回过期的资源。客户端发送的请求包含这个指令，则表示客户端不会接收缓存过的响应。中间的缓存服务器必须吧客户端的请求转发给源服务器，如果是服务器返回的响应中包含no-cache指令，缓存服务器不能缓存资源，资源服务器以后不再对缓存服务器提出的有效性进行确认。
```

no-store指令

```
Cache-Control:no-store
注：真正指明缓存不能在本地缓存请求或响应的任意部分
```

max-age指令

```
Cache-Control:max-age=604800（单位/秒）
注：客户端发送的请求中有max-age指令，如果判定缓存时间数值比指定的数值更小，那么客户端就接收缓存的资源。只指定max-age值为0，缓存服务器通常需要将请求转发给源服务器。当返回的响应包含max-age只能够时候，缓存服务器将不对资源的有效性再做确认，max-age代表资源保存为缓存的最长时间
```

s-maxage指令

```
Cache-Control:s-maxage=604800（单位/秒）
注：s-maxage和max-age相同，s-maxage是适用于供多位用户使用的公共缓存服务器。也就是对于向同一用户重复返回响应的服务器来说，这个字段没有任何作用，使用了s-maxage，那么会直接忽略Expires首部字段以及max-zge指令的处理
```

min-fresh指令

```
Cache-Control:min-fresh=60（单位/秒）
注：在60秒内，如果有超过有效期限的资源都无法作为响应返回了（相当于客户端向服务器询问：这缓存再过60秒还是否是新鲜的？）
```

max-stale指令

```
Cache-Control:max-stale=3000（单位/秒）
注：使用max-stale指示缓存资源，即使过期了也照常接收，如果指令没有指定参数值，客户端都会接收响应，如果指令中指定了具体的参数值，那么即使过期，只要任然处于max-stale指定的时间内，任然会被客户端接收
```

only-if-cached指令

```
Cache-Control:only-if-cached
注：表示客户端尽在缓存服务器本地缓存目标资源的情况下才要求其返回。也就是该指令要求缓存服务器不在重新加载响应，也不会再次确认资源有效性。如果请求缓存服务器本地缓存无响应，返回504 Gateway Timeout
```

mult-revalidate指令

```
Cache-Control:must-revalidate
注：会向源服务器再次验证缓存是否任然有效，如果代理服务器无法连通源服务器获取有效资源，缓存必须给客户端一个504 Gateway Timeout。使用了must-revalidate会忽略请求的max-stale指令（即使已经在首部使用了max-stale，也不会有效果）
```

proxy-revalidate指令

```
Cache-Control:proxy-revalidate
注：要求所有缓存服务器在接收到客户端带有该指令的请求返回之前，必须再次验证缓存的有效性
```

no-transform指令

```
Cache-Control:no-transform
注：使用no-transform无论是在请求中，还是在响应中，都不能改变实体主体的媒体类型，这样可以防止缓存代理压缩图片等操作。
```

（16）Connection首部

有两个作用，控制不再转发给代理的首部字段和管理持久连接。

HTTP/1.1默认连接都是持久连接也就是Connection:keep-alive

（17）Pragma首部是HTTP/1.1之前遗留的字段，仅仅用于向后兼容，也可以控制缓存，但是这个首部只属于客户端发送的请求中例如：Pragma:no-cache

（18）与认证信息有关的两对头部信息

- Authorization和WWW-Authenticate

这一对是发生在客户端与服务器的HTTP访问认证，服务器要求客户端提供相关认证信息会发送WWW-Authorization到客户端（伴随401状态码），客户端接收到后，通过Authorization首部字段向服务器提供证书相关认证信息

服务器响应WWW-Authenticate要求认证

```
WWW-Authenticate:Basic realm="Usagidesign Auth"
```

客户端接收到后通过Authorization向服务器提供认证信息

```
Authorization:Basic dWVub3NlbjpwYXNzd29yZA=
```

- Proxy-Authorization和Proxy-Authenticate

这一对发生在客户端和代理之间HTTP访问认证，代理要求客户端提供认证信息,会发送Proxy-Authenticate到客户端，Proxy-Authenticate指定适用于访问请求URI所指定资源的认证方案（Basic或者是Digest）和带有参数提示的质询（challenge），客户端收到，通过Proxy-Authorization首部向代理提提供相关认证信息。

代理响应Proxy-Authenticate要求认证

```
Proxy-Authenticate:Basic realm="Usagidesign Auth"
```

客户端接收到后通过proxy-authorization向代理提供认证信息

```
Proxy-authorization:Basic dWVub3NlbjpwYXNzd29yZA=
```

（19）Vary首部可以对缓存行为进行控制，原服务器会向代理服务器传达关于本地缓存使用的方法的命令

```
Vary:Accept-Language
注：代理服务器收到原服务器返回的带有Vary指定的响应之后，如果要再进行缓存，仅对请求中含有相同Vary指定首部字段的请求返回缓存，即使对相同的资源发起请求，但由于Vary指定的首部字段不相同，因此就需要从原服务器重新获取资源
```

（20）Allow实体首部用于通知客户端能够支持Request-URI指定资源的所有HTTP方法

（21）HTTP的缺点：明文传输、不验证身份、无法证明报文的完整性 etc...（当然还有其它方面的）

（22）HTTPs=HTTP+加密+认证+完整性保护

（23）加密技术：

- 近代加密算法都是公开的，密钥是保密的，使用加密算法进行加密，使用同一个密钥进行解密。这种叫做共享密钥加密，也叫对称密钥加密（这里的如何安全的发送密钥到对方让其对密文进行解密成难题）

- 使用两把密钥的公开密钥加密：公开密钥加密使用一非对称的密钥，一把叫做私钥，一把叫做公钥。这种方式是发送密文的一方先使用对方的公钥进行加密，对方收到密文后，使用自己的私钥进行解密。这种方式不需要发送用来解密的私钥，就不会有被盗的危险。

- HTTPS采用混合加密机制：HTTPS采用共享密钥和公开密钥加密两者并用的混合加密机制。若密钥能够进行安全的交换，那么有可能会考虑仅仅使用公开密钥加密来进行通信，但是公开密钥加密与共享密钥加密相比，处理速度要慢。

  利用两者的优势，将多种方法混合起来用于通信。**在交换密钥环节使用公开密钥进行加密，之后建立通信交换报文阶段使用共享密钥加密方式**。

  如何安全的交换公钥？：使用有可信赖的第三方机构颁发的数字证书，服务器运营人员向数字证书机构提出公开密钥申请，数字证书机构在判明申请者身份之后，会对已经申请的公开密钥做数字签名，然后分配这个已经签名的公开密钥，并将该公开密钥放入公钥证书后绑定在一起。服务器将数字证书发送给客户端，以进行公开密钥加密方式通信。客户端接收到证书可以施一公数字证书机构公开密钥，对那张证书上的数字签名进行过验证，如果通过验证，可以明确两件事：第一服务器的公开密钥是真实有效的数字证书认证机构。第二服务器的公开密钥是值得信赖的。

（24）HTTPS的问题，使用SSL的时候，它的处理速度会变慢。分为两种：通信慢和处理慢

- 通信慢是因为和HTTP相比，SSL通信部分消耗网络资源。而SSL通信部分还要对通信进行处理，所以时间上延长了，和之前HTTP相比，网络负载可能会变慢2到100倍。
- 处理慢是因为HTTPS需要做服务端和客户端的双方的加密以及解密处理，消耗CPU和内存等硬件信息。

（25）用户身份认证：HTTP/1.1使用的认证方式如下所示

- BASIC认证（基本认证）

这是最基本的认证，账户密码是BASE64编码后的，毫无安全性可言。BSSIC认证是通过WWW-Authenticate和Authorization进行的，实际就是服务端要求进行身份认证，然后就在响应头中加入WWW-Authenticate首部，首部的内容是认证的方式（BASIC）以及Request-URI安全域字符串。

```
HTTP/1.1 401 Authorization Required
Date:Mon, 19 sep 2011 08:38:32 GMT
Server:Apache/2.2.3(Unix)
WWW-Authenticate:Basic realm="Input Your Id and Password"
```

服务端收到401后，输入自己的用户名密码之后自动的进行BASE64编码后通过Authorization首部发回服务端，进行验证，验证通过，就返回资源。

```
GET /private/ HTTP/1.1
Host:hackr.jp
Authorization:Basic Z3Vlc3Q6Z3Vlc3Q=
```

- DIGEST认证（摘要认证）

DIGEST认证是为了弥补BASIC认证的弱点，DIGEST认证采用质询/响应的方式（chllenge/response），但不会像BASIC认证那样直接发送明文密码。这种质询方式是一开始一方先会发送认证要求给另一方，接着使用从另外一方接收到的质询码计算生成响应码。最后将响应码发送给对方的方式。发送给对方的响应码是由质询码生成的，所以比起BASIC认证，密码泄露可能性就降低了。

服务端要求认证，发送临时质询码（随机数,nonce）并告知需要认证的状态码401

```
HTTP/1.1 401 Authorization Required
WWW-Authenticate:Disest realm="DEGEST",
nonce="MOSQZ0itBAA=44abb6784cc9cbfc605a5b0893d36f23de95fcff",algorithm=MD5,qop="auth"
```

客户端发送通过质询码生成的响应码response

```
GET /digest/ HTTP/1.1
Authorization:Digest username="guest",realm="DEGEST",
nonce="MOSQZ0itBAA=44abb6784cc9cbfc605a5b0893d36f23de95fcff",algorithm=MD5,uri="/degest/" response="df56389ba3f7c52e9d775111fdfds5fsexyt",qop="auth",nc=00000001,cnonce="234sdwxngh334xhk"
```

通过DEGEST进行认证，认证中首部必须包含usename、realm、nonce、uri和response的字段信息。DEGEST虽然提高了认证安全等级，但是与HTTPS相比任然比较弱。DEGEST认证提供防止密码被窃听的保护机制，但是并不存在防止用户伪装的保护机制。

- SSL客户端认证

认证只要ID和密码正确就正确，但是如果ID和密码被盗，那么就被第三者冒充了，利用SSL客户端认证可以避免该情况发送。同样和前面的HTTPS通信过程一样，这里就是客户端提出请求，服务端要求证书认证，客户端发送证书，服务器验证证书，并取出里面的公钥，然后进行HTTPS加密通信。（这种有点昂贵）

- FormBase认证（基于表单的认证）

多数情况下输入用于事先登陆的ID和密码后，发送给Web应用程序，基于认证结果来决定是否认证成功。基于表单的认证问题也有不少。基于表单的验证过程是如下的（通过Cookie管理Session（会话））

客户端把用户名和密码输入后，通过POST方式提交，这个时候是通过HTTPS进行通信来进行HTML表单画面的显示和用户输入数据的发送。

服务器发放用于识别用户的SessionID,验证通过就把用户认证状态与SessionID绑定后记录在服务器端，服务器端返回响应的时候在首部字段Set-Cookie中写入Session ID（所以如果Session ID被盗走，对方就可能伪装成为你的身份进行恶意操作了，所以Session ID使用比较难以推测的字符串，为了减轻XSS攻击，建议将现在Cookie内加上httponly属性）

客户端接收到Session ID并将它放到Cookie中，下次请求的时候带上。