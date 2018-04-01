### CSS3的点滴

#### 1、CSS3给前端带来了什么？（CSS3特性）

> - 过去：我们要么押注用户愿意为优雅漂亮的设计多等点时间（顺便说一句，用户不愿意）， 要么为了可用性而抛弃图片，牺牲设计理念。
> - 现在：CSS3 让我们可以在很多方面不必再妥协和 牺牲。仅需要几行代码（而且不用图片），CSS3就可以创造出各种效果：圆角、背景渐变、文字阴影、盒阴影、自定义字体以及多重背景图片（当然，这个效果确实需要图片）。甚至我们之前需要依赖 JavaScript的一些基本交互效果如悬停动画，也 可以使用纯 CSS3 来实现。
> - 通过设置CSS3效果，不用在依赖于图片，减少了http的请求数量，从而使得网页加载更加快捷，性能上面有所提升。
>
> 甚至我们之前需要依赖 JavaScript的一些基本交互效果如悬停动画，也 可以使用纯 CSS3 来实现。

#### 2、私有前缀及其用法 

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

#### 3、快速而有效的CSS技巧

##### 3.1、CSS3多栏布局（column-width、column-count、column-gap、column-rule）

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
> 要想文字不会超出容器的范围，使用word-wrap属性，有两个可用值，第一个是normal只在允许的断字点换行（浏览器保持默认处理）,第二个break-word，是在长单词或者长的url内部进行换行。
>
> ```
> #xxx{	word-wrap:break-word}
> ```
>
> 给外层的包裹元素追加该声明后，超长的文字将会出现换行。

#### 4、CSS3新增的选择器及其用法

#####  4.1、CSS3 的子字符串匹配属性选择器 

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

##### 4.2、CSS3 结构伪类 

> CSS3的计数方式和jQuery不太一样，jQuery计数是从0开始，而CSS3是从1开始。
>
> CSS2.1已经有一个针对列表第一项的选择器： :first-child
>
> CSS3又增加了一个选择器用以匹配后一项： :last-child
>
> - :first-child
>
> - :last-child
>
> - :nth-child、nth-last-child、nth-of-type、nth-last-of-type
>
>   在下面这些伪类中除了使用odd和even参数以外，还可以使用表达式，例如:first-child(2n+2)
>
>   child和last-child的区别是，last-child是从文档节点树的末尾开始计算。
>
>   nth-last-child(-n+3)就是从倒数第三个元素开始，向后选择之后的所有元素。
>
>   数值表达式中也可以使用负数，例如:nth-child(3n-2)，表示从倒数第二个元素开始，然后每3个元素选择一个。
>
>   :nth-last-of-type 则可以指定你想选择的元素类型。
>
> - :not
>
>   否定伪类选择器，用于选择不满足某些条件的元素，下面的代码就是选择不包含类internal的li元素
>
>   ```css
>   nav ul li:not(.internal) a{
>       color:red;
>   }
>   ```

##### 4.3、对伪元素的修正

> CSS2就已经有了伪类元素，例如p:first-line会选中\<p\>元素的第一行内容，p:first-letter会选中\<p\>元素的第一个字母，CSS3要求对伪元素使用两个冒号来进行与伪类进行区别，因此，应该改为p::first-line和p::first-letter，注意 Internet Explorer 8及更低版本的 IE无法 识别两个冒号的语法，它们只识别一个冒号。 
>
> ```css
> p::first-line{
>     color:red;
> }
> ```

#### 5、自定义网页字体

