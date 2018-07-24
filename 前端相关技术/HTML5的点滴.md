### HTML5的点滴

#### HTML5 强调简化标签，仅链接那些我们必须 的 CSS、JavaScript和图片文件

 - 标准的 HTML 4.01网页的文档类型声明如下：<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/     TR/html4/loose.dtd" >


 - HTML5简化以后：<!DOCTYPE html 

#### HTML5也接受非常松散的语法

 - \<script src="js/jquery-1.6.2.js"\>\</script\>  HTML5中type属性不再需要。
 - \<sCRipt SrC=js/jquery-1.6.2.js\>\</script\>   HTML5中大小写混用，源文件引用没有加入""，同样通过验证。
 - \<link href=CSS/main.css rel=stylesheet\> 没有闭合标签斜杠（/），属性值没有引号括起来，没有type声明，HTML5都接受。
 - 宽松的语法可应用于整个文档，\<div id=wrapper\> 

#### HTML5增加了语义化标签

 *HTML5结构级语义元素：*

 - 这对我们来说是件好事，但更重要的是对 搜索引擎来也是件好事。搜素引擎能比以前更好地理解我们的网页，并相应地评定网页 内容。如：使用\<nav\标签会使我们的代码变得更有语义，这就是导航栏。
 - \<section\>：元素用来定义文档或应用程序中的区域（或节）。例如，可以用它组织你的个 人信息，一个\<section\>用于联系信息，另一个用于新闻动态。
 - \<nav\>：用来定义文档的主导航区域，其中的链接指向其他页面或当前页面的某些区域。
 - \<article\>：与\<section\>元素用容易混淆，\<article\>元素用来包裹独立的内容片段。当搭建一个页面时，想想你准备放入\<article\>标签的内容能否作为一个整块而被复制粘贴到另外一个完全不同的网站且能保持完整的意义？应该使用\<article\>标签包裹的内容，明显的例子 就是博客正文。如果出现嵌套的\<article\>元素，那内层的\<article\>元素内容 应该和外层文章内容直接有关。 
 - \<aside\>：元素用来表示与页面主内容松散相关的内容。在实践中，我经常将其用作侧边栏（当它包含合适的内容时）。另外，引文、广告以及导航元素（如友情链接等）也可以使用它。
 - \<hgroup\> ：如果页面中有一组使用\<h1\>、\<h2\>、\<h3\>等标签的标题、标语和副标题，则可以考虑 使用\<hgroup\>将它们包裹起来。这样在 HTML5的大纲结构算法中就会隐藏次级标题元 素，从而只让\<hgroup\>中的第一个标题元素进入文档大纲。
 - \<header\> ：元素不计入大纲结构，所以不能用它来划分内容结构，而是应该用它来包含对区域内容的介绍说明。实际使用中，\<header\>可用作网站头部的“刊头”区域，也 可用作对其他内容如\<article\元素的简要介绍。
 - \<footer\> ：\<footer\>元素也不计入大纲结构，所以也不能用于划分内容结构。 应该用它来包含其所在区域的辅助信息。例如可以用它包含一组指向其他页面的超链接， 或者用它包含版权信息。它也可以视情况在同一个页面上多次出现。 例如博客网站的页脚可以用它，同时博客正文<article\>元素内的文脚也可以用它。不 过规范指出，博文作者的联系信息应该使用\<address\>元素来包裹。 
 - \<address\> ：元素用于明确地标注离其近的\<article\>或\<body\>祖先元素的联系信息。 为避免产生混淆，请记住\<address\>中一般不放具体的邮政地址，除非相应内容确实需 要联系地址。而邮政地址和其他可能会改变的联系信息应该使用\<p\>标签来包裹。 

