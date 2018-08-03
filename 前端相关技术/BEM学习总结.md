### What is BEM？

BEM：Block（块） Element（元素） Modfier（修饰符），是由**Yandex团队**提出的一种**前端命名方法论**。根据这个规范，能够创建出可以复用的前端组件和前端代码。（BEM是一个高可用、强大的、简单易用的命名规范）

编程方法论中常见的一个就是面向对象编程（OOP），这种方法用在了许多的语言中。BEM和OOP类似的，是用代码和一系列模式来描述实际情况的方法，只考虑程序实体而无所谓使用什么编程语言。（摘自https://www.w3cplus.com/css/bem-definitions.html）命名规范

### Why Choose BEM?

除了BEM规范以外还有其它的规范例如：

- OOCSS：用CSS“对象”分隔容器和内容 
- SMACSS：风格指南为您的CSS编写CSS规则的五个类别 
- SUITCSS：结构化类名和有意义的连字符 
- 原子：将样式分解为原子或不可分割的部分 

上面的方法都可以应用在项目中，无论使用哪一种方法，都将受益于更多结构化CSS和UI的优势。一些风格不那么严格和更灵活，而另一些则更容易理解和适应团队。 

使用的原因：它比其他方法（即SMACSS）更容易混淆，但仍为我们提供了我们想要的良好体系结构（即OOCSS）以及可识别的术语。 （摘自https://www.jianshu.com/p/339fdb93e155）

### Features

- 简单易用：只需要采用BEM命名规范就可以
- 单元性：独立的块和CSS选择器，可以使得你的代码可以重用和单元化
- 灵活性：使用BEM之后，方法和工具可以按照自己喜欢的方式进行配置（XML 、JSON）

按组件划分类名，减少层次关系，实现扁平化、语义化，通过唯一的类名来避免不必要的样式继承，提高渲染效率。

### How To Use?

BEM命名规范参见BEM官网：http://getbem.com/naming/

部分摘自https://segmentfault.com/a/1190000012705634

**Block**

命名规范：`block-name`

示例：

```css
.block{}
.container{}
.blog-header{}
/*上面都是block的命名方式，其中第三个是block名字有多个单词组成使用-隔开*/
```

Block是逻辑和功能相对独立的单元，类似于组件。每个block包含自己的行为（js）、结构（html模板）、表现（css）。block的独立性有利于代码的复用，有利于项目的管理。

（1）block名描述block功能，不能包含其状态，block可以嵌套、复用

- 描述功能就是描述这个block是干什么的？例如menu、carboard等等
- 不能包含其状态就是不能描述它的表现，例如一个button，那么不能描述它是什么样子red，blue

```html
<!--正确的写法-->
<div class="error"></div>
<!--错误的写法，block包含了状态-->
<div class="red-text"></div>
```

嵌套的block

```html
<div class="header">
    <div class="logo"></div>
    <div class="search-form"></div>
</div>
```

- block不能够影响自身的布局，就是不能为block设置margin和position属性
- 不能在BEM中使用元素选择器和ID选择器

**Element**（element只能作为block的一部分使用，不能独立使用）

命名规范：`block-name__element-name`（中间的-是名字如多个单词，使用的-连接）

示例：

```css
.block__mod{}
.block-body__mod{}
```

一个元素是块的一部分，具有某种功能。元素是依赖上下文的：它们只有处于他们应该属于的块的上下文中时才是有意义的。

- element表示其目的（item,text.....）,不是描述他的状态
- 命名格式为：block-name__element-name，其中的element名字和block名字以双下划线分开

```html
<form class="search-form">
    <!--下面的`input`element在`search-form`block之中-->
    <input class="search-form__input"/>
    <button class="search-form__button">搜索</button>
</form>
```

- elements同样可以相互嵌套，数量不限

```html
<!-- 正确. 下面整个element命名符合规范:`block-name__element-name`-->
<form class="search-form">
    <div class="search-form__content">
        <input class="search-form__input"/>
        <button class="search-form__button"></button>
    </div>
</form>
```

```html
<!--不正确的示例，下面的element命名不符合规范：`block-name__element-name`-->
<form class="search-form">
    <div class="search-form__content">
        <!-- Recommended: `search-form__input` or `search-form__content-input` -->
        <input class="search-form__content__input">
        <!-- Recommended: `search-form__button` or `search-form__content-button` -->
        <button class="search-form__content__button">Search</button>
    </div>
</form>
```

block决定了命名空间，确保elements不被其他block影响。block中的element在css中不需要跟block一起使用，而是独立的定义规则，这样当修改block结构的时候不需要修改css。示例如下：

```html
<style>
    .block{}
    .block__elem1{}
    .block__elem2{}
    .block__elem3{}
</style>
<!--未修改之前-->
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2">
            <div class="block__elem3"></div>
        </div>
    </div>
</div>
<!--修改结构，element的规则和他们的命名依然保持不变-->
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2"></div>
    </div>
    <div class="block_elem3"></div>
</div>
```

**When to use element?When to use block?**

block：如果一段代码可以重用，而不依赖于正在执行的其他页面组件。这个时候使用block

element：如果一段代码不能脱离父模块独立存在，那么使用element

**Modifier**

命名规范：

- 有值`block-name__element-name--modifier-value`，`block-name--modifier-value`
- 无值`block-name__element-name--modifier`，`block-name--modifier`

示例：

```css
.block__elem--mod{}/*这个是没有值的修饰符*/
.block__elem--mod-value{}/*这是修饰符带有值，带有值的修饰符通过-将修饰符和值隔开key-value形式*/
.block--mod{}/*这个是对块的描述，不带值*/
.block--mod-value{}/*这个是对块的描述，带有值*/
```

Modifier定义block和element的外观，状态或者行为。

- 表示表现（“What size? ” or "Which theme?" and so on — size_s or theme_islands)，
- 表示状态("How is it different from the others?"  — disabled, focused, etc. )
- 表示行为("How does it behave?" or "How does it respond to the user?" — such as directions_left-top )

modifier的类型为Boolean例子（带有值）：

```html
<!-- The `search-form` block has the `theme` modifier with the value `islands` -->
<form class="search-form search-form--theme-islands">
    <input class="search-form__input"/>
    <!-- The `button` element has the `size` modifier with the value `m` -->
    <button class="search-form__button search-form__button--size-m"></button>
</form>
```

modifier的类型为key-value的例子：

```html

<form class="search-form search-form_theme_islands search-form_theme_lite">
    <!-- The `input` elemen -->
    <input class="search-form__input"/>
    <button class="search-form__button search-form__button--size-s search-form__button--size-m">
    </button>
</form>
```

modifier不能够单独使用

```html
<!--
    Correct. The `search-form` block has the `theme` modifier with
    the value `islands`
-->
<form class="search-form search-form--theme-islands">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
</form>

<!-- Incorrect. The modified class `search-form` is missing -->
<form class="search-form--theme-islands">
    <input class="search-form__input">

    <button class="search-form__button">Search</button>
</form>
```







 