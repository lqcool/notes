**HTML5新增的一些元素概览**

首先疑问？为什么已有的元素同样能够实现相同的页面，还需要语义化的新元素？有如下几个理由

- 容易修改和维护
- 无障碍性阅读
- 搜索引擎优化
- 为未来的功能扩展做铺垫

| 类别                   | 元素                                                         |
| ---------------------- | ------------------------------------------------------------ |
| 用于构建页面的语意元素 | `<article>`,`<aside>`,`<figcaption>`,`<figure>`,`<footer>`,`<header>`，·</br>`<hgroup>`,`<nav>`,`<section>`,`<details>`,`<summary>` |
| 用于标识文本的语义元素 | `<mark>`,`<time>`,`<wbr>`                                    |
| web表单交互            | `<input>不是新元素，新增了许多类型`,`<datalist>`,`<keygen>`,`<meter>`,`<progress>`,`<progress>`,`<command>`,`<menu>`,`output` |
| 音频视频以及插件       | `<audio>`,`<video>`,`<source>`,`<embed>`,`<summary>`         |
| Canvas                 | `<canvas>`                                                   |
| 非英语支持             | `<bdo>`,`<rp>`,`<rt>`,`<ruby>`                               |

原来的标签语义部分发生变化：`<hr>`原来表示水平线，现在表示主题转换，但是样式没有变化，`<s>`不仅仅只是给文本加一条删除线，现在还表示不再准确，不再相关的内容。

**粗体和斜体语义的变化**

最开始常表示粗体和斜体的`<b>`和`<i>`部分被`<strong>`和`<em>`替代，现在四个共存，但是语义有区别

| 标签       | 语义                                                         |
| ---------- | ------------------------------------------------------------ |
| `<strong>` | 通常用它表示重要的内容，也就是需要在周围文本中突出的内容     |
| `<b>`      | 仅仅表示加粗字体，并不比其它文本重要，比如产品名称，关键字等都可以用这个表示 |
| `<em>`     | 表示重度文本，在朗读的时候需要大声读出来                     |
| `<i>`      | 表示应该用斜体表示的文本，但文本并不比其它文本重要，比如外语单词，技术术语等 |

**页面结构相关的语义标记**

| 元素                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `<article>`                | 表示任何形式的文章（新闻报道、论坛帖子、博客文章等等），不包括评论和作者简介，是能够独立出来的内容块 |
| `<aside>`                  | 表示独立于周围的一块完整的内容（附注栏、说明等等）           |
| `<figure>`和`<figcaption>` | 表示一副插图，figcaption是嵌套在figure中，表示元素标注图题（插图的标题） |
| `<footer>`                 | 表示页面底部页脚，通常是很小一块内容（版权申明、检点连接（About Us）等等） |
| `<header>`                 | 表示增强型标题，可以包含html标题和其它的内容。其它内容可以是标志、作者署名或者指向后面的导航栏 |
| `<hgroup>`                 | 表示增强型标题，分组两个或者多个标题元素，不包含其他内容。主要是把标题和副标题联系在一起 |
| `<nav>`                    | 表示页面中重要的一组链接，通常是导航栏，一个页面可以有多个nav |
| `<section>`                | 表示文档中的一个区块，或者表示一组文档。section是一个通用的容器，只有一条规则：其中的内容必须开始于一个标题。应该在其它语义元素（article、aside）不适用的情况下面在选择section |

**文本级别的语义元素**

| 元素       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| `<time>`   | 用来标注时间，它以任何软件程序能够理解的方式提供日期和时间（time元素是纯粹的信息化的，没有任何附加样式，所以如果是普通的文本，照样也可以显示） |
| `<output>` | 用于标注javascript的返回值，以前加入商品到购物车以后，结算的时候，价格计算出来然后通过获取也给span元素，动态的将价格装入里面，现在更加语义化，通过output标签，虽然操作方式还是一样，但是更加语义化 |
| `<mark>`   | 标注突显文本                                                 |

**表单**

HTML5为表单元素提供了autofocus属性，让页面加载后自动的聚焦到表单，但是只能给一个`<input>`或者`<textarea>`添加这个属性。

HTML5添加了表单相关的验证，可以给表单`<form>`添加novalidate属性来关闭验证。HTML5还可以使用正则表达式验证，写好了正则表达式后，可以放到表单元素`<input>`或者其它的`pattern`属性中进行验证。例如

```html
<input placeholder="WEB-001" pattern="[A-Z]{3}-[0-9]{3}"/>
```

HTML5规定了一组javascript属性，通过他们可以知道字段是否有效，最常用的就是setCustomValidity()方法，基于这个方法，可以写自定义验证逻辑。

