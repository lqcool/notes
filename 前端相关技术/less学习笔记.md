## LESS学习笔记

Less是一门CSS预处理语言，它扩展了CSS，增加了变量、Mixin、函数等特性，使得CSS更加易于维护和扩展。Less可以运行在Node或者浏览器环境。	

**Less嵌套规则**

Less支持嵌套规则，style.less文件内容如下：

```less
.container{
    .header{
        border:1px solid red;
    }
    .body{
        height:400px;
        .header{
           	background:red;
        }
    }
}
```

运行lessc style.less style.css命令编译后

```css
.container .header {
  border: 1px solid red;
}
.container .body {
  height: 400px;
}
.container .body .header {
  background: red;
}
```

**Less操作**

LESS支持一些算术运算，例如加号(+)，减号( - )，乘法(*)和除法(/)，它们可以对任何数字，颜色或变量进行操作。 

```less
@fontSize: 10px;
.myclass {
 font-size: @fontSize * 2;/*编译后，这里会变成font-size:20px*/
 color:green;
}
```

**Less转义**

它动态构建选择器，并使用属性或变量值作为任意字符串。 

```less
p {
  color: ~"green";/*经过转义，变成color:green*/
}
```

在将LESS代码编译为CSS代码之后，〜“some_text"中的任何内容将显示为 some_text  

**Less函数**

LESS映射具有值操作的JavaScript代码，并使用预定义的函数来操纵样式表中的HTML元素。 它提供了操作颜色的几个功能，如圆函数，floor函数，ceil函数，百分比函数等。

```less
@color: #FF8000;
@width:1.0;
.mycolor{
  color: @color;
  width: percentage(@width);/*这里的函数percentage是百分比函数，转化后为width:100%;*/
}
```

**Less变量范围**

变量范围指定可用变量的位置。 变量将从本地作用域搜索，如果它们不可用，则编译器将从父作用域搜索。 （从子到父）

```less
@var: @a;
@a: 15px;
.myclass {
  font-size: @var;
  @a:20px;
  color: green;
}
```

转化后的css代码

```
.myclass {
  font-size: 20px;
  color: green;
}
```

**Less导入**

通过@import "less或者css路径" 导入less或者css，下面是myfile.less

```less
.myclass{
    color: #FF8000;
}
.myclass1{
    color: #5882FA;
}
```

在style.less中使用@import “/myfile.less”导入myfile.less的内容

```less
@import "/myfile.less";
.myclass2
{
color: #FF0000;
}
```

最后通过编译后得到结果如下：

```css
.myclass {
  color: #FF8000;
}
.myclass1 {
  color: #5882FA;
}
.myclass2 {
  color: #FF0000;
}
```

**Less变量**

Less定义变量的语法为 ：@变量名称:变量值

1、变量插值（就是将表达式中的变量替换为变量值的过程）

变量插值是评估包含一个或多个变量的表达式或文字的过程，产生其中变量用其对应值替换的输出。

便改良使用的地方有：选择器名称，属性名称，URL和@import语句。 

（1）变量用于less选择器

选择器可以引用任何变量，它是在编译时构建的。 变量名称必须放在用**@**符号前缀的花括号（**{}**）内。 

```less
@selector:h2;
@{selector} {
    background:#2ECCFA;
}
```

（2）变量用于less URL

变量可以用于保存URL，如下所示

```less
@images:"http://www.w3school.cn";
.container{
    background:url("@{images}/less/images/less_variables/birds.jpg");
    /*这里编译后为：background:url("http://www.w3school.cn/less/images/less_variables/birds.jpg")*/
}
```

（3）变量用于less import语句

import语句可以具有保存路径的变量。当你引用一个普通的父目录时，这是非常有用的。

 ```less
@basePath:"//www.w3school.cn/less";/*这里的变量用于保存一个基础路径*/
@import "@{basePath}/external1.less";/*在@import 与语句中引用basePath变量*/
.container{
    background:red;
}
 ```

（4）变量可以由属性引用

变量可以由属性引用。 使用由属性引用的变量的例子

```less
@my-property:color;
.container{
    background-@{my-property}:#81F7D8;/*经过编译形成的结果为：background-color: #81F7D8;*/
}
```

2、变量名称

可以定义变量名称由一个值组成的变量，下面的就是使用变量保存另外一个变量

```less
.container{
    @col:blue;
    @color:"col";
    background-color:@@color;/*这里的color就@color就保存了另外一个变量的名称，所以通过@color取出名称col，然后又加一个@从col中取值*/
}
```

3、延迟加载

在延迟加载中，即使它们尚未声明，也可以使用变量

```less
.container{
    font-size:@size;/*虽然@size在后面声明的，但是这里依然可以使用，最终为font-size:14px;*/
    color:red;
}
@size:@b;
@b:14px;
```

