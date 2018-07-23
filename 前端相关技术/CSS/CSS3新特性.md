### CSS3新特性

整理自：https://juejin.im/entry/595f1e3c5188250d914dd53c

**CSS3选择器**

- element1~element2：选择前面有element1元素的每个element2元素 
- [attribute^=value]：选择某元素attribute属性是以value开头的 
- [attribute$=value]：选择某元素attribute属性是以value结尾的 
- [attribute*=value]：选择某元素attribute属性包含value字符串的 
- E:first-child：匹配的是某父元素的第一个子元素，可以说是结构上的第一个子元素 
- E:first-of-type：匹配的是某父元素下相同类型子元素中的第一个（这里不再限制是第一个子元素了，只要是该类型元素的第一个就行了 ）
- E:last-of-type: 匹配的是某父元素下相同类型子元素中的最后一个（这里不再限制是最后一个子元素了，只要是该类型元素的最后一个就行了 ）
- E:only-of-type: 选择属于其父元素唯一的E元素的每个E元素
- E:only-child：选择属于其父元素的唯一子元素的每个E元素
- E:nth-child(n)：选择属于其父元素的第n个子元素的每个E元素
- E:nth-child(n): 选择属于其父元素的第n个子元素的每个E元素
- E:nth-of-type(n): 选择属于其父元素第n个E元素的每个E元素
- E:nth-last-of-type(n): 选择属于其父元素倒数第n个E元素的每个E元素
- E:last-child: 选择属于其父元素最后一个子元素每个E元素 
- :root: 选择文档的根元素 
- E:empty: 选择没有子元素的每个E元素（包括文本节点) 
- E:target: 选择当前活动的E元素 
- E:enabled: 选择每个启用的E元素 
- E:disabled: 选择每个禁用的E元素 
- E:checked: 选择每个被选中的E元素 
- E:not(selector): 选择非selector元素的每个元素 
- E::selection: 选择被用户选取的元素部分 

**CSS3动画新特性Transition,Transform和Animation**

（1）Transition

Transition可以在当元素从一种样式变换为另一种样式时为元素添加效果，而不用使用Flash动画或JavaScript 它有如下的几个属性

- transition-property：规定应用过渡的CSS属性的名称 
- transition-duration：规定完成过渡效果需要多长时间
- transition-delay：规定过渡效果何时开始，默认是0 
- transition-timing-function：规定过渡效果的时间曲线，默认是”ease”，还有linear、ease-in、ease-out、ease-in-out和cubic-bezier等过渡类型
- transition：简写属性，用于在一个属性中设置四个过渡属性

非简写形式：

```css
div {
    transition-property: width;
    transition-duration: 1s;
    transition-timing-function: linear;
    transition-delay: 2s;
    /* Firefox 4 */
    -moz-transition-property:width;
    -moz-transition-duration:1s;
    -moz-transition-timing-function:linear;
    -moz-transition-delay:2s;
    /* Safari 和 Chrome */
    -webkit-transition-property:width;
    -webkit-transition-duration:1s;
    -webkit-transition-timing-function:linear;
    -webkit-transition-delay:2s;
    /* Opera */
    -o-transition-property:width;
    -o-transition-duration:1s;
    -o-transition-timing-function:linear;
    -o-transition-delay:2s;
}
```

简写形式：

```css
div {
    transition: width 1s linear 2s;
    /* Firefox 4 */
    -moz-transition:width 1s linear 2s;
    /* Safari and Chrome */
    -webkit-transition:width 1s linear 2s;
    /* Opera */
    -o-transition:width 1s linear 2s;
}
```

（2）Transform

Transform用来向元素应用各种2D和3D转换，该属性允许我们对元素进行旋转、缩放、移动或倾斜等操作。 Transform有各种变换类型如下：

- none: 定义不进行转换 
- matrix(n,n,n,n,n,n): 定义2D转换，使用六个值的矩阵。
- matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n): 定义3D转换，使用16个值的4x4矩阵。
- translate(x,y): 定义2D位移转换。
- translate3d(x,y,z): 定义3D位移转换。
- translateX(x)：定义位移转换，只是用X轴的值
- translateY(y)：定义位移转换，只是用Y轴的值
- translateZ(z)：定义位移转换，只是用Z轴的值
- scale(x,y)：定义2D缩放转换 
- scale3d(x,y,z)：定义3d缩放转换
- scaleX(x): 通过设置X轴的值来定义缩放转换 
- scaleY(y): 通过设置Y轴的值来定义缩放转换 
- scaleZ(z): 通过设置Z轴的值来定义3D缩放转换 
- rotate(angle)，定义2d旋转，在参数中规定角度
- rotate3d(x,y,z,angle): 定义3D旋转。
- rotateX(angle): 定义沿着X轴的3D旋转。
- rotateY(angle): 定义沿着Y轴的3D旋转。
- rotateZ(angle): 定义沿着Z轴的3D旋转。
- skew(x-angle,y-angle): 定义沿着X和Y轴的2D倾斜转换。
- skewX(angle): 定义沿着X轴的2D倾斜转换。
- skewY(angle): 定义沿着Y轴的2D倾斜转换。
- perspective(n): 为3D转换元素定义透视视图。

