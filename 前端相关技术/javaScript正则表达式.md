## javaScript正则表达式

 正则表达式由两种基本字符构成：

 - 原义字符：如a、b、c等等
 - 元字符：\b、\t、\r、\v、、\cX、^、[]等等

 此外的* + ? $ ^ . | \  () {} [] 都是javaScript正则表达式中的特殊字符，需要注意。

对象属性

 - global：是否全文收索，默认为false，可以简写为g
 - ignorecase：是否大小写敏感，默认为false，可以简写为i
 - multiline：多行搜索，默认为false，可以简写为m
 - lastIndex：是当前表达式匹配内容的最后一个字符的下一个位置（也就是当前一轮匹配结束，下一轮的开始位置）
 - source：正则表达式的文本字符串     

字符类

 一般来说，正则表达式一个字符对应字符串的一个字符，例如：ab\t表示的是ab字符串“ab”+一个tab键的水平制表符。

 **[] 用来构建一个简单的类**

 - 所谓的类就是符合某些特性的对象，一个泛指，而不是特指某个字符
 - 表达式[abc]把字符a或b或c归为一类，表达式可以匹配这类的字符。匹配a或者b或者c

 **^用来创建反向类/负向类**

 - 反向类的意思是不属于某个类的内容
 - 表达式[\^abc]表示匹配不是a或b或c的内容

 **[a-z]范围类**

 - 正则表达式提供了范围类：[a-z]表示从a到z的任意字符，是一个闭区间（包含了a和z）
 - [a-zA-Z]表示a到z或者A-Z
 - 如果要匹配横线-，因为范围类里面本来就有-，会导致不匹配，例如"2016-07-4".replace(/[0-9]/g,"S");变为了SSS-SS-S，要匹配中间的横线的话，在正则表达式后面加一个横线：/[0-9-]/g就行了。

 **js正则提供预定义类来匹配常见的字符类**

| 字符 | 等价类          | 含义                             |
| ---- | --------------- | -------------------------------- |
| .    | [^\r\n]         | 除了回车符和换行符之外的所有字符 |
| \d   | [0-9]           | 数字字符                         |
| \D   | [^0-9]          | 非数字字符                       |
| \s   | [\t\n\x0B\f\r]  | 空白符                           |
| \S   | [^\t\n\x0B\f\r] | 非空白符                         |
| \w   | [a-zA-Z_0-9]    | 单词字符（字母、数字、下划线）   |
| \W   | [^a-zA-Z_0-9]   | 非单词字符                       |

 - 例如/ab\d./就表示匹配ab+一个数字+任意字符的一个字符串，不用预定义类就为/ab[0-9]\[^\r\t]

 **js正则提供几个常用的边界匹配字符**

| 字符 | 含义           |
| ---- | -------------- |
| ^    | 以某个字符开始 |
| $    | 以某个字符结束 |
| \b   | 单词边界       |
| \B   | 非单词边界     |

 - 例如要匹配“This is a dog”中的This中的is，而不是其它的is，就可以使用正则/\Bis\b/g来匹配
 - 例如匹配一@作为开头的字符串，正则为/^@/gim（这里的g表示全局匹配，i表示忽略大小写，m表示多行匹配，例如字符串中有换行符的时候）
 - 匹配一个@最为结尾的字符串，正则为/@$/gim

量词

 正则表达式中，量词表示数量

 **js正则表达式提供的量词**

| 字符  | 含义                             |
| ----- | -------------------------------- |
| ?     | 出现零次或者一次（最多出现一次） |
| +     | 出现一次或者多次（至少出现一次） |
| *     | 出现零次或者多次（任意次）       |
| {n}   | 出现n次                          |
| {n,m} | 出现n到m次                       |
| {n,}  | 至少出现n次                      |

 - 例如/\d{2}/表示出现2次数字，/\d{0,10}/表示数字出现0次到10次
 - /\d+/表示至少出现一次数字
 - /\d*/表示出现0此或者多次数字

 **贪婪模式**

 对于/\d{3,6}/正则表达是如何匹配？是3次4次还是5次还是6次？

 - 正则表达式默认是尽可能多的匹配，例如
   “12345678”.replace(/\d{3,6}/g,"X") 结果为“X78”正则表达式尽可能多的匹配了

 **非贪婪模式（就是在量词后面加上一个?）**

 如果我们想要正则表达式尽可能少的匹配，就是一一旦匹配成功就不再尝试了

 - 在量词后面加上?就可以了

   例如：“123456789”.match(/\d{3,5}?/g);结果为["123","456","789"]，每次就匹配了最少的次数

   “12345678”.replace(/\d{3,6}?/g,"X");结果为"XX78"

 **利用()进行分组**

 使用()可以达到分组的功能，使用量词作用于分组

 - 例如要匹配一个字母一个数字重复3次的场景

   'a1b2c3d4'.replace(/[a-z]\d{3}/g,"X");是**不对的**，因为这里量词是作用于紧挨着它的数字，也就是\d

   使用分组才行，也就是：/([a-z]\d){3}/g表示作用与整个分组，这样就达到了想要的效果。

 **或| **

 正则表达式使用|表示或，就是走任意一个分支都可以例如yes|no那么走yes或no都可以

 - 上面的例子是作用于yes和no整个单词上面，但是如果只想一部分，例如s或n，这个时候可以使用分组/ye(s|n)o/就可以了。
 - "ByronsperByrCasper".replace(/Byr(on|ca)sper/gi,"X");结果为：XX

 **使用$反向引用**

 使用$表示捕获的分组内的内容，对应分组依次为\$1、\$2、\$3来表示

 - 例如：2015-12-25 ===12/25/2015

 - 如果用以前的方法肯定不行，因为时间可能是 变化的，例如2015变为2016，这个时候写死的正则表达式就不可以是使用了，如"2015-12-25".replace(/\d{4}-\d{2}-\d{2}/g,"12/25/2015");这是一种死的写法。

 - 比较活用的就是使用分组，并且使用$来访问捕获的分组，上面的代码就成了这个样子：

   "2015-12-25".replace(/\(d{4})-(\d{2})-(\d{2})/g,"$2/\$3/\$1")

 **忽略分组**

 不希望捕获某些分组，只需要在分组内部加上? : 就可以了，例如：(?:Byron).(ok)分组Byron将会被忽略