```html
<textarea id="comments" oninput="validateComments(this)"></textarea>
<script>
    function validateComments(input){
        if(input.value.length<20){
            input.setCustomValidity("You need to comment in more details");
        }else{
            //没有错误，清除任何错误消息
            input.setCustomValidity("");
        }
    }
</script>
```

HTML5定义的几个特殊属性，不用于验证，只是用于控制浏览器的行为

- spellcheck属性：有的浏览器可以帮助检查拼写是否正确
- autocomplete：自动提供最近输入的信息，有的信息是属于敏感信息，因该把autocomplete属性设置为false
- autocorrect和autocapitalize：可以用在移动端控制自动纠错和自动大小写的功能
- multiple：多重选择

HTML5为input添加了几个新的类型：有email、url、search、Tel、number、range、datetime、date、month、week、time、color

在使用`<input type="number"/>`通常会结合`min`和`max`结合使用，并且通常为number类型不能表示表示，只能输入整数，可以通过`step`属性设置数值之间的间隔。例如：

```html
<input type="number" min="10" max="1000" step="0.1"/>
<!--上面表示可以输入的范围为10-1000，并且指定了数值的间隔，可以输入0 0.1 0.2等等-->
```

使用`<input type="range">`表示一个滑动条，通常结合`min`,`max`属性使用，通过`value`指定值，也就是滑动条的位置。

```html
<input type="range" min="10" max="1000" value="160">
```

HTML5新增`<datalist>`显示输入建议，这个表现为在普通文本框输入的时候，会出现一个可选中的下拉列表。使用方法是将`<input>`元素的list属性指定为`<datalist>`的ID：

```html
<datalist id="ddd">
	<option label="Alpaca" value="alpaca"></option>
    <option label="Zebra" value="zebra"></option>
</datalist>
<input list="ddd">
<!--为了防止有的浏览器无法使用datalist，通常在option外边包裹一个select，这样可以利用select，因为支持datalist的浏览器只关心option部分-->
```

`<progress>`和`<meter>`：两个元素外观相似作用不同，`<progress>`有一个value属性，值是0-1之间，例如0.25表示完成了25%。当然如果配合progress的max属性来的话，value的值就是在0~max之间的值了。

```html
<progress value="0.35"></progress>
<progress value="150" min="100" max="1000"></progress>
<!--上面两个都可以-->
```

`<meter>`元素表示某种计量，也叫做计量器，根据不同的数据有不同的显示，控制meter的显示方式，需要设置一个最大值和最小值，当然为了能够表示那些过高或者过低的元素。需要设置low或者high属性

```html
<meter min="5" max="20" value="6"></meter>
<meter min="5" max="20" low="3" high="16" value="6"></meter>
```

**音频和视频**

没有HTML5的时候播放视频，可以使用`<embed>`标签或者使用flash等。

`<audio>`播放声音：

- src属性：设置音频源文件

- controls属性：表示包含基本的播放控制部件
- preload属性：告诉浏览器如何下载音频，值为auto、metadata或者none
- autoplay属性：告诉浏览器在加载完成音频后就自动播放，如果不设置，需要手动播放
- loop属性：表示播放完成后从新开始播放，循环播放

`<vedio>`播放视频：

它包含了上面的音频播放标签的所有属性，除此之外还有`width`、`height`和`poster`属性，poster属性是设置替换视频的图片。浏览器在三种情况下面会使用这个属性第一是第一帧没有加载完毕，第二十preload设置为none，第三是没有找到指定的视频文件。

`<source>`标签提供多种音频视频格式，消除`<audio>`和`<vedio>`的格式限制：

```html
<audio controls>
	<source src="ddd.mp3" type="audio/mp3"/>
    <source src="ddd.ogg" type="audio/ogg"/>
</audio>
<!--<vedio>标签也是一样的-->
```

它们的dom都提供play()、pause()和stop()方法控制播放暂停，停止。

要在页面中使用CSS3新特性，最好是要加上开发商前缀，达到兼容。除了下面的这些浏览器还有很多浏览器，不过内核都差不多使用下面的一种或者几种。

| 前缀     | 浏览器           | 内核                                                    |
| -------- | ---------------- | ------------------------------------------------------- |
| -moz-    | FireFox          | Gecko内核                                               |
| -webkit- | Chrome和Safari等 | Webkit内核，Chrome现在是Blink内核                       |
| -ms-     | IE               | Trident内核，页脚IE内核                                 |
| -o-      | Opera            | 最开始是Presto内核，后面跟随Chrome大军为webkit再到blink |

