## Grid学习笔记

Grid-layout是flex的补充，grid擅长二维布局，flex擅长一维布局。

### 核心概念

- 容器contianer：采用网格布局的区域，称为容器。

- 项目item：容器内部，采用网格布局的字元素就称之为项目。

- 行row &列 coloumn：容器中纵向称之为列，横行称之为行

- 单元格cell：行列交汇的地方称之为单元格cell。通常 n行m列，交汇产生n*m个单元格。

- 网格线line：划分出网格的线就叫网格线，有垂直和水平网格线。通常要产生n行需要n+1条网格线。（就和小时候的“杀国”游戏中的划线一样，再通俗一点就是小时候的写汉字的格子本）

  |      |      |
  | ---- | ---- |
  |      |      |

### 基础属性

#### 容器属性

为了让一个区域呈现Grid布局，那么我们需要设置一些必要的属性

##### display属性

`display: grid`指定一个容器采用网格布局，此时容器元素呈现`块级元素`，要让grid布局的容器呈现`行内元素`需要设置成`display: inline-grid`。特别的，设置了grid布局后，容器中的项目上的 `float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都会失效。

```css
.continaer {
	display: grid;
}
```

##### grid-template-columns & grid-template-rows 属性

确定好按照grid布局后，我们需要开始进行行列划分了。使用grid-template-columns & grid-template-rows 这两个容器属性，进行容器的行列划分，grid-template-columns属性定义每一列的列宽，同理另一个属性就是定义每一行的行高了。可以这样设置

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```

上面的代码指定了一个3*3的表格，列宽和行高都是100px，当然也可以设置成百分比数字，like this，其实一样的效果。

```css
.container {
  display: grid;
  
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

两行代码写出传统的12网格布局

```css
.container{
	display: grid;
  grid-template-columns: repeat(12, 1fr)
}
```

- repeat函数，对于网格特别多的情况下，我们手写每个网格的宽高比较费劲，因此repeat函数能够让我快速的生成表格，使用方式如下

`repeat()`，接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。当然，第二个参数是一种模式也是可以的，也就是说，重复该模式 n次，例如 `repeat(4, 100px 20px 30px)`

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
```

- auto-fill关键字，特别的，有一种情况，如果容器大小不固定，但是每个项目的大小是固定的，为了让一行尽可能将能够容纳更多的项目，我们可以使用auto-fill关键字（有点像flex布局的默认行为，尽可能在一行容纳，容纳不下才换行）。

```css
.container{
	display: grid;
  grid-template-columns: repeat(auto-fill, 100px)
}
```

- fr关键字，grid布局中，为了表示项目之间的比例关系，提供了fr关键字（fraction，片段的意思），用来描述grid布局中项目之间的比例关系，有点像flex布局中的flex-grow属性。比如，如果两个项目的宽度分别是 1fr 和 2fr，那么后者将是前者的2倍。使用方式如下。

```css
.container{
  display:grid;
  grid-template-columns: 1fr 1fr
}
```

- minmax函数，函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
.container{
	display: grid;
  grid-template-columns: 1fr 1fr minmax(100px, 1fr)
}
```

上面的第三列项目，宽度在100px到1fr之间（有疑问，怎么确认1fr有多少呢？自适应吗，如果本身容器的宽度就小于100px会这样？）

- auto关键字：grid-template-columns: 100px auto 100px，这样设置，第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了`min-width`，且这个值大于最大宽度。

- 网格线的名字：grid布局中，允许我们对网格线进行命名，以便后续的引用，命名方式为`[网格线的名字]`，如果一个网格线有多个名字，直接使用`[名字1  名字2]`。前面已经介绍过，如果有n行或者n列，那会产生n+1条网格线，针对这些网格线我们可以进行命名。

```css
grid-template-columns: [line1] 1fr [line2] 2fr [line3] 200px [line4]
```

#### grid-column-gap & grid-row-gap & grid-gap

`grid-row-gap`属性设置行与行的间隔（行间距），`grid-column-gap`属性设置列与列的间隔（列间距）。`grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式，语法如下。

#### grid-template-area

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```

上面代码先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下。

> ```css
> grid-template-areas: 'a a a'
>                      'b b b'
>                      'c c c';
> ```

如果某些区域不需要利用，则使用"点"（`.`）表示。

```css
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
```

#### grid-auto-flow

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，当然如果要改变放置顺序，可以设置成column，则会先列后行这样放置。

```css
grid-auto-flow: column
```

`grid-auto-flow`属性除了设置成`row`和`column`，还可以设成`row dense`和`column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

如果设置成grid-auto-flow:row dense，则表示先行后列的排布，但是尽量将剩余空间先填满（具体可以参考https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html）的示例图。

#### justify-items & align-items & place-items

这些属性理解的时候可以结合items来理解，items也就是项目，那就是设置每个项目内部的对齐方式。

`justify-items`属性设置单元格内容的水平位置（左中右），`align-items`属性设置单元格内容的垂直位置（上中下）。

```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

取值的解释

- start： 对齐单元格起始边缘
- end：对齐单元格结束边缘
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

`place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。如果省略第二个值，则浏览器认为与第一个值相等。

```css
place-items: start end;
```

#### justify-content & align-content & place-content

这几个属性可以结合content进行记忆，指向容器，也就是容器中整个grid区域在容器中的位置。

`justify-content`属性是整个内容区域在容器里面的水平位置（左中右），`align-content`属性是整个内容区域的垂直位置（上中下）。

```css
container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```

- start：对齐容器的起始边框。
- end： 对齐容器的结束边框。
- center：容器内部居中

- stretch - 项目大小没有指定时，拉伸占据整个网格容器。
- space-around：每个项目两边的距离相等，所以项目与项目之间的间隔会大点 
- space-between：项目与项目之间的距离相等，与容器没有距离。
- space-evenly：项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。如果省略第二个值，浏览器就会假定第二个值等于第一个值。

#### grid-auto-clumns & grid-auto-rows

参考网上教程理解，这里没太懂。。。

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。

`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

#### grid-template & grid

`grid-template`属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式。

`grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。

### 项目属性

#### grid-column-start & grid-column-end & grid-row-start & grid-row-end

这几个属性是指定项目的边框在那根网格线（可以这样理解，类似设置项目的大小，占据多少宽和高）

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

- `grid-column-start`属性：左边框所在的垂直网格线
- `grid-column-end`属性：右边框所在的垂直网格线
- `grid-row-start`属性：上边框所在的水平网格线
- `grid-row-end`属性：下边框所在的水平网格线

```css
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
```

item-1中的内容指的是，1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。



这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

```css
.item-1 {
  grid-column-start: span 2;
}
```

这里就是表明，1号项目的左边框距离右边框跨越2个网格。

使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。

#### grid-column & grid-row

`grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

```css
.item {
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
}
```

```css
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
```

这两个属性之中，也可以使用`span`关键字，表示跨越多少个网格。

斜杠以及后面的部分可以省略，默认跨越一个网格。

#### grid-area

`grid-area`属性指定项目放在哪一个区域。有点类似指定顺序（和flex中的又不一样）

`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

#### justify-self & align-self & place-self

和justify-items& align-items功能有重叠

`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。



取值范围

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。