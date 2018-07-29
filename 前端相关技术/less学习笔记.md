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

（1）Mixins具有多个参数

参数可以使用*逗号*或*分号*分隔。 使用逗号符号，可以将其解释为mixin参数分隔符或css列表分隔符。 如果在mixin中使用分号，那么它将用分号分隔参数，CSS列表将包含所有逗号。两种使用方式如下：

- 如果你有两个参数，那么它们将包含逗号分隔的列表。 例如 **.class1(1，2，3; sometext，other thing)**。 
- 如果有三个参数，并且只包含数字，例如 **.class1(1，2，3)**。 
- 您可以使用带有逗号分隔列表的虚拟分号，例如 **.class1(1，2，3;)**。 
- 有逗号分隔的默认值。 例如 **.class1(@color：gray，green;)** 

用法如下：

```less
.mixin(@color){
  color:@color;
}
.mixin(@color;@padding:2){
  color:@color;
  padding: @padding;
}
.container{
  .mixin(#fff);
}
```

编译后的结果为：

```css
.container {
  color: #fff;
  padding: 2;
}
```

（2）通过命名参数提供值

Mixins通过使用它们的名称提供参数值而不是位置。 参数没有放置值的任何顺序，它们可以通过名称引用。 命名参数的结果更容易阅读，并提供清晰的代码。 如下所示：

```less
.mixin(@color:black;@fontSize:10px){
    color:@color;
    font-size:@fontSize;
}
.sx1{
    .mixin(@font-size:20px;@color:#F59D0);
}
.sx2{
    .mixin(#F79F81; @fontSize: 20px);
}
```

（3）@argument变量传递了所有的参数。 当不想使用单个参数时， @arguments 变量很有用。 如下：

```less
.box-shadow(@x: 0; @y: 0; @height: 3px; @width: 3px) {
  -webkit-box-shadow: @arguments;/*@argument变量包括了所有的参数在里面*/
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.container {
  .box-shadow(2px; 2px);
}
```

编译后的结果为：

```css
.container {
  -webkit-box-shadow: 2px 2px 3px 3px;/*可以看到编译后的结果@argument变量被所有的参数给替换掉了*/
  -moz-box-shadow: 2px 2px 3px 3px;
  box-shadow: 2px 2px 3px 3px;
}
```

（4）Less高级参数和@rest变量

Mixin通过使用 **...** 提供可变数量的参数。 可以通过在变量名称后面放置 **...** 为变量赋值参数。使用的一些格式如下：

```less

```

代码中使用@rest变量

```less
.mixin(@x; @rest...) {
   // after the variable @a, the @rest is bound to arguments
   // @arguments is bound to all arguments
}
```

**Less Mixins函数**

（1）Less Mixin范围（作用域描述）

由变量和混合组成的混合可以在调用者的作用域中使用，并且是可见的。 但是有一个例外，如果调用者包含具有相同名称的变量，那么该变量不会复制到调用者的作用域中。 只有调用者范围内的变量被保护，并且继承的变量将被覆盖。 

（2）Less Mixin和返回值

mixin类似于函数，在mixin中定义的变量将作为它的返回值，示例如下：

```less
.padding(@x;@y){
    @padding:((@x+@y)/2);/*@padding是在mixin中定义的变量，将会作为返回值被返回*/
}
.container{
    .padding(80px,120px);/*先调用mixin，相当于对@padding变量赋值了*/
    padding-left:@padding;/*这里可以使用@padding变量了，他已经有值了*/
}
```

编译后的结果为：

```css
.container {
  padding-left: 100px;
}
```

（3）Less mixin定义在另一个mixin中的时候，它也可以用作返回值，示例如下：

```less
.outerMixin(@value) {/*外层mixin*/
  .nestedMixin() {/*里面的mixin，这个将会被作为返回值*/
    font-size: @value;
  }
}
.container{
  .outerMixin(30);
  .nestedMixin();/*这里必须要调用才能够取到font-size，前面一步相当于进行的.nestedMixin初始化赋值*/
}
```

编译后的结果如下:

```css
.container {
  font-size: 30;
}
```

**LESS将规则集传递给Mixins**

**分离的规则集**包含一个普通的规则集，如属性，嵌套规则集，变量声明，mixins等。**它存储在一个变量中**，并包含到其他结构中，其中规则集的所有属性都将被复制到该结构。

范围：（作用域）

分离的规则集中的所有变量和混合宏在被调用或定义的地方都可用，否则调用者和定义范围都可用。 当两个范围包含相同的mixin或variable时，声明范围获取优先级。 分离的规则集体在声明范围中定义。 在将分离的规则集从一个变量复制到另一个变量后，它不会更改其范围。 

所有的范围类型如下：

（1）定义和调用范围的可见性

变量和mixin在分离的规则集中定义。示例如下：

```
@detached-rulelist:{/*一个变量用于存储分离的规则集（detached分离的）*/
    background-color: @caller-variable;
    .caller-mixin();
}
.cont {
  @detached-ruleset();
  @caller-variable: #AA86EE;
  .caller-mixin() {
    font-style:italic;
  }
}
```