**前瞻**（先行断言：指的是x只有在y前面才匹配，必须写成/x(?=y)/的形式，例如只匹配%号前面的数字/d+(?=%)先行否定断言指的是x只有不在y前面才匹配，写成/x(?!y)/的形式，比如匹配不在%号前面的数字/\d+(?!%)/)与**后顾**

 正则表达式从文本头部向尾部开始解析，文本尾部方向成为“前”

 前瞻就是在正则表达式匹配到规则的时候，向前检查是否符合断言，后顾（后瞻）方向相反

 javaScript不支持后顾，符合和不符合特定断言称为肯定（正向）匹配和否定（负向）匹配

| 名称     | 正则           | 含义                                                 |
| -------- | -------------- | ---------------------------------------------------- |
| 正向前瞻 | exp(?=assert)  | 检查符合exp正则以后，还要检查是否符合断言部分        |
| 负向前瞻 | exp(?!assert)  | 匹配到正则之后，还要看看他前面的是不是不符合这个断言 |
| 正向后顾 | exp(?<=assert) | javaScript不支持                                     |
| 负向后顾 | exp(?<!assert) | javaScript不支持                                     |

 - "a2*3".replace(/\w(?=\d)/g,"x");结果为x2\*3，匹配的是单词字符后面有数字的
 - “a2*34vv”.replace(/\w(?!\d)/g,"x");结果为ax\*3xxx，匹配的是单词字符后面不是数字的

正则对象的方法

- test()

在字符串中查找符合正则的内容，若查找到返回true,反之返回false。调用的语法为：`regObj.test(str)`

- exec()

exec() 方法用于检索字符串中的正则表达式的匹配。调用的语法为：`regObj.exec(str)`

**如果非全局调用，也就是没有g**

此函数的作用和match()函数是一样的，只能够在字符串中匹配一次，如果没有找到匹配的字符串，那么返回null，否则将返回一个数组，数组的第0个元素存储的是匹配字符串，第1个元素存放的是第一个引用型分组(子表达式)匹配的字符串，第2个元素存放的是第二个引用型分组(子表达式)匹配的字符串，依次类推。同时此数组还包括两个对象属性，index属性声明的是匹配字符串的起始字符在要匹配的完整字符串中的位置，input属性声明的是对要匹配的完整字符串的引用。

**全局调用，也就是包含参数g**

全局匹配模式下，此函数返回值同样是一个数组，并且也只能够在字符串中匹配一次。不过此时，此函数一般会和lastIndex属性匹配使用，此函数会在lastIndex属性指定的字符处开始检索字符串，当exec()找到与表达式相匹配的字符串时，在匹配后，它将lastIndex 属性设置为匹配字符串的最后一个字符的下一个位置。**可以通过反复调用exec()函数遍历字符串中的所有匹配，当exec()函数再也找不到匹配的文本时，它将返回null，并把lastIndex 属性重置为0**。当然数组的内容结构和没有g标志的时候是一样的

特别注意一点： **如果在一个字符串中完成了一次模式匹配之后要开始检索新的字符串，就必须手动地把lastIndex属性重置为0。**

字符串中可以使用正则表达式的方法

 - search()方法，搜索字符串中的字符，不支持全局匹配，并且总是从字符串开始位置开始查找

 - match()方法

   **如果非全局调用**

   - 也就是没有g标志，那么match()方法就只能在字符串中执行一次匹配，如果没有找到任何匹配文本，将返回null，否则就返回一个数组，其中存放了它找到的匹配文本相关的信息。

   - 返回数组的第一个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本，也就是分组。

   - 除了常规的数组元素之外，返回的数组还包含有两个对象属性

     index：声明匹配文本的起始字符串在字符串的位置

     input：声明对stringObject的引用

     ```js
     function getQueryString(name){
         var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
         var r = "sex=男&age=12&code=111001&age=30".match(reg);
         if(r!=null){
             return r[2];
         }else{
             return null;
         }
     }
     getQueryString("age")
     ```

     对应执行后，获得的r数组中的内容（这里是没有包含全局标志g）

   ![1534730615439](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/48.png)

   **如果全局调用**

   - 也就是具有标志g，match()方法将执行全局检索，找到字符串的所有匹配子字符串，没有找到返回null，否则返回一个数组
   - 数组元素中存放的是字符串中所有的匹配子串，而且也没有index属性或input属性

   下面是包含全局匹配的结果。

   ![1534735066173](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/49.png)

 - split()：第一个参数接收字符串也接受正则表达式
 - replace()：第一个参数接收字符串也接受正则表达式，他的第二个参数可以为固定的值，也可以为一个function，就是一个回掉，当有一个匹配到了，就会调用这个回掉函数，回掉接收4个参数。

   - 匹配字符串
   - 正则表达式分组内容，没有分组则没有该参数
   - 匹配项在字符串中的index
   - 原字符串

总结自（慕课网）