> @fount-face规则，@font-face 规则在 CSS2中已经存在（但随后在 CSS 2.1中被删除）。@font-face 已经被重新引入 CSS3 字体模块。
>
> **使用@font-face 嵌入网页字体** 
>
> 从 Font Squirrel上下 载的@font-face 包是一个 ZIP文件，里面包含该字体各种格式的文件（WOFF、TTF、 EOT 和 SVG），以及一个用来演示字体调用规则的 stylesheet.css 文件。
>
> 使用 Bebas Neue字体的规则如下： 
>
> ```css
> @font-face{
>    font-family: 'BebasNeueRegular';    
>    src: url('BebasNeue-webfont.eot');     
>    src: url('BebasNeue-webfont.eot?#iefix') format('embedded- opentype'),
>    url('BebasNeue-webfont.woff') format('woff'),          
>    url('BebasNeue-webfont.ttf') format('truetype'),          
>    url('BebasNeue-webfont.svg#BebasNeueRegular') format('svg');     
>    font-weight: normal;     
>    font-style: normal;
> }
> ```
>
> 和浏览器私有前的原理类似，浏览器会根据自身特性应用列表中能识别的样式，忽略 无法识别的样式。用这种方法能保证无论什么浏览器都有一个可用字体。
>
> 接下来就是给相关样式设置正确的字体和粗细（如果需要）。 
>
> ```css
> nav ul li a {    
>     height: 42px;    
>     line-height: 42px;    
>     text-decoration: none;    
>     text-transform: uppercase;    
>     font-family: 'BebasNeueRegular';    
>     font-size: 1.875em; /*30 ÷ 16 */     
>     color: black;  
> } 
>
> ```

#### 6、新的CSS3颜色格式和透明度

> CSS3允许我们使用新方法如 RGB或 HSL来声明颜色。另外，我们还能在这两个 方法后边追加一个透明通道（分别是 RGBA和 HSLA）。 

##### 6.1、RGB颜色和HSL颜色

> - RGB（红绿蓝）是一种已存在了数十年的颜色体系。它的原理是通过定义不同的红绿蓝 色值来组成一个颜色。 color: rgb(254, 2, 8); 圆括号中的颜色值必须按照红、绿、蓝这个顺序排列，中间通过逗号分隔。
>
> - CSS3还可使用 HSL（色相、饱和度、亮度）模式来声明颜色。 hsl(315, 100%, 60%)
>
>   HSL 被广泛使用是因为它非常容易理解，根据该模式提供的颜色值就能描绘出具体颜 色。
>
>   HSL模式基于一个 360°的色相环，第一个数字代表色相，60°时为黄色，120°时为绿 色，180°时为色，240°时为蓝色，300°时为洋红色，360°时为红色。所以前面提 到的 HSL颜色色相为 315，所以很容易看出它介于洋红（300°）和红（360°）之间。
>
>   后的两个值分别表示饱和度和亮度，值为百分比，用于改变基础的色相。如果想要更加 饱满的颜色，则第二个值使用一个高一点的百分比即可。后一个值控制亮度，可在 0% 的全黑到 100%的全白之间变化。 

##### 6.2、针对IE6、IE7和IE8提供备用颜色值

> 版本 9以下的 IE浏览器不支持 RGB和 HSL。因此，如果需要针对这 些浏览器提供备用的颜色声明，则要将其放在 RGB 或 HSL 值之前。例如，为导航链接增加备用十六进制颜色值的代码如下：
>
> ```css
> nav ul li:nth-child(odd) a {   
>     color: #fe0208;   
>     color: hsl(359, 99%, 50%);
> }
> ```

##### 6.3、透明通道

> 为什么不继续使用多年可靠的十六进制颜色值？
>
> **HSL 和 RGB 与十六进制颜色值大的区别，是它 们支持透明通道。这意味着可以让元素透明，使其下方的元素可见。** 
>
> 例如设置一个背景图片，然后设置一个div在上面
>
> ```css
> body{
>     background:url(../img/gx.jpg) repeat;
> }
> #wrapper{
>     margin-right:auto;
>     margin-left:auto;
>     width:96%;/*最外层的div*/
>     max-width:1414px;
>     background-color:hsla(0,0%,100%,0.8);
> }
> ```
>
> **HSLA颜色声明与标准的HSL规则类似。**不过颜色必须得声明为hsla模式（而不是hsl）， 增加一个额外的透明度值，该值的格式是一个介于 0（全透明）到 1（不透明）之间的 小数。上面代码中我们将白色的#wrapper 设置为半透明。
>
> RGBA的语法和 HSLA的基本一样，即在颜色值后追加一个透明度值： 
> background-color: rgba(255, 255, 255, 0.8); 
>
> **为什么不用opacity?**
>
> CSS3还允许通过 opacity 声明来设置元素的透明度。该透明度的值也 是一个介于 0到 1之间的小数（如将 opacity 设置为 0.1表示为 10%透 明）。*但是这种透明度与 RGBA 及 HSLA 有所不同，这种方式设置的透 明度会对整个元素产生影响（元素的内容都会透明）。*反之，使用 HSLA 或 RGBA则可以仅让元素的某些部分有透明效果。这样，一个元素可以 带有 HSLA透明背景，但内部的文字仍然不透明。 

