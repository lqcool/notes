本文参考：《响应式Web设计：HTML5+CSS3实战》

### 响应式Web设计

#### 媒体查询

> ##### 简介
>
> 媒体查询可以让我们根据设备显示器的特性为其设定 CSS样式，仅使用几行代 码，就可以根据诸如视口宽度、屏幕比例、设备方向（横向或纵向）等特性来改变页面 内容的显示方式。
>
> 媒体查询由媒体类型和一个或多个检测媒体特性的条件表达式组成。媒体查询 中可用于检测的媒体特性有 width、height 和 color（等）。使用媒体查询， 可以在不改变页面内容的情况下，为特定的一些输出设备定制显示效果。 
>
> 
>
> ##### CSS 2样式表通过\<link\>标签的 media 属性为样式表指定 设备类型（如显示屏或打印机）
>
> (1) \<link rel="stylesheet" media="***screen and (orientation:position)***" href="some.css" \/\>
>
> 上面代码表示：媒体查询表达式询问了媒体类型（你是一块显示屏吗？），然后询问了媒体特性（显 示屏是纵向放置的吗？）任何纵向放置的显示屏设备都会加载some.css样式表。
>
> (2) \<link rel="stylesheet" media="***not*** screen and (orientation:position)" href="some.css" \/\>
>
> 上面的代码效果与(1)恰恰相反，任何非纵向放置的显示屏设备都会加载some.css
>
> (3) \<link rel="stylesheet" media="not screen and (orientation:position) ***and (min-width:800px)***" href="some.css" \/\>
>
> 将多个表达式组合在一起，上面又多加了一个限制条件，只有视口宽度大于800像素的显示屏才加载文件。
>
> (4)\<link rel="stylesheet" media="not screen and (orientation:position) and (min-width:800px)***,projection***" href="some.css" \/\>
>
> 上面代码写的媒体查询列表，注意第一媒体查询之间使用逗号分割，第二在上面代码中projection之后没有and，也没有任何特性/值的组合，后续表达式，意味着只 要是 projection 就满足条件
>
> 
>
> ##### 媒体查询能检测的特性
>
> 创建媒体查询的时候，最常用的是设备的视口宽度（width）和屏幕宽度（device-width）,其它的特性检查比较少。
>
> | 特性                | 说明                                                         |
> | ------------------- | ------------------------------------------------------------ |
> | width               | 视口宽度（常用）                                             |
> | height              | 视口高度                                                     |
> | device-width        | 渲染表面的宽度（对我们来说，就是设备屏幕的宽度）（常用）     |
> | device-height       | 渲染表面的高度（对我们来说，就是设备屏幕的高度）             |
> | orientation         | 设备处于横向还是竖向                                         |
> | aspect-ratio        | 基于视口宽度和高度的宽高比，一个 16∶9 比例的显示屏可以这样 定义 aspect-ratio: 16/9 |
> | device-aspect-ratio | 和 aspect-ratio 类似，基于设备渲染平面宽度和高度的 宽高比    |
> | color               | 每种颜色的位数，例如 min-color: 16 会检测设备是否拥有 16位颜色 |
> | color-index         | 设备的颜色索引表中的颜色数。值必须是非负整数                 |
> | monochrome          | 检测单色帧缓冲区中每像素所使用的位数。值必须是非负整数，如 monochrome: 2 |
> | resolution          | 用来检测屏幕或打印机的分辨率，如 min-resolution: 300dpi。还 可以接受每厘米像素点数的度量值，如 min-resolution: 118dpcm |
> | scan                | 电视机的扫描方式，值可设为 progressive（逐行扫描）或 interlace（隔 行扫描）。如 720p HD电视（720p的 p即表明是逐行扫描）匹配 scan: progressive， 而 1080i HD 电视（1080i中的 i表明是隔行扫描）匹配 scan: interlace |
> | grid                | 用来检测输出设备是网格设备还是位图设备                       |
>
> 上面表格中的特性，除了最后两个，scan和grid特性，其它的都可以使用min和max前缀创建一个查询范围



####  阻止移动浏览器自动调整页面的大小

