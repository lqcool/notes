### CSS3的点滴

> CSS3是由很多附加模块组合而成的，在CSS2.1的基础上进行了扩展，增强。

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
> 上面代码写的媒体查询列表，***注意第一媒体查询之间使用逗号分割，第二在上面代码中projection之后没有and，也没有任何特性/值的组合，后续表达式，意味着只 要是 projection 就满足条件***
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
> ***上面表格中的特性，除了最后两个，scan和grid特性，其它的都可以使用min和max前缀创建一个查询范围***
>
> 
>
> ##### 阻止移动浏览器自动调整页面的大小
>
> iOS和 Android浏览器都基于 WebKit核心，这两种浏览器以及 很多其他浏览器（如 Opera Mobile），***都支持用 viewport meta 元素覆盖默认的画布缩放设置***。
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
>   | width         | 设置layout viewport 的宽度，为一个正整数，使用字符串”width-device”表示设备宽度 |
>   | initial-scale | 设置页面的初始缩放值，为一个数字，可以带有小数。             |
>   | minimum-scale | 允许用户的最小缩放值，为一个数字，可以带小数                 |
>   | maximum-scale | 允许用户的最大缩放值，为一个数字，可以带小数                 |
>   | user-scalable | 是否允许用户缩放可以为no，表示禁止用户缩放                   |
>   | height        | 设置layout viewport 的高度，很少使用                         |
>
>   例如：content="initial-scale=1.0"，表示浏览器将按照其视口的实际大小来渲染页面。
>
>   例如：content="width=device-width, maximum-scale=3, minimum-scale=0.5"，允许用户将页面多放大至设备 宽度的 3倍，小压缩至设备宽度的一半。
>
> 