编译后的结果为：

```css
.cont {
  background-color: #AA86EE;
  font-style: italic;
}
```
（2）LESS 引用将不会修改分离的规则集范围

通过仅给出引用，规则集不访问任何新的范围。（晦涩难懂查看：https://www.w3cschool.cn/less/t_modify_detached_ruleset_scope.html）

（3）LESS 解锁将修改分离Ruleset Scope

分离的规则集可以通过导入到范围中来访问。（晦涩难懂查看：https://www.w3cschool.cn/less/unlocking_will_modify_detached_ruleset_scope.html）



**LESS导入指令**

**@import** 伪指令用于在代码中导入文件。 它将LESS代码分布在不同的文件上，并允许轻松地维护代码的结构。可以将 *@import* 语句放在代码中的任何位置。 

导入指令的导入取决不同的文件扩展名

- 如果您使用 .css 扩展名，那么它将被视为CSS和 @import 语句保持不变。 
- 如果它包含任何其他扩展名，那么它将被视为LESS并将被导入。 
- 如果没有较少的扩展，那么它将被附加并包含为导入的较少文件。 

@import指令支持导入选项，也就是在导入的时候控制导入行为，下面几个就是在import语句中实现的导入伪指令，基本的使用语法为：

```less
@import(选项) url
```

- **@import(reference)**，用于导入外部文件，但不会将导入的样式添加到编译的CSS文件中。 这是在版本1.5.0 中发布的。 
- **@import(inline)**会将CSS复制到输出CSS文件中，而不进行处理。 当CSS文件不是LESS兼容时，这是有用的。 虽然LESS支持大多数标准CSS，但在某些地方不支持注释，并且不修改CSS，它不会支持所有已知的CSS黑客。 即使 **@import(inline)**不会处理CSS，它将确保所有的CSS将在一个文件中。 这是在版本1.5.0 中发布的。 
- **@import(less)**会将文件导入为LESS文件，而不管文件扩展名是什么。 这是在版本1.4.0 中发布的。
- **@import(css)**会将文件导入为常规CSS，而不管文件扩展名。 这是在版本1.4.0 中发布的。
- **@import(css)**会将文件导入为常规CSS，而不管文件扩展名。 这是在版本1.4.0 中发布的。
- **@import(once)**确保文件只导入一次，并且对该文件将忽略任何以下import语句。 这是 **@import**statments的默认行为。 这是在版本1.4.0 中发布的。 
- 通过 **@import(multiple)**，您可以导入具有相同名称的多个文件。 这与一次完全相反。 这是在版本1.4.0 中发布的。 
- **@import (optional)**可选允许您在文件不存在时导入文件。 如果要导入的文件不存在并且未使用**可选**关键字，则LESS会抛出 FileError 错误并停止编译。 这是在版本2.3.0 中发布的。 （防止错误发生导致不再编译）



**LESS Mixin Guards**

想在表达式上匹配简单的值或参数数量，那么你可以使用Guards。 它与mixin声明相关联，并包括附加到mixin的条件。 每个mixin将有一个或多个由逗号分隔的防护，并且guard必须括在括号中。 LESS使用Guards的mixins而不是if / else语句，并执行计算以指定匹配的mixin。 

不同类型的mixins guard以及描述 :

（1）LESS Guard比较运算符

LESS包含五个保护比较运算符：<，>，<=，> =和=。 您可以使用比较运算符（=）来比较数字，字符串，标识符等，而剩余的运算符只能与数字一起使用。 来个示例说明一下：

```less
/*下面定义了三种情况，满足情况会执行相应的mixin*/
.mixin (@a) when (@a = 20px){
color:red;
}
.mixin (@a) when (@a < 20px){
color:blue;
}
.mixin (@a) {
  font-size: @a;
}
.container { .mixin(20px) }/*传入参数20px，那么将会匹配返回20px的mixin*/
```

编译后的结果为：

```css
.container {
  color: red;
  font-size: 20px;
}
```

（2）Less Guard逻辑运算符

可以使用关键字来解决Guard逻辑运算符。 您可以使用和关键字组合使用保护条件，并使用not关键字取消条件。 如下：

```less
.mixin (@a) when (@a > 50%) and (@a > 5px){
  font-size: 14px;
}
.mixin (@a) when not (@a < 50%) and not (@a < 5px){
  font-size: 20px;
}
.mixin (@a) {
  color: @a;
}
.class1 { .mixin(#FF0000) }
.class2 { .mixin(#555) }
```

（3）Less提供类型检查函数

less类型检查函数用于对参数类型的检查，检查是否符合条件，有如下的检查函数：

- iscolor、isnumber、isstring、iskeyword、isurl、ispixel、ispercentage、isem、isunit

**Less CSS Guards**
Guard用于匹配表达式上的简单值或参数个数。 它应用于CSS选择器。 它是用于声明mixin并立即调用它的语法。 要成功地引出 if 类型语句; 将此功能与功能＆结合使用，您可以将多个guards分组。