当页面中有\<article\>或\<section\>元素时，每个\<article\>或\<section\>元素都可以有自己的头部、脚 注和导航。需要谨记的是，使用\<section\>的目的不是为了美化样式，而是为了标识一个鲜明独立 的内容块。一个内容块（section）一般都应该带有标题

 

 *HTML5的文本级语义元素：HTML5 还修订了一些被称之为行内元素的标签。*

 - \<b\> ：它的实际用途其实是“给文本加粗”，HTML5标准定义为，一小段文本，纯粹为了吸引人的注意，除此之外不传达任何重要性，也不 暗示其他语态或语气。如文档摘要中的关键词等等。（加粗）
 - \<em\> ：HTML5中它的语义是，强调内容中的重点。（斜体）
 - \<i\> ：HTML5标准中对<i的描述，一小段有不同语态或语气的文字，或者是样子上与普通文章有所差异以便 标明不同特点的文字。 （斜体）

 *HTML中的其它标签：*

 - \<video\>：添加多媒体
 - \<audio\>：添加音频


 - HTML5中可以在\<a\标签中嵌入多个元素

   ```html
   <a>
   	<h2>The Home Page</h2>
       <p>This is paragraph also links to the home page</p>
       <img src="som/isx.jpg" alt="home-slice"/>
   </a>
   ```

   唯一需要记住的是——很明显：不能在一个标签中嵌套另一个标签，也不能在标签中嵌 套表单

 - HTML废弃的东西（包括暂保留和非保留的）

   - script链接中的 language属性
   - img标签中的 border属性（暂保留）
   - strike、enter、font、acronym、frame 和 frameset......（非保留标签）

#### 用HTML5的方法为页面添加视屏或者音频

 HTML4.01在网页中添加媒体非常麻烦，HTML5就非常简单：

 - \<video src="myVideo.ogg"\>\</video\>

   ```html
   <video src="video/myVideo.mp4" width="640" height="480">
       What, do you mean you don't understand HTML5?
   </video> 
   <!--上面代码在网页中会出现视屏控件，视屏会出现，但是没有播放控制栏，最佳controls属性就会出现视屏控制栏，再追加autoplay属性，就会出现自动播放，一般不使用，因为我们一般不喜欢自动播放-->
   <video src="video/myVideo.mp4" width="640" height="640" controls autoplay
   </video>
   ```

   属性：

   - controls：显示播放控制栏
   - autoplay：控制自动播放
   - preload：用来控制媒体预加载
   - loop：用来重复播放视屏
   - poster：定义视屏缩略图，这个属性在视频播放延时非常有用

   要使用某一个属性，在video标签中追加上面属性中的某一个即可。下面包括上面所有属性：

   ```html
   <video src="video/myVideo.mp4" width="640" height="480" controls autoplay preload="auto" loop poster="myVideoPoster.jpg"
       What, do you mean you don't understand HTML5?
   </video> 
   ```

 - \<source\>：标签提供备用的媒体源文件

   由于目前的情况是， 一些浏览器支持某一套视频和音频文件格式，而另一些浏览器则支持其他格式。有一种方法能在一个标签内支持多种媒体格式。那就是\<source\标签。

   手握多种格式的媒体文件，则可以这样编写视频标签：

   ```html
   <video width="640" height="480" controls autoplay preload="auto" loop poster="myVideoPoster.jpg">
       <source src="video/myVideo.ogv" type="video/ogg">    
       <source src="video/myVideo.mp4" type="video/mp4">     
       What, do you mean you don't understand HTML5? 
   </video> 
   <!--上面代码根据浏览器的支持格式解析，如果浏览器支持ogg格式的，那么会使用第一个，否则会继续解析下一个<source标签-->
   ```

 - \<audio\>的使用和\<video\>除了width，height，poster属性之外，其它的使用基本相同，甚至可以互换使用，最大的差别就是\<audio\>没有可视的内容播放区域。

 - 响应式视屏，如果设置了\<video\>标签的height，width属性，那么就不能响应式，解决办法就是删除height，weight添加代码 video{max-width:100%;height:auto}

   这种方法对本页面中的视频文件很有用，但它不能解决使用 iframe 嵌入的视频的响应 问题。要解决这样的问题，可以使用插件。

