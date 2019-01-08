## FreeMarker基础

1、模板+数据模型=输出

为模板准备的数据整体被称作为 **数据模型**。总的来说，模板和数据模型是FreeMarker来生成输出(比如第一个展示的HTML)所必须的：模板 + 数据模型 = 输出。

2、数据模型一览

数据模型的基本结构是树状的。 这棵树可以很复杂，并且可以有很大的深度

```shell
(root)
  |
  +- animals
  |   |
  |   +- mouse
  |   |   |   
  |   |   +- size = "small"
  |   |   |   
  |   |   +- price = 50
  |   |
  |   +- elephant
  |   |   |   
  |   |   +- size = "large"
  |   |   |   
  |   |   +- price = 5000
  |   |
  |   +- python
  |       |   
  |       +- size = "medium"
  |       |   
  |       +- price = 4999
  |
  +- message = "It is a test"
  |
  +- misc
      |
      +- foo = "Something"
```

上图中的变量扮演目录的角色(比如 root, `animals`, `mouse`, `elephant`, `python`, `misc`) 被称为 **hashes** (哈希表或哈希，译者注)。哈希表存储其他变量(被称为 *子变量*)， 它们可以通过名称来查找(比如 "animals", "mouse" 或 "price")。

存储单值的变量 (`size`, `price`, `message` 和 `foo`) 称为 **scalars** (标量，译者注)。如果要在模板中使用子变量， 那应该从根root开始指定它的路径，每级之间用点来分隔开。

标量类型可以分为如下的类别：

- 字符串：就是文本，也就是任意的字符序列，比如上面提到的 ''m'', ''o'', ''u'', ''s'', ''e''。比如 `name` 和 `size` 也是字符串。
- 数字：这是数值类型，就像上面的 `price`。 在FreeMarker中，字符串 `"50"` 和数字 `50` 是两种完全不同的东西。前者是两个字符的序列 (这恰好是人们可以读的一个数字)，而后者则是可以在数学运算中直接被使用的数值。
- 日期/时间: 可以是日期-时间格式(存储某一天的日期和时间)， 或者是日期(只有日期，没有时间)，或者是时间(只有时间，没有日期)。
- 布尔值：对应着对/错(是/否，开/关等值)类似的值。 比如动物可以有一个 `protected` (受保护的，译者注) 的子变量， 该变量存储这个动物是否被保护起来的值。

另外一种很重要的变量是 **sequences** (序列，译者注)。它们像哈希表那样存储子变量，但是子变量没有名字，它们只是列表中的项。 要访问序列的子变量，可以使用方括号形式的数字索引下标。

总结：

- 数据模型可以被看成是树形结构。
- 标量用于存储单一的值。这种类型的值可以是字符串，数字，日期/时间或者是布尔值。
- 哈希表是一种存储变量及其相关且有唯一标识名称的容器。
- 序列是存储有序变量的容器。存储的变量可以通过数字索引来检索，索引通常从0开始。

3、模板一览

- `${*...*}`：FreeMarker将会输出真实的值来替换大括号内的表达式，这样的表达式被称为 **interpolation**(插值，译者注)。

- **FTL 标签** (FreeMarker模板的语言标签)： FTL标签和HTML标签有一些相似之处，但是它们是FreeMarker的指令，是不会在输出中打印的。 这些标签的名字以 `#` 开头。(用户自定义的FTL标签则需要使用 `@` 来代替 `#`，但这属于更高级的话题了。)

- **注释：** 注释和HTML的注释也很相似， 但是它们使用 `<#--` and `-->` 来标识。 不像HTML注释那样，FTL注释不会出现在输出中(不出现在访问者的页面中)， 因为 FreeMarker会跳过它们。

4、基本指令（标签）

- if指令：使用 `if` 指令可以有条件地跳过模板的一些片段。使用`elseif`完善后后面的条件，使用`else`标签来指定当为false的时候需要执行的内容。

  ```xml
  <#if animals.python.price < animals.elephant.price>
    Pythons are cheaper than elephants today.
  <#elseif animals.elephant.price < animals.python.price>
    Elephants are cheaper than pythons today.
  <#else>
    Elephants and pythons cost the same today.
  </#if>
  ```