> iOS和 Android浏览器都基于 WebKit核心，这两种浏览器以及 很多其他浏览器（如 Opera Mobile），都支持用 viewport meta 元素覆盖默认的画布缩放设置。
>
> \<meta name="viewport"  content="initial-scale=2.0,width=device-width" /\> 
>
> 上面代码中meta标签中可以设置具体的宽度（如像素值）或者缩放比例。上面表示设备实际尺寸的两倍。
>
> meta标签中：
>
> - name="viewport" 不言而喻，就是指窗口
>
> - content中写属性，用逗号隔开
>
>   | 属性名        | 属性值                                                       |
>   | ------------- | ------------------------------------------------------------ |
>   | width         | 设置layout viewport 的宽度，为一个正整数，使用字符串”device-width”表示设备宽度 |
>   | initial-scale | 设置页面的初始缩放值，为一个数字，可以带有小数。             |
>   | minimum-scale | 允许用户的最小缩放值，为一个数字，可以带小数                 |
>   | maximum-scale | 允许用户的最大缩放值，为一个数字，可以带小数                 |
>   | user-scalable | 是否允许用户缩放可以为no，表示禁止用户缩放                   |
>   | height        | 设置layout viewport 的高度，很少使用                         |
>
>   例如：content="initial-scale=1.0"，表示浏览器将按照其视口的实际大小来渲染页面。
>
>   例如：content="width=device-width, maximum-scale=3, minimum-scale=0.5"，允许用户将页面多放大至设备 宽度的 3倍，小压缩至设备宽度的一半。

#### 将网页从固定布局转换为百分比布局

> ##### 转换原因
>
> 媒体查询威力无比，但是也有局限性，那些仅使用媒体查询来 适应不同视口的固定宽度设计，只会从一组 CSS媒体查询规则突变到另一组，两者之间 没有任何平滑渐变，当某个视口处于媒体查询设置的固定 宽度范围之外（可能是某种未知的未来设备及视口），网页就需要水平滚动才能完整浏览。
>
> ##### 固定尺寸转换为百分比的公式
>
> *目标元素宽度 ÷上下文元素宽度 = 百分比宽度*
>
> 使用此公式重要一点就是一定找对目标元素和上下文元素。例如有如下结构：
>
> ```html
> <style>
>     #div1{
>         width:960px;
>     }
>     #div2{
>         width:940px;
>         margin-right:10px;
>         margin-left:10px;
>     }
>     #div3{
>         width:40px;
>     }
> </style>
> <div id="div1">
>     <div id="div2"></div>
>     <div id="div3"></div>
> </div>
> <!-- 上面的代码中div2和div3的上下文元素就是div1，那么相应的转换为百分比就是div1:(940 ÷ 960) % ，div2:（40 ÷ 960) % -->
> ```
>
> ##### 采用em替换px(弹性文字)
>
> em相对于px的优势：
>
> - 一是那 些使用 Internet Explorer 6的用户也将能够缩放文字
> - 二是这样做可以使我们设计师和开 发者的生活更简单
>
> em 的实际大小是相对于其上下文的字体大小而言的，文字也使用公式：目标元素尺寸÷上下文元素尺寸=百分比尺寸。
>
> 现代浏览器默认文字大小为16像素，显示申明除外，下面给body应用的任何一种效果都一样：
>
> - font-size:100%
> - font-size:16px;
> - font-size:1em;
>
>
>
> ##### 弹性图片、媒体元素
>
> 实现图片实现流动布局相应的缩放非常简单，只需要在CSS中申明如下：
>
> ```css
> img{
>     max-width:100%;
> }
> ```
>
> 这样就可以使图片自动缩放到与其容器 100%匹配。更进一步，可以将同样的样式应用到 其他多媒体标签上。
>
> ```css
> img,object,video,embed {   
>     max-width: 100%; 
> } 
> ```
>
> *给弹性图片设置阈值*
>
> 图片可以随着视口的伸缩而缩放了。但是如果将视口拉大，直到图片拉伸至超出其原 始尺寸，那问题就麻烦了。通过追加另一个特定样式来为图片设置阈值： max-width
>
> ```css
> .someimageclass {      
>     width: 28.9398281%; /* 698 ÷ 202 */   
>     max-width: 202px; 
> } 
> ```
>
> 
>
> ##### 超级全能的 max-width 属性 
>
> 另一种限制页面无限制扩张的方法是给外层的包裹元素设置一个max-width属性，例如：
>
> ```css
> #wrap{
>     width:96%;
>     max-width:1500px;
> }
> ```
>
> 这样意味着页面会缩放至视口宽度的 96%，但绝不会超过 1500像素。
>
> 