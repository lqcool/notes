### POSITION定位

####绝对定位

https://www.jianshu.com/p/38e0040aa8ca

绝对定位就相当于你把定位的元素从文档中抠了出来，那么这个元素原来的位置就空了出来，可以由别的元素来占据。 

如果你把一个元素设置为absolute，其他的属性（top，left，right和bottom）不进行设置，那么它只会被抠出来，其他元素占据它的位置，除此之外，没有其他任何变化。**就是说，当一个元素被设置为absolute后，它的默认的top，left的值并不是0，而是被抠出来之前（被设置为absolute之前）的值，该在哪个位置，还是哪个位置。**  （https://blog.csdn.net/u011292870/article/details/46664993）

（1）绝对定位脱离了文档流。

（2）决定定位方式相对于谁分为两种情况：

第一：父级（包括直接父级和间接父级）元素中没有定义position属性（即默认属性static），那么该元素会参照页面，以页面（body）为基准进行定位，top, left等属性会参照页面。 

第二：父级元素定义了position属性(relative或absolute)，则会参照父级元素。 所以可以通过设置父元素的position属性，来控制子元素的绝对定位的位置。

（3）absolute的包裹性

（4）absolute的跟随性

（5）absolute的无依赖性 

absolute的无依赖性，就是不依赖relative的限制来进行定位 首先先演示下父类元素设置relative下的定位，首先要给父类元素设置relative，子元素使用absolute 配合left，top进行定位，这里的left和top根据父类元素进行定位 

#### 相对定位

https://blog.csdn.net/u011292870/article/details/46664993

相对定位是元素框偏移某个距离。元素仍保持其未定位前的形状，它原本所占的空间仍保留。 生成相对定位的元素，相对于其正常位置进行定位。 

如果元素的position属性值为relative，那么该元素相对于其正常位置（即position:static）定位。**如果一个元素被设置为relative，那么它默认的top值和left值时0。**这也是与absolute不同的地方。 

#### fixed 

生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 

#### static

默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。 

#### inherit

规定应该从父元素继承 position 属性的值。 



#### z-index

z-index属性是可以控制定位元素在垂直于屏幕也就是轴方向上面的叠层顺序，值大的元素发生重叠时会在值小的元素上面。

注意点：

- z-index属性只作用在被定位了的元素上。所以如果你在一个没被定位的元素上使用z-index的话，是不会有效果的。换句话说：z-index属性只能在position属性值为relative或者absolute或者fixed的元素上有效。

- 同一个父元素下的元素的层叠效果会受父元素的z-index影响,如果父元素的z-index值很小,那么子元素的z-index值很大也不起作用。

失效情况：

- 父标签 position属性为relative；
- 问题标签无position属性（不包括static）；
- 问题标签含有浮动(float)属性。

解决方法：

- 将父标签的position:relative改为position:absolute；
- 浮动元素添加position属性（relative、absolute等）
- 去除浮动