- list指令：当需要列表显示内容时，list指令是必须的。

  ```xml
  <p>We have these animals:
  <table border=1>
    <#list animals as animal>
      <tr><td>${animal.name}<td>${animal.price} Euros
    </#list>
  </table>
  ```

  `list` 指令的一般格式为： `<#list  sequence as loopVariable>repeatThis</#list>`。 `repeatThis` 部分将会在给定的 `sequence` 遍历时在每一项中重复， 从第一项开始，一个接着一个。在所有的重复中， `loopVariable` 将持有当前遍历项的值。 这个变量仅存在于 `<#list ...>` 和 `</#list>` 标签内。

  `sequence* 可以是任意表达式， 比如我们可以列表显示示例数据模型中的水果，就像这样：

  ```xml
  <ul>
  <#list misc.fruits as fruit>
    <li>${fruit}
  </#list>
  </ul>
  ```

  上面示例中的一个问题是如果我们有0个水果，它仍然会输出一个空的 `<ul></ul>`，而不是什么都没有。 要避免这样的情况，可以使用`items指令`。

  ```
  <#list>
  	<ul>
  		<#items as fruit>
  			<li>${fruit}</li>
  		</#items>
  	</ul>
  </#list>
  ```

  此时， `list` 指令将列表视为一个整体， 在 `items` 指令中的部分才会为每个水果重复。 如果我们有0个水果，那么在 `list` 中的所有东西都被略过了， 因此就不会有 `ul` 标签了。

  另一个列表相关的常见任务是：使用一些分隔符来列出水果，比如逗号：

  ```xml
  <p>Fruits: <#list misc.fruits as fruit>${fruit}<#sep>, </#list>
  ```

  输出为：

  ```xml
  <p>Fruits: orange, banana
  ```

  被 `sep` 覆盖的部分(我们也可以这么来写： `...<#sep>, </#sep></#list>`) 只有当还有下一项时才会被执行。 因此最后一个水果后面不会有逗号。

  再次回到这个话题，如果我们有0个水果，会怎么样？只是打印 "Fruits:" 也没有什么不方便。 `list` 指令，也像 `if` 指令那样，可以有 `else`部分，如果列表中有0个元素时就会被执行：

  ```xml
  <p>
  Fruits:
  	<#list misc.fruits as fruit>
          ${fruit}
          <#sep>,
          <#else>None
  	</#list>
  </p>
  ```

  所有的这些指令(`list`, `items`, `sep`, `else`)可以联合起来使用：

  ```xml
  <#list misc.fruits>
  	<p>Fruits:
  	<ul>
  		<#items as fruit>
  			<li>${fruit}<#sep>and</#sep>
  		</#items>
  	</ul>
  	<#else>
  		<p>We have no fruits
  </#list>include指令：当需要列表显示内容时，list指令是必须的。
  ```

- include指令：使用 `include` 指令， 我们可以在模板中插入其他文件的内容。

  ```xml
   <#include "/copyright_footer.html">
  ```

5、联合使用指令

在页面上也可以多次使用指令，而且指令间也可以很容易地相互嵌套。 比如，在 `list` 指令中嵌套 `if` 指令：

```
<#list>
	<div <#if animal.protected> class="protected" </#if>>
		${animal.name} for ${animal.price} Euros
	</div>
</#list>
```

6、使用内建函数

内建函数很像子变量(如果了解Java术语的话，也可以说像方法)， 它们并不是数据模型中的东西，是 FreeMarker 在数值上添加的。 为了清晰子变量是哪部分，使用 `?`(问号)代替 `.`(点)来访问它们。常用内建函数的示例：

- user?html：给出user的html转义版本，比如&会由`&amp;`来代替。
- user?upper_case：给出user值的大写版本
- animal.name?cap_first给出animal.name的首字母大写版本
- user?length给出user值中字符串的数量
- animals?size给出animals序列中项目的个数
- 如果在 `<#list animals as animal>` 和对应的 `</#list>` 标签中：
  - `animal?index` 给出了在 `animals` 中基于0开始的 `animal`的索引值
  - `animal?counter` 也像 `index`， 但是给出的是基于1的索引值
  - `animal?item_parity` 基于当前计数的奇偶性，给出字符串 "odd" 或 "even"。在给不同行着色时非常有用，比如在 `<td class="${animal?item_parity}Row">`中。

一些内建函数需要参数来指定行为

- `animal.protected?string("Y", "N")` 基于 `animal.protected` 的布尔值来返回字符串 "Y" 或 "N"。
- `animal?item_cycle('lightRow','darkRow')` 是之前介绍的 `item_parity` 更为常用的变体形式。
- `fruits?join(", ")` 通过连接所有项，将列表转换为字符串， 在每个项之间插入参数分隔符(比如 "orange,banana")
- `user?starts_with("J")` 根据 `user` 的首字母是否是 "J" 返回布尔值true或false。

内建函数应用可以链式操作，比如`user?upper_case?html` 会先转换用户名到大写形式，之后再进行HTML转义。(这就像可以链式使用 `.`(点)一样)

7、处理不存在的变量

FreeMarker 绝不能容忍引用不存在的变量， 除非明确地告诉它当变量不存在时如何处理。处理方式是：不论在哪里引用变量，都可以指定一个默认值来避免变量丢失这种情况， 通过在变量名后面跟着一个 `!`(叹号，译者注)和默认值。

下面例子中，当 `user` 不存在于数据模型时, 模板将会将 `user` 的值表示为字符串 `"visitor"`

```
<h1>Welcome ${user!"visitor"}!</h1>
```