#### 7、文字阴影

> 文字阴影text-shadow有过一个前生，在CSS2.1被废除，现在右出现在了CSS3中。
>
> 基本语法：
>
> ```css
> .element{
>     text-shadow:1px 1px 1px #cccccc;
>     /*右边的阴影大小、下面的阴影大小、模糊距离、颜色*/
> }
> ```
>
> 注意：阴影值的速记规则永远是先向右再向下。因此第一个值指的是右侧阴影的大小，第二个是指的是下方阴影的大小，第三个值指的是模糊距离（阴影从开始变淡到完全消失的距离），最后一个是阴影颜色。
>
> **HEX、HSL 或 RGB 颜色都可以** 
>
> 上面的阴影颜色不一定非得是十六进制，还可以是HSL(A)或者RGB(A)，注意浏览器必须得同时支持 HSL/RGB颜色和 text-shadow 才能渲染出效果。
>
> 考虑 到浏览器兼容性，在使用 HSLA或 RGBA阴影时一般都这样做： 
>
> ```css
> #pn{
>     text-shadow: 4px 4px 0px #404442
> }
>
> #pn{
>     text-shadow: 4px 4px 0px hsla(140,3%,26%,0.4)
> }
> /*先定义一个使用十六进制颜色的阴影（作为针对老版本浏览器的备用方案），然后再定 义一个使用 HSLA或 RGBA颜色的阴影。 */
> ```
>
> **px、em 或 rem 都行** 
>
> 阴影值也可以使用 em 或 rem 单位。
>
> **取消文字阴影**
>
> ```css
> #pn{
>     text-shadow:none;
> }
> ```
>
> **左上方阴影**
>
> ```css
> #pn{
>     text-shadow:-4px -4px 0px #dad7d7;
> }
> /*使用负数可以出现左上方的阴影效果*/
> /*如果不需要阴影模糊效果，可以将 text-shadow 的第三个值（模糊半径）从声明中删除*/
> #pn{
>     text-shadow:-4px -4px #dad7d7;
> }
> /*这种简写假定第三个值没有声明，而前两个值表示阴影偏移距离*/
> ```

#### 8、盒阴影

>盒阴影的语法与文字阴影完全一样：水平偏 移距离、垂直偏移距离、模糊半径，以及阴影颜色。
>
>.element{text-shadow:2px 3px 4px red}
>
>盒阴影的的跨浏览器支持并不好，所以明智的做法是使用浏览器私有前缀
>
>```css
>#pn{
>    -ms-box-shadow: 0px 3px 5px #444444; 
>	-moz-box-shadow: 0px 3px 5px #444444; 
>	-webkit-box-shadow: 0px 3px 5px #444444; 
>	 box-shadow: 0px 3px 5px #444444; 
>}
>```

##### 8.1、内阴影