使用形式：

```css
div{
    transform:rotate(7deg);
    -ms-transform:rotate(7deg);/*IE*/
    -moz-transform:rotate(7deg);    /* Firefox */
    -webkit-transform:rotate(7deg);/*Safari和Chrome*/
    -o-transform:rotate(7deg);/* Opera */
}
```

（3）Animate定义动画

使用CSS3的新特性Animate可以定义复杂的动画效果，可以免去使用flash或者js等，但是使用Animate制作出来的动画有点粗糙，使用js或者flash等制作出来的动画比较的细腻

关键帧：keframes（ 原文: <http://www.w3cplus.com/content/css3-animation> © [w3cplus.com](http://www.w3cplus.com/) ）

说明：第一帧我要执行什么动作，第二帧我要执行什么动作，这些都是通过关键帧来进行控制的，keyframes有自己的语法规则，他的命名是由"@keyframes"开头，后面紧接着是这个“动画的名称”加上一对花括号“{}”，对于一个"@keyframes"中的样式规则是由多个百分比构成的，如“0%”到"100%"之间，我们可以在这个规则中创建多个百分比，我们分别给每一个百分比中给需要有动画效果的元素加上不同的属性，从而让元素达到一种在不断变化的效果，比如说移动，改变元素颜色，位置，大小，形状等，不过有一点需要注意的是，我们可以使用“fromt”“to”来代表一个动画是从哪开始，到哪结束，也就是说这个 "from"就相当于"0%"而"to"相当于"100%",值得一说的是，其中"0%"不能像别的属性取值一样把百分比符号省略，我们在这里必须加上百分符号（“%”）如果没有加上的话，我们这个keyframes是无效的，不起任何作用。因为keyframes的单位只接受百分比值。著作权归作者所有。 

Animate中使用的属性：

- animate-name：动画属性名，也就是我们前面keyframes定义的动画名，可以同时附几个animate给一个元素，我们只需要用','隔开。
- animate-duration：用来指定元素播放动画所持续的时间长 ，取值为数值，单位为s （秒） 
- animate-time-function：指元素根据时间的推进来改变属性值的变换速率，就是动画的播放方式，同上面的transition一样，有6种方式ease，ease-in，ease-out，ease-in-out，linear，cubic-bezier
- animate-delay：用来指定动画的开始时间，取值为数值，单位为s
- animate-iteration-count：用来指定元素播放动画的循环次数，默认值为“1”；infinite为无限次数循环。 
- animate-direction：默认值为normal，动画的每次循环都是向前播放，另一个值是alternate，他的作用是，动画播放在第偶数次向前播放，第奇数次向反方向播放。
- animate-play-state：animation-play-state主要是用来控制元素动画的播放状态。其主要有两个值，running和paused其中running为默认值。

使用例子：

```css
@-webkit-keyframes mud { 
   0% { 
        opacity: 0; 
        font-size: 12px; 
   } 
   100% { 
        opacity: 1; 
        font-size: 24px; 
   } 
} 

.divClass_on {
    -webkit-animate-name:mud;/*动画属性名，也就是我们前面keyframes定义的动画名*/
    -webkit-animate-duration:1.5s;/*动画持续时间*/
    -webkit-animation-iteration-count: 4;/*定义循环资料，infinite为无限次*/
    -webkit-animation-delay: 2s;/*动画延迟时间*/
    -webkit-animation-direction: alternate; /*定义动画方式*/
    -webkit-animation-timing-function: ease-in-out; /*动画频率，和transition-timing-function是一样的*/
}
```



**CSS3新增的边框特性**

新增的几个边框属性：

- border-radius：绘制圆角边框（以前通过图片方式）
- box-shadow：为元素添加阴影
- border-image：使用图片来绘制边框

**CSS3新增的背景特性**

- background-clip：用来确定背景的绘画区域，有一下几种可能的属性。

  - border-box ：背景从border开始显示；
  - padding-box：背景从padding开始显示；
  - content-box：背景显content区域开始显示 ；
  - no-clip： 默认属性，等同于border-box 

