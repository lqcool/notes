### Flex布局笔记
本文参考：[参考链接](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) 
参考demo：[DEMO](http://static.vgee.cn/static/index.html)
#### Flex布局简介
传统布局是基于盒装模型，依赖display属性+position属性+float属性。传统布局对于有的布局不好实现，例如垂直居中。2009年，W3C 提出了一种新的方案----Flex 布局。可以简便、完整、响应式地实现各种页面布局。  

#### Flex布局特点
- 任何一个容器都可以指定为 Flex 布局。.box{display: flex}
- 行内元素也可以使用 Flex 布局。.box{display: inline-flex}
- Webkit 内核的浏览器，必须加上-webkit前缀。.box{display: -webkit-flex; /* Safari */display:flex;}
- 设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

#### Flex布局中的概念
- Flex容器(Flex Container)：采用 Flex 布局的元素。
- Flex项目(Flex Item)：采用 Flex 布局的元素的所有子元素自动成为容器成员----“项目”

#### 应用于容器的属性
- flex-direction：flex-direction属性决定主轴的方向（即项目的排列方向）。该属性可能有4个值<br>

（1）row（默认值）：主轴为水平方向，起点在左端。<br>
（2）row-reverse：主轴为水平方向，起点在右端。<br>
（3）column：主轴为垂直方向，起点在上沿。<br>
（4）column-reverse：主轴为垂直方向，起点在下沿。<br>

- flex-wrap：该属性定义如果一条轴线排列不下项目，如何换行。该属性可能取3个值<br>

（1）nowrap（默认）：不换行。<br>
（2）wrap：换行，第一行在上方。<br>
（3）wrap-reverse：还行过，第一行在下方。<br>

- flex-flow：该属性是flex-direction属性和flex-wrap属性的简写形式。默认值 row nowrap。<br>
- justify-content：该属性定义了项目在主轴上面的对齐方式。可能取5个值<br>

（1）flex-start（默认值）：左对齐。<br>
（2）flex-end：右对齐。<br>
（3）center：居中对齐。<br>
（4）space-between：两端对齐，项目之间的距离是相同的。（项目间隔距离相等）<br>
（5）space-around：每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍。<br>

- align-item：属性定义项目在交叉轴上如何对齐。它可能取5个值<br>

（1）flex-start：交叉轴的起点对齐。<br>
（2）flex-end：交叉轴的终点对齐。<br>
（3）center：交叉轴的中点对齐。<br>
（4）baseline: 项目的第一行文字的基线对齐。<br>
（5）stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。<br>

- aligin-content：定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。该属性可能取6个值<br>

（1）flex-start：与交叉轴的起点对齐。<br>
（2）flex-end：与交叉轴的终点对齐。<br>
（3）center：与交叉轴的中点对齐。<br>
（4）space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。<br>
（5）space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。<br>
（6）stretch（默认值）：轴线占满整个交叉轴。<br>

#### 应用于项目的属性

- order：定义项目的排列顺序。数值越小，排列越靠前，默认为0。

  ```css
  .item {order:2}
  ```

- flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

  ```css
  . item {flex-grow:2}
  ```

  如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

- flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

  ```css
  .item{flex-shrink:1}
  ```

  如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

- flex-basis：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

  ```css
  .item {flex-basis: <length> | auto; /* default auto */}
  ```

  它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

  如果项目的width属性和flex-basis属性同时存在，flex-basis的优先级较高，如果flex-basis和width其中有一个是auto，那么另外一个非auto的属性优先级会更高。

- flex：属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

  ```css
  .item { flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]}
  ```

  该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
  建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。 

- align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

  ```css
  .item { align-self: auto | flex-start | flex-end | center | baseline | stretch;}
  ```

(2018-3-8 更新)