```less
@usedScope: global;
.mixin() {
  @usedScope: mixin;
  .cont when (@usedScope=global) {
    background-color: red;
    color: black;
  }
  .style when (@usedScope=mixin) {
    background-color: blue;
    color: white;
  }
  @usedScope: mixin;
}
.mixin();
```

**Less 循环**

Loops语句允许我们多次执行一个语句或一组语句。 当递归mixin与 **Guard表达式**和**模式匹配**组合时，可以创建各种迭代/循环结构。 下面是一个简单的例子：

```less
.cont(@count) when(@count>0){/*将会循环7次*/
    .cont((@count - 1));/*这里的@count - 1必须中间要有空格，不然less编译器会把它解释为一个@count-1变量，因此会报找不到变量申明错误，很不科学？？？？？头大*/
    width:(25px*@count);
}
div{
    .cont(7);
}
```

编译后的结果为：

```css
div {
  width: 25px;width: 50px;width: 75px; width: 100px;width: 125px;width: 150px;width: 175px;
}
```

**Less合并**

它是LESS的一个特性，它允许使用单个属性从多个属性中为逗号或空格分隔列表添加值。 它可以用于背景和变换属性。如下所示：

（1）less合并逗号：comma（它添加属性值到最后）

```less
.myfunc() {
  box-shadow+: 5px 5px 5px grey;
}
.class {
  .myfunc();
  box-shadow+: 0 0 5px #f78181;
}
```

 编译后的结果为：

```css
.class {
  box-shadow: 5px 5px 5px grey, 0 0 5px #f78181;
}
```

（2）less合并空间：space（这是merge的另一个特性，它添加了属性值和空格）

```less
.mixin() {
  transform+_: scale(1);
}
.class {
  .mixin();
  transform+_: rotate(2deg);
}
/*合并使用 + 或 + _ 标志来避开每个连接上意外的连接。 transform 属性修改CSS格式化模型的空间，并可用于旋转，缩放，移动等元素。*/
```

编译后的结果为：

```css
.class {
  transform: scale(1) rotate(2deg);
}
```



**最后的一部分就是LESS函数了**

Less提供了很多的函数供使用，大致分为了

- 字符串函数：

  （1）escapse（逃逸）：它通过对特殊字符使用URL编码来对字符串或信息进行编码。 您无法编码一些字符，例如**，**， **/** ，**？** ，**@** ，**＆amp;** ， **+** ，**〜**，**！** ， **$** ，**\'**和您可以编码的一些字符，例如 **\\** ，**#**， **> ^** ，**(**，**)**， **{**，**}** ，**:** >，**＆gt;** ，**，] ， [和 = 。** 

  （2）e ：它是一个字符串函数，它使用string作为参数，并返回不带引号的信息。它是一个CSS转义，它使用*〜“一些内容"*转义的值和数字作为参数。 

  （3）% format ：此函数格式化一个字符串。 它可以写成以下格式:  %(string，arguments ...)  

  （4）replace：它用于替换字符串中的文本。 它使用一些参数： 

  - **string** :它搜索字符串并替换。
  - **pattern** :它搜索正则表达式模式。
  - **replacement** :它替换与模式匹配的字符串。
  - **flags** :这些是可选的正则表达式标志。

- 列表函数：**Length** 、Extract

- 数学函数：**ceil** 、**floor** 、**percentage** 、**round** 、**sqrt** 、**abs** 、**sin** 、**asin**  、**cos**  、**acos**  、**tan**  、**atan** 、**pi**  、 **pow**  、**mod**  、**min** 、**max** 

- 类型函数：**isnumber**  、**isstring** 、**iscolor**  、**iskeyword** 、**isurl**  、**ispixel** 、**isem**  、**ispercentage** 、**isunit**  、**isruleset** 

- 颜色定义函数：**rgb**  、**rgba**  、**argb**  、**hsl**  、**hsla**  、**hsv**  、**hsva** 

- 颜色通道函数：**hue**  、saturation 、**lightness** 、**hsvhue**  、**hsvsaturation**  、**hsvvalue**  、**red** 、**green** 、**blue** 、**alpha** 、**luma**  、**luminance** 

- 颜色操作：**saturate** 、**desaturate**  、**lighten** 、 **darken**、 **fadein、**  **fadeout、**  **fade、** **spin** 、**mix** 、 **tint** 、**shade** 、**greyscale**、 **contrast** 

- 颜色混合函数：**multiply** 、**screen**、 **overlay、** **softlight、** **hardlight** 、**difference**、 **exclusion** 、**average**、  **negation** 

- 其它函数：**color** 、[**image - size** ](https://www.w3cschool.cn/less/image_size.html)、 [**image - width** ](https://www.w3cschool.cn/less/image_width.html) 、**image-height** 、**convert****data - uri** 、 **default** **unit**  [**get - unit** ](https://www.w3cschool.cn/less/get_unit.html) 、[**svg - gradient**](https://www.w3cschool.cn/less/svg_gradient.html)