4、默认值

默认变量只有在尚未设置时才能设置变量。此功能不是必需的，因为变量可以很容易地通过定义它们后覆盖。 后面定义的变量会覆盖前面申明的相同名称的变量。

```less
@import "//www.w3cschool.cn/less/lib.less"; //第一次声明变量 @color，
@color: green; // 在这里申明了一个和引入的.less文件相同的变量，这里会覆盖前面的
p{
 color : @color;
}
```

**Less扩展 :extend**

Extend是一个less伪类，他将**所放置它的选择器**与**匹配引用的选择器**进行合并，通过使用:extend选择器在一个选择器中扩展其它选择器样式，示例如下：

```less
.container{// .container 所放置它的选择器
    &:extend(.style);//.style 匹配引用的选择器
    font-style:italic;
}
.style{
    background:green;
}
```

经过编译后转换为css文件为

```css
.container{
    font-style:italic;
}
.container,.style{
    background:green;
}
```

通常Less扩展语法有如下一些：扩展附加到选择器、扩展内部规则集、扩展嵌套选择器、完全匹配与扩展、nth表达式、扩展"all"、选择器插值扩展、@media中的范围/扩展、重复检测。

（1）扩展连接到一个选择器

它看起来类似于具有选择器作为参数的伪类。 当规则集具有许多选择器时，则关键字扩展可以应用于任何选择器。 下面是定义代码中extend的格式

- 在选择器之后扩展。  [例如：pre:hover**:extend(div pre)**]
- 允许选择器和扩展之间的空格[例如：pre:hover :extend(div pre)]
- 允许多个扩展。[例如：pre:hover:extend(div pre):extend(.bucket tr)或者pre:hover:extend(div pre,.bucket tr)]
- 扩展必须在选择器的末尾定义。**pre:hover:extend(div pre) .nth-child(odd)类型不允许**

一个扩展连接到选择器的例子：

```less
.style,container:extend(.img){
    background:red;
}
.img{
    font-size:20px;
}
```

上面代码经过编译以后得到如下结果（对.containe进行了扩展）

```css
.style,
.container {
  background: red;
}
.img,
.container {/*这是对.container的扩展后的结果*/
  font-size: 20px;
}
```

（2）Less扩展内部规则集&:extend

&:extend(selector)语法可以放在规则集的正文中。它是放置扩展到规则集的每个选择器的快捷方式。

```less
.container,.style{
    &:extend(.img);
}
.img{
    font-style:italic;
}
```

扩展后编译的结果为

```css
.img,
.container,
.style {
  font-style: italic;/*.container和.style都扩展了.img的规则集*/
}
```

（3）Less完全匹配与扩展

默认情况下， extend 查找选择器之间的完全匹配。 对于具有相同含义的两个第n个表达式，扩展无关紧要，但它只寻找与为选择器匹配定义的相同的顺序形式。 

```less
.style h3,
h3 .style{
  color: #BF70A5;
  font-style: italic;
}
.img:extend(.style h3){/*如果这里再加一个扩展.img:extend(.tyle h3):extend(h3 .style) 那么编译后.img会出现两次，并且h3 .style需要与前面的选择器完全匹配，如果前面的选择器中间没有空格，也就是h3.style，那么扩展操作里面也不应该有空格，不然会找不到扩展的选择器*/
}
```

编译后的结果为

```
.style h3,
h3 .style,
.img {
  color: #BF70A5;
  font-style: italic;
}
```

（4）Less的nth表达式

nth表达式的形式在扩展中很重要，否则它将选择器视为不同。 nth表达式1n + 2和n + 2是等效的，但扩展将该表达式视为不同。 

```less
:nth-child(n+2){
    color:red;
}
.child:extend(:nth-child(n+2)){};/*如果这里使用:nth-child(1n+2)，编译的时候会报:nth-child(1n+2)没有找到*/
```

在属性选择器中，引用类型不重要，你可以在下面示例中看到他

```less
[title=tutorialspoint]{
    font-size:12px;
}
[title='tutorialspoint'] {
 font-style: italic;
}
[title="tutorialspoint"] {
  font-style: italic;
}
.style:extend([title=tutorialspoint]) {}
.container:extend([title='tutorialspoint']) {}
.img:extend([title="tutorialspoint"]) {}
```

编译后的结果为

```css
[title=tutorialspoint],
.style,
.container,
.img {
  font-size: 12px;
}
[title='tutorialspoint'],
.style,
.container,
.img {
  font-style: italic;
}
[title="tutorialspoint"],
.style,
.container,
.img {
  font-style: italic;
}
```

（5）LESS 扩展“all”

当最后在扩展参数中标识关键字 all 时，LESS将该选择器作为另一个选择器的一部分。 匹配的选择器部分将被extend替换，形成一个新的选择器。 （**理解起来有点困难，直接上代码**）

