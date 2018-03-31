### CSS3的点滴

#### CSS3给前端带来了什么？（CSS3特性）

> - 过去：我们要么押注用户愿意为优雅漂亮的设计多等点时间（顺便说一句，用户不愿意）， 要么为了可用性而抛弃图片，牺牲设计理念。
> - 现在：CSS3 让我们可以在很多方面不必再妥协和 牺牲。仅需要几行代码（而且不用图片），CSS3就可以创造出各种效果：圆角、背景渐变、文字阴影、盒阴影、自定义字体以及多重背景图片（当然，这个效果确实需要图片）。甚至我们之前需要依赖 JavaScript的一些基本交互效果如悬停动画，也 可以使用纯 CSS3 来实现。
>
> 甚至我们之前需要依赖 JavaScript的一些基本交互效果如悬停动画，也 可以使用纯 CSS3 来实现。

#### 私有前缀及其用法 

> 在 CSS3模块标准尚未被 W3C批准或者标准所提议的特性尚未被浏览器完全实现时，浏 览器厂商会使用所谓的私有前缀来测试“试验性的”CSS 特性。
>
> ```css
> .round{   
>     -khtml-border-radius: 10px; /* Konqueror */   
>     -rim-border-radius: 10px; /* RIM */   
>     -ms-border-radius: 10px; /* Microsoft */   
>     -o-border-radius: 10px; /* Opera */   
>     -moz-border-radius: 10px; /* Mozilla (如 Firefox) */   
>     -webkit-border-radius: 10px; /* Webkit (如 Safari 和 Chrome) */   
>     border-radius: 10px; /* W3C */ 
> } 
> ```
>
> CSS的工作方式是浏览器逐行下载样式表，应用其可识别的属性，忽略 其无法识别的属性。 此外，样式表中后出现的属性优先级高于之前出现的同名属性。正是由于这种层叠，我 们就可以先列出私有前属性，后使用无前的属性来修正，以确保当该特性被完全实现时，浏览器会运行正确的效果，而不是之前的特定浏览器的试验性效果。 

#### 快速而有效的CSS技巧

##### CSS3多栏布局（column-width、column-count、column-gap、column-rule）

> CSS3出现之前，你必须将内容拆分到不 同的标签中，然后分别设定样式。CSS3可以让我们将一段或者多段内容分不到多列网格中。
>
> ```html
> <style>
> 	#main {   column-width: 12em; }	
> </style>
> <div id="main" role="main">    
>     <p>lloremipsimLoremipsum dolor sit amet, consectetur     // 任意文字 // </p>     		<p>lloremipsimLoremipsum dolor sit amet, consectetur     // 任意文字 // </p> 
> </div>
> ```
>
> 可以通过设定具体栏位宽度（如 12em）或者栏位数量（如 3）来使内容分布在多列网 格中，如上面代码中，main指定的栏位宽度为12em，无论视口尺寸是多少，内容都会分布在宽度为 12em的栏位中。视口尺 寸发生变化之后，浏览器会自动调整栏位数量。
>
> 如果想保持栏位数量不变而让栏位宽度根据视口自动调整，可以参考如下代码： 
>
> ```css
> #main {   column-count: 4; } 
> ```
>
> 应用上述代码以后，内容将被分为4列，屏幕宽度发生变化，列数也不会发生变化，只是会自动调整列的宽度。
>
> **增加栏位间隙和分割线**
>
> 增加栏位之间的间隙可以使用column-gap属性：
>
> ```css
> #main{	column-gap:2em}
> ```
>
> 增加栏位之间的分割线可以使用column-rule属性：
>
> ```css
> #main{	column-rule:thin dotted #999}
> ```
>
> 需要给多列布局声明使用私有前，以确保兼容广泛的浏览器。 
>
> ##### 文字换行(word-wrap)
>
> 要想文字不会超出容器的范围，使用word-wrap属性
>
> ```
> #xxx{	word-wrap:break-word}
> ```
>
> 给外层的包裹元素追加该声明后，超长的文字将会出现换行。

#### CSS3新增的选择器及其用法

#####  CSS3 的子字符串匹配属性选择器 

> CSS3允许我们基于属性选择器的子字符串来选择元素，换句话说，现在我们可以根据属性的部分内容来选择元素。三种匹配模式分别是：
>
> - 以特定前缀开头
> - 包含特定字符串
> - 以特定后缀结尾
>
> 具体用法：
>
> - 特定前缀开头
>
>   Element[attribute^="value"]
>
>   例如选择网站中所有alt属性值以film开头的图片
>
>   ```css
>   img[alt^="film"]{
>       border:1px solid red;
>   }
>   ```
>
>   该选择器的关键字符是^符号，它的意思是“以此开头”。 
>
> - 包含特定字符串
>
>   Element[attribute*="film"]
>
>   选择网站中所有 alt 属性值中包含 film 字符串的图片
>
>   ```css
>   img[alt*="film"]{
>       border:1px solid red;
>   }
>   ```
>
>   该选择器的关键字符是*符号，它的意思是“包含”。 
>
> - 以特定后缀结尾
>
>   Element[attribute$="value"]
>
>   选择网站中所有 alt 属性值以 film 结尾的图片
>
>   ```css
>   img[alt$="film"]{
>       border:1px solid red;
>   }
>   ```
>
>   该选择器的关键字符是$，它的意思是“以此结尾”。 
>
>   HTML5 中的 ID 值可以用数字开头 ,HTML 4.01是认为 ID 值以数字开头是无效的。

##### CSS3 结构伪类 

> CSS2.1已经有一个针对列表第一项的选择器： :first-child
>
> CSS3又增加了一个选择器用以匹配后一项： :last-child
>
> - :first-child
> - :last-child
> - :nth-child