- background-origin：用来确定背景的位置，通常与background-position联合使用，可以从border、padding、content来计算background-position，就如同background-clip一样

- background-size：常用来调整背景图片的大小，主要用于设定图片本身，有如下的属性

  - background-size: contain; 缩小图片以适合元素（维持像素长宽比）
  - background-size: cover; 扩展元素以填补元素（维持像素长宽比）
  - background-size: 100px 100px; 缩小图片至指定的大小
  - background-size: 50% 100%; 缩小图片至指定的大小，百分比是相对包 含元素的尺寸

- background-break

  CSS3中，元素可以被分成几个独立的盒子（如使内联元素span跨越多行），background-break 属性用来控制背景怎样在这些不同的盒子中显示。 

  - background-break: continuous; 默认值。忽略盒之间的距离（也就是像元素没有分成多个盒子，依然是一个整体一样）
  - background-break: bounding-box; 把盒之间的距离计算在内 
  - background-break: each-box; 为每个盒子单独重绘背景 

**CSS3文字效果**

（1）word-wrap

CSS3中，word-wrap属性允许您允许文本强制文本进行换行，即这意味着会对单词进行拆分。所有主流浏览器都支持 word-wrap 属性。 该属性包括两种值：normal和break-word

```css
p {
    word-wrap:break-word;/*在长单词或URL地址内部进行换行*/
}
```

（2）text-overflow

它与word-wrap是协同工作的， word-wrap设置或检索当当前行超过指定容器的边界时是否断开转行，而 text-overflow则设置或检索当当前行超过指定容器的边界时如何显示。 对于“text-overflow”属性有“clip”和“ellipsis”两种可供选择。 

将超出部分显示为点号例子：

```html
<div style="overflow:hidden;width: 100px;white-space:nowrap;text-overflow:ellipsis;height: 40px;">
    它与word-wrap是协同工作的，word-wrap设置或检索当当前行超过指定容器的边界时是否断开转行，而 text-overflow则设置或检索当当前行超过指定容器的边界时如何显示。
</div>
```

（3）text-shadow

CSS3中，text-shadow可向文本应用阴影。能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色。 

```css
h1{
    text-shadow: 5px 5px 5px #FF0000;
    /*
    	第一个参数指的是离开文字横向距离
    	第二个参数指的是离开文字纵向距离
    	第三个参数指的阴影的模糊半径
    	第四个参数指的是阴影的颜色
    */
}
```

（4）text-decoration

CSS3里面开始支持对文字的更深层次的渲染，具体有三个属性可供设置： 

- text-fill-color: 设置文字内部填充颜色
- text-stroke-color: 设置文字边界填充颜色
- text-stroke-width: 设置文字边界宽度

**CSS3中的渐变**

CSS3提供了渐变的效果，包括线性渐变（linear-gradient）和放射性渐变（radial-gradient

**CSS3中的@font-face特性**

在CSS3之前，web设计师必须使用已在用户计算机上安装好的字体。 通过CSS3，web设计师可以使用他们喜欢的任意字体。当您您找到或购买到希望使用的字体时，可将该字体文件存放到web服务器上，它会在需要时被自动下载到用户的计算机上。 

在新的@font-face规则中，必须首先定义字体的名称（比如myFont），然后指向该字体文件。 如需为HTML元素使用字体，请通过font-family属性来引用字体的名称 (myFont) 

```css
@font-face {
    font-family: myFirstFont;
    src: url('Sansation_Light.ttf'),
         url('Sansation_Light.eot'); /* IE9+ */
}
div{
    font-family:myFirstFont;
}
```

**CSS3中的多列布局**

CSS3中，能够创建多个列来对文本进行布局，IE10和Opera支持多列属性。Firefox 需要前缀-moz-，Chrome和Safari需要前缀-webkit-。主要有如下三个属性： 

- column-count: 规定元素应该被分隔的列数。
- column-gap: 规定列之间的间隔。
- column-rule: 设置列之间的宽度、样式和颜色规则

**box-sizing**

- content-box: padding和border不被包含在定义的width和height之内。对象的实际宽度等于设置的width值和border、padding之和，即 (Element width = width + border + padding)，此属性表现为标准模式下的盒模型。
- border-box: padding和border被包含在定义的width和height之内。对象的实际宽度就等于设置的width值，即使定义有border和padding也不会改变对象的实际宽度，即 (Element width = width)，此属性表现为怪异模式下的盒模型。

**outline-offset**

outline-offset属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。 