#### 离线的Web应用

 我们知道肯定会有越来越多的移动设备用户访问我们的 网站，为他们提供一种不需要网络连接仍可访问网站内容的途径如何？HTML5 的离线 Web 应用特性将其变成了可能。 

 例子：假设有一个在线笔记应用，当用户的手机网络断开时，他可能正在编辑一则笔记。使用 HTML5的离线 Web 应用，他就可以继续离线编辑笔记，然后等到网络再次连接时将本地 数据发送到服务器。

 使用HTML5离线Web应用为我们的网站创建一个离线版本

 **机制：**

 离线Web应用的运行机制是每个需要离线使用的网页都指定一个后缀名为.manifest的 文本文件。这个文本文件罗列了该网页离线使用时所需的所有资源文件（HTML、图片 JavaScript等等）。支持离线 Web 应用的浏览器会自动读取.manifest 文件，下载文件中 所罗列的资源文件，并将其缓存在本地以备网络断开时使用。

 **让网页可以离线使用**

 在html文件中，指定一个.manifest文件：

 ```html
 <html lang='en' manifest="/my.manifest"></html>
 <!--文件名可以随意，但是后缀名建议使用.manifest--
 <!--必须在每一个准备离线使用的页面的HTML标签中都追加manifest--
 <!--如果使用的是 Apache服务器，可能还需要修改一下.htaccess文件，在里面追加一条代码
 AddType text/cache-manifest .manifest
 这样就保证了.manifest 文件拥有正确的 MIME类型，即 text/cache-manifest。 
 -->
 <!--.htaccess 文件中还可以加入以下代码
 	<Files my.manifest   
 		ExpiresActive On  
 		ExpiresDefault "access">
 	</Files> 
 上面这几行代码，可以阻止浏览器缓存缓存文件。因为my.manifest是一个静态文件，浏览器默认会缓存这个文件，加入上面的几行代码，可以告诉浏览器不要这么干
 -->

 ```

 填充my.manifest文件，告诉浏览器哪些文件是用作离线存储的

 ```properties
 CACHE MANIFEST
 #v1

 CACHE:
 view/index.html
 css/index.css
 img/head.jpg

 NETWORK:
 *
 FALLBACK:
 //offline.html
 ```

 - manifest文件必须以CACHE MANIFEST开头，第二行就是一句注释，注明了 manifest文 件的版本号。
 - CACHE:部分罗列了所有离线使用所需的文件。这些文件的路径都是相对 offline.manifest 而言的，所以文件路径可能需要根据情况稍作修改。使用绝对路径也是可以的。 
 - NETWORK:部分罗列了所有不需要被缓存的文件。此处罗列的文件在网络畅通的情况下都会直接跳过缓存。如果你想网站内容在网络畅通 的情况下及时更新（而不是仅在离线缓存中查找），可以在此处使用*。星号被称为在线 白名单通配符。 
 - FALLBACK:部分使用/字符定义了一个 URL模板。它的作用是访问每个页面时都会问“缓存 中有这个页面吗？”，如果有则显示缓存页面，如果没有则显示指定的 offline.html 文件。

 有一种更简单的办法来设置 offline.manifest 文件，任何指定了离 线 manifest 文件的页面（就是在标签中追加了 manifest="/offline.manifest"的页 面）在被用户访问时都会被自动加入到本地缓存。选择使用这个方法时有一点需要注意，这种方法只会下载和缓存用户访问的 HTML页面， 不会缓存页面内引入的图片、JavaScript或者其他资源文件。如果这些资源文件是必需的， 那么请按照上节中的方法在 CACHE:部分专门声明这类文件。 

 ```properties
 CACHE 
 MANIFEST # Cache Manifest v1 
 FALLBACK: 
 //offline.html 
 NETWORK: 
 * 
 ```

 版本注释的用途

 对网站内容或任何资源文件做了修改之后，你必须得对 offline.manifest 文件也做点 修改并将其重新上传服务器。这样就能让服务器为浏览器提供新版本文件，而浏览器则 会下载该新版本文件并再次触发离线存储进程。# Cache Manifest v1 

 