```less
a{
    background-color: #fff;
    &:extend(.b all);{/*当在less的继承关系中，需要伪类的时候 可以使用& 表示自己，这里就是表示a，否则默认是表示子代；有 & 时解析的是同一个元素或此元素的伪类，没有 & 解析是后代元素*/
    border-bottom: 2px;
}
.b{
    font-weight: 700;
    color: yellow;
}
.b:hover{
    font-size: 2em;
}
```

编译后的代码为：

```css
a{
    background-color:#fff;
    border-bottom:2px;
}
/*扩展将.b的所有扩展到a中*/
.b,a{
    font-weight: 700;
    color: yellow;
}
a:hover,.b:hover{
    font-size: 2em;
}
```

（6）LESS 选择器插值扩展

@ {variable} 符号用作变量名，id和类名的一部分。 扩展不具有使选择器与变量匹配的能力。 扩展可以连接到内插选择器。 

```less
.style {
  color: #BF70A5;
  font-style: italic;
}
@{variable}:extend(.style) {}
@variable: .selector;
```

编译后的结果为：

```css
.style,
.selector {
  color: #BF70A5;
  font-style: italic;
}
```

LESS 重复检测：它不能检测选择器的重复。



**LESS混合**（相当于编程语言中的函数）

语法为   .函数名(){规则列表} 或者 #函数名(){规则列表}

混合类似于编程语言中的函数。 Mixins是一组CSS属性，允许您将一个类的属性用于另一个类，并且包含类名作为其属性。 在LESS中，可以使用类或[id选择器](https://www.w3cschool.cn/eyv2f3/68m11qba.html)以与CSS样式相同的方式声明mixin。 它可以存储多个值，并且可以在必要时在代码中重复使用。 

下面说明LESS mixin的简单使用

（1）不输出mixin

可以创建一个mixin，它可以通过简单地放置括号后在输出中消失。 如下所示

```less
.a(){
    padding-left:100px;
}
.container{
    border:1px solid red;
    .a();/*这里直接放置.a也能够达到效果（reason?）*/
}
```

变异的结果为

```css
.container{
    border:1px solid red;
    padding-left:100px;
}
```

（2）Less Mixins中的选择器

minxins不仅可以包含属性，还可以包含选择器

```less
#mixin(){
    &:hover{
        background:red;
    }
}
a{
    #mixin();
}
```

编译后的结果为

```css
a:hover {
  background: red;
}
```

（3）Less Mixin命名空间

命名空间用于在通用名称下对mixin进行分组。 使用命名空间可以避免名称冲突，并从外部封装mixin组。示例如下：

```less
#outer(){
    background:yellow;
    .inner{
        color:red;
    }
}
p{
    #outer > .inner;
}
```

编译后的结果为

```css
p {color: red;}
/*当然如果上面的p里面如果不是获取.inner，直接写#outer的话，结果将会是下面的样子*/
p{background:yellow}
p .inner{color:red}
```

（4）LESS保护的命名空间

当guard应用于命名空间时，只有在guard条件返回true时才使用由命名空间定义的mixin。 命名空间防护类似于mixins上的guard。

 ```less
@import "./lib.less";/*lib.less中的内容是拥有一个变量@color:blue*/
#namespace when (@color = blue){//当这里满足条件的时候，才使用命名空间#namespace中定义的mixin
    .mixin(){
        color:red;
    }
}
p{
    #namespace .mixin();
}
 ```

编译后的结果为：

```css
p{color:red;}
```

（5）LESS !important 关键字

**！important** 关键字用于覆盖特定属性。 当它在mixin调用之后放置时，它会将所有继承的属性标记为！important 。 

```less
.mixin(){
  color: #900;
  border:1px solid red;
}
.para1{
  .mixin();
}
.para2{
  .mixin() !important;
}
```

编译后的结果为：

```css
.para1{
  color:#900;18581203068
  border:1px solid red;
}
.para2{
  color:#900 !important;
  border:1px solid red !important;
}
```

**Less混合参数**

参数可以使用*逗号*或*分号*分隔。 使用逗号符号，可以将其解释为mixin参数分隔符或css列表分隔符。 如果在mixin中使用分号，那么它将用分号分隔参数，CSS列表将包含所有逗号。两种使用方式如下：

- 如果你有两个参数，那么它将包含使用逗号分隔的列表。例如：.class1(1,2,3;somtext,other ting)
- 如果有三个参数，并且只包含数字，例如：.class1(1,2,3)
- 您可以使用带有逗号分隔列表的虚拟分号，例如 **.class1(1，2，3;)**。 
- 有逗号分隔的默认值。 例如 **.class1(@color：gray，green;)** 