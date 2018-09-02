

1、浏览器提供screenLeft、screenTop获取窗口的位置，FireFox使用screenX、screenY提供窗口的位置。

```js
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft:window.screenX;
var topPos = (typeof window.screenTop == "number") ? window.screenTop:window.screenY;
```

2、浏览器提供innerWidth、innerHeight、outerWidth、outerHeight获取窗口大小信息，在Chrome中outerWidth和innerWidth相等，outerHeight和innerHeight相等，都是获取的视口的信息。而一般使用的时候，浏览器提供了document.documentElement.clientWidth和document.documentElement.clientHeight保存了视口信息（标准模式下有效）如果是混杂模式需要使用document.body.clientHeight和document.body.clientWidth获取视口大小信息。兼容写法：

```js
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if(typeof pageWidth != "number"){
    //判断是否处于标准模式中
    if(document.compatMode == "CSS1Compat"){
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    }else{//混杂模式（非标准模式）
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
```

3、检测浏览器窗口的屏蔽，如果是浏览器内置的屏蔽程序阻止的弹出窗口，那么window.open()很可能返回一个null，如果是其它的扩展程序或者其它程序阻止的弹出窗口，window.open()通常返回一个错误。可以使用下面的代码进行检查：

```js
var blocked = false;
try{
    var wroxWin = window.open("http://www.lqxx.com","_blank");
    if(wroxWin == null){
        blocked = true;
    }
}catch(ex){
    blocked = true;
}
if(blocked){
    alert("弹窗被屏蔽了！");
}
```

4、获取地址栏参数的方法

```js
function getQueryString(name){
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r = window.location.sreach.substr(1).match(reg);
    if(r!=null){
        return unescape(r[2]);
    }else{
        return null;
    }
}
```

5、检测DOM的一致性

DOM分为多个级别，同时也包含多个部分，因此检测浏览器实现了DOM的哪些部分就十分重要。`document.implementation`属性就是为此提供相应信息和功能的对象，于浏览器对DOM的实现直接对应。DOM1级只为`document.implementation`规定了一个方法，也就是`hasFeature()`，接收两个参数：要检测的DOM功能的名称和版本号。如果浏览器支持给定名称和版本的功能，方法返回true。在DOM2级中又新增了一个方法，叫做`createHTMLDocument()`，这个方法返回一个完整的HTML文档，包括html、head、title、body等

```js
var hasXmlDom = document.implementation.hasFeature("XML","1.0");
```

6、DOM扩展中新增的选择符API

- querySelector()：接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回null。
- querySelectorAll()：和上面的接收同样的参数，返回匹配的所有元素，不是一个元素，是NodeList的实例，没有找到，那么返回的NodeList是空的，

7、元素的遍历

对于元素之间的空格，IE9以及之前的版本不会返回文本节点，而其它所有浏览器都会返回文本节点。这样使得childNodes和firstChild等属性行为不一致。为了弥补差异，Element Traversal规范定义了一组新属性。通过是使用下面的这些属性，就不用再去检查获取的元素是否为元素节点了。

- `childElementCount`：返回子元素的个数（不包括文本节点和注释）的个数
- `firstElementChild`：指向第一个子元素；firstChild的元素版
- `lastElementChild`：指向最后一个子元素；lastChild的元素版
- `previousElementSibling`：指向前一个同辈元素，previousSibling的元素版
- `nextElementSibling`：指向后一个同辈元素，nextSibling的元素版

8、DOM扩展时新增的一些API（HTML5扩展）

- getElementByClassName()：通过类名查找元素，传入一个或多个类名，返回包含类名的元素，一个NodeList

- 在节点中新增classList属性，并为该属性新增了一些方法，add、remove、contain、toggle用于操作类名

- document.activeElement：始终引用当前获得焦点的元素，通过新增的方法document.hasFocus()方法检查文档是否获得了焦点

- 扩展了HTMLDocument，引入readyState属性，包括两个值，loading表示文档正在加载中，complete表示文档已经加载完毕。

  ```js
  if(document.readyState=="complete"){alert("文档加载完毕")}
  ```

- 新增head属性，引用\<head\>标签

- 新增几个字符集属性，包括charset属性，表示文档中实际使用的字符，也可以用于设置新的字符。document.charset，defaultCharset表示默认设置

操作类名

以前操作类名是获取`dom`，然后获取对象的className属性的值，然后分割，然后取值。很麻烦，`html5`提供了`classList`属性，这个属性是新集合`DOMTokenList`的实例，与其他的`DOM`集合类似。`DOMTokenList`有一个表示自己包含多少元素的length属性，取得每个元素可以使用`item()`，也可以使用`[]`语法取值，此外还定义了一些新的方法

