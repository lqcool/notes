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



