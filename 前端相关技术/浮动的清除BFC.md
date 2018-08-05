### 浮动的清除和BFC

**元素设置浮动，可以左右移动，直到遇到另一个浮动框或者遇到它外边缘的包含框（父元素）**。浮动框不属于文档流中的普通流，元素浮动之后，不会影响块元素的布局，只会影响内联元素布局。当包含块的高度小于浮动框的时候，就会出现“高度塌陷”现象了。通常我们使用清除浮动的方进行，清除浮动有两种方法，第一个是使用clear属性，第二个就是使用BFC清除浮动进行清除浮动。

clear是如何清除浮动的？

**clear属性不允许被清除浮动的元素的左边/右边挨着浮动元素，底层原理是在被清除浮动的元素上边或者下边添加足够的清除空间**。需要注意的是我们是在别的元素上清除浮动来实现撑开高度的，而不是在浮动元素上面。(部分参考https://www.jianshu.com/p/09bd5873bed4)

（1）通过在浮动元素后面加入clear属性为both的属性

下面的这个布局就会引起包含元素高度塌陷，浮动元素脱离了文档流，并不占据文档流的位置，自然父元素也就不能被撑开，所以没了高度。 

```html
<style>
.box-wrapper {
  border: 5px solid red;
}
.box-wrapper .box {
  float: left; 
  width: 100px; 
  height: 100px; 
  margin: 20px; 
  background-color: green;
}
</style>
<div class="box-wrapper">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
```

通过使用clear:both进行清除浮动

```html
<div class="box-wrapper">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div style="clear:both"></div>
</div>
```

（2）通过:after伪类选择器进行清除浮动（最优方案）,这是使用clear清除浮动的最佳实践

```css
/*现代浏览器清除方案，不支持IE6/7*/
.container:after{
    display:block;
    content:'';
    clear:both;
    height:0;
}
/*通过引入zoom支持IE6/7，是CSS Hack方式*/
.container{
    *zoom:1;
}

/*下面是全浏览器解决方案，引入了zoom以支持IE6/7，同时加入:before以解决现代浏览器上边距折叠的问题*/
.container:before,
.container:after{
    display:table;/*这里为block也可以*/
    content:" ";
    clear:both;
}
.container{
    *zoom:1;
}
```



通过BFC清除浮动（[BFC](https://www.w3cplus.com/css/understanding-css-layout-block-formatting-context.html )）

BFC（Block Format Context ：块级格式化上下文），它是按照块级盒子布局的。我们了解他的特征、触发方式、常见使用场景这些就够了。

满足下面条件之一的都会生成BFC

-  根元素
- float的值不为none
- overflow的值不为visible
- display的值为inline-block、table-cell、table-caption
- position的值为absolute或者fixed

BFC的特征

**可以将BFC看作是一个页面中的迷你布局，一旦创创建了一个BFC它其中的所有元素都会被它包裹。** 正如我们所见的，当盒子变成BFC之后，它内部的浮动元素就再也不可能突破它的底部（也就是说，盒子不再会因内部元素浮动而坍塌）。[BFC](https://www.w3cplus.com/css/understanding-css-layout-block-formatting-context.html ),除了这个以外，还有另外一个功能，BFC可以阻止外边距的叠加，一个BFC会停止去围绕浮动元素。如果一个元素创建了BFC，它就不会去围绕（或者说包裹）任何浮动元素。所以BFC的特点如下：

- BFC容器是一个隔离的容器，和其他元素互不干扰；所以我们可以用触发两个元素的BFC来解决垂直边距折叠问题。 
-  BFC的一个特性是可以包含浮动；通常用来解决浮动父元素高度坍塌的问题。 

其中，BFC清除浮动就是用的“包含浮动”这条特性。 那么，怎样才能触发BFC呢？ 

我们可以给父元素添加以下属性来触发BFC： 

- `float` 为 `left` | `right` 
- `overflow`为`hidden`|`auto`|`scroll`
- `display`为`table-cell`|`table-caption`|`inline-block`|`flex`|`inline-flex`
- `position`为`absolute`|`fixed`

所以我们可以给父元素设置`overflow:auto`来简单的实现BFC清除浮动，但是为了兼容IE最好用`overflow:hidden`。但是这样元素阴影或下拉菜单会被截断，比较局限。 

```css
.box-wrapper{
  overflow: hidden;
}
```