> box-shadow 属性可以用来制作内阴影——出现在元素内部，而不是外部。内阴影可用 来制作光晕效果。
>
> 语法：
>
> .element{  box-shadow:inset 0 0 40px #000000  }
>
> 语法和之前的盒阴影差不多，只是多出来的 inset 告诉浏览器设置内阴影效果。
>
> ```css
> #pn{
>     box-shadow:inset 0 0 30px #00000;
> }
> ```

##### 8.1、多重阴影

> 和文字阴影一样，盒阴影也可以有多重阴影效果。语法也类似，即将两组值用逗号分开， 这样两组阴影就会按照代码中的先后顺序从上到下应用到元素上。换句话说，就是代码 中先声明的规则，在浏览器中会覆盖下面的规则。 
>
> ```css
> #pn{
> 	box-shadow: inset 0 0 30px hsl(0, 0%, 0%),inset 0 0 70px hsla(0, 97%, 53%, 1); 
> }
> ```

####9、背景渐变

##### 9.1、线性背景渐变

> 背景渐变唯一美中不足的是它不像其他一些 CSS3 特性那样被广泛支持。比如 IE 9 就没 有对它的原生支持（微软承诺在 IE 10中支持）。
>
> 语法：
>
> background: linear-gradient(90deg, #ffffff 0%, #e4e4e4 50%, #ffffff 100%); 
>
> - 圆括号中第一个（90deg）定义渐变个的方向，不定义该值默认是一个从垂直从顶部到底部的渐变。你还可以使用如 to top right 这样的值，这 会产生一个朝向右上角的对角线渐变。 
>
> - 第二个值（#ffffff 0%）,定义了渐变的起点，包括起点的颜色和位置，也可以使用形如 blue 20%这样的值。，这样就是从蓝色开始渐变到下一个颜色，而渐 变开始位置则位于假想的渐变路径的 20%处。同样，起点位置也可以使用负值，这样 渐变从实际可见区域之外就开始了。
>
>   ```css
>   background: linear-gradient(90deg, #ffffff -50%, #e4e4e4 50%, #ffffff 100%); 
>   /*渐变方向*/
>   /*渐变起点和颜色*/
>   /*渐变的过度点，包括颜色和位置，有多个过度点使用,隔开*/
>   /*最后一个始终是渐变的终点*/
>   /*linear：线形的，gradient：梯度*/
>   ```
>
> - 第三个值（#e4d4e4）指的是过渡颜色点，上面代码表示：沿着 90 度垂直方向，从白色开始 （(#ffffff 0%），向位于渐变路径 50%处的#e4e4e4 这个颜色（浅灰色）渐变。这里 就是渐变中的第一个过渡颜色点。如果需要的话，可以在渐变“终点”之前定义更多 的过渡颜色点（使用逗号分隔）。 
>
> - 最后一个值始终是渐变的“终点”。不论在起点之后放置了多少个过渡颜色 点，后一个值始终是终点。 

##### 9.2、径向背景渐变

> CSS3背景渐变不只局限于线性渐变，制作径向渐变同样简单。径向渐变是从一个中心点 开始，依据椭圆形或圆形进行扩张渐变。 
>
> 语法：
>
> background: radial-gradient(center, ellipse cover, #ffffff 72%, #dddddd 100%);
>
> - 第一个参数设定起点
>
>   使用的是center，也可以使用形如25px 25px这样的值，例如
>
>   background: radial-gradient(25px 25px, ellipse cover, #ffffff 72%, #dddddd 100%);
>
>   表示从距元素上边和左边均为 25 像素的那个点开始渐变
>
> - 第二个表示径向渐变的形状和大小
>
>   形状：渐变形状要么是circle（圆形，渐变会均匀的向各个方向辐射），要么是ellipse（椭圆形，在不同的方向辐射量不同）
>
>   大小：渐变的形状大小很有灵活性，这个值可以是下面的任何一种
>
>   - closest-side:（渐变形状是圆形时）以距离中心点近的一边为渐变半径，或者（渐 变形状是椭圆形时）以距离中心点近的水平或垂直边为渐变半径。 
>   - closest-corner：以距离中心点近的一角为渐变半径。 
>   - farthest-side：和 closest-side 正好相反，（渐变形状是圆形时）以距离中心点 远的一边为渐变半径，或者（渐变形状是椭圆形时）以距离中心点远的水平或垂 直边为渐变半径。 
>   - farthest-corner：以距离中心点远的一角为渐变半径。 
>   - cover：和 farthest-corner 完全一样。 
>   - contain：和 closest-side 完全一样。 
>
> - 后面的定义渐变起点、过渡颜色点以及终点（这部分和线性渐变是一样的）
>
>   ```css
>   #pan{
>       background: radial-gradient(
>           20px 20px, circle cover,                              
>           hsla(9,69%,85%,0.5) 0%,                    
>           hsla(9,76%,63%,1) 50%,                              
>           hsla(10,98%,46%,1) 51%,                              
>           hsla(24,100%,50%,1) 75%,                              
>           hsla(10,100%,39%,1) 100%
>           ); 
>   }
>   ```
>
>   ​