- add(value)：将给定的字符串值添加到列表中，如果值已经存在，不在添加
- contains(value)：表示列表中是否存在给定的值，如果存在返回true，反之返回false
- remove(value)：从列表中删除给定的字符
- toggle(value)：如果列表中已经存在给定的值，删除它，如果没有，添加它。

```js
//例如为dom添加class，或者移除class
element.classList.add("classnnx");
```

兼容模式

检查页面渲染的模式是标准模式还是混杂模式，检查页面的兼容模式成为浏览器的必要功能

```js
//标准模式下
if(document.compatMode === "CSS1Compat"){
    alert("standards mode");
}
//混杂模式 document.mode === "BackCompat"
else{
    alert("quirks mode");
}
```

html5规定可以微元素添加自定义属性（非标准属性），但要夹data前缀，添加的自定义属性可以通过元素的dataset属性来访问自定义属性的值。dataset属性的值是DOMStringMap的一个实例，也就是一个名值对的映射。在dataset中去掉了data的前缀

```html
<div id = "muDIV" data-appId="123450" data-myname="LQ"></div>
```

```js
var div = document.getElmentById("myDIV");
//取得自定义的属性
var appId = div.dataset.appId;
var myname = div.dataset.myname;
//设置值
div.dataset.appId = 1243;
div.dataset.myname = "jone";
```

IE中的事件和其它浏览器事件中的相关操作

```js
//其它浏览器中阻止时间的默认行为是调用event对象的preventDefault()，IE中是设置event的returnValue值为true
event.preventDefault();/*The others*/
event.returnValue = true;/*IE*/
//其它浏览器中阻止事件的冒泡是调用event对象的stopPropagation()，IE中是设置event的cancelBubble值为true
event.stopPropagation();/*The others*/
event.cancelBubble = true;/*IE*/
//IE中的目标属性是srcElement，而其它的是target
var dom = event.srcElement||event.target;
```

javaScript中的有的事件不冒泡，比如：

- blur、focus、mouseenter、mouseleave

只有在同一个元素中相继触发mousedown和mouseup事件，才会触发click事件，如果其中一个被取消了，那么就不会触发click事件。鼠标点击事的触发顺序为

```js
mousedown->mouseup->click->mousedown->mouseup->click->dbclick
```

检测六浏览器是否支持所有DOM3级事件，可以使用特性检测，如下

```js
var isSupported = document.implementation.hasFeature("MouseEvent","3.0");
//注意在检查是否支持DOM2级事件，是使用MouseEvents，多了个s
var isSupported = document.implementation.hasFeature("MouseEvents","2.0");
//附：检查浏览器是否支持焦点事件，使用
var isSupported = document.implementation.hasFeature("FocusEvent","3.0");
```

鼠标事件发生的位置都保存在事件对象event中

- clientX和clientY：这两个值指的是发生事件的位置距离视口的水平和垂直距离，视口指的是去掉滚动条和边框与工具栏
- pageX和pageY：这两个值是指出发生事件的坐标的页面位置，就是坐标是从页面本身而非视口左边和顶边计算的。
- screenX和screenY：这两个值指出发生时间的坐标位置相对于整个屏幕的位置，也就是显示屏。

DOM为某些键定义了对应的事件属性，包括Shift、Ctrl、Alt和Meta（在Windows中为Windows键，Mac中为Cmd键），通过检查这四个属性，检测他们的属性值是否为true从而判断是否被按下

```js
//在event事件中，定义了四个属性shiftKey、ctrlKey、altKey和metaKey。如果这些值是true那么代表他们表示的键被按下了
dom.onclick = function(event){
    var event = event||window.event;
    if(event.shiftKey){
       //shiftKey被按了
    }
    if(event.ctrlKey){
       // ..
    }
    ...
}
```

对鼠标按钮的反应，事件对象的button属性，对于mousedown是表示按下了哪一个，对于mouseup表示释放了哪一个。

- 0：表示没有按下按钮
- 1：表示按下主按钮
- 2：表示按下次按钮
- 3：主次按钮同时按下
- 4：表示按下中间按钮
- 5：同时按下朱按钮和中间按钮
- 6：次按钮和中间按钮
- 7：三个按钮同时按下

与鼠标滚动事件相关的是mousewheel事件，事件里面有一个wheelData属性，向前滚动wheelData是120的倍数，向后滚动是-120的倍数

常用的keyCode（在IE中使用的是charCode，需要兼容处理），当发送keydown和keyup事件的时候，event对象的keyCode属性包含一个代码，与键盘上面的键对应，常用的如下

| 键            | 码     |
| ------------- | ------ |
| 退格          | 8      |
| 制表符（tab） | 9      |
| 回车符        | 13     |
| Shift         | 16     |
| Ctrl          | 17     |
| Alt           | 18     |
| Esc           | 27     |
| 数字小键盘    | 96-105 |



