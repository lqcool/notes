### Node.js全局对象

在浏览器JavaScript中，通常window是全局对象，而Node.js中的全局对象是global对象，所有的全局变量（除了global本身以外）都是global对象的属性。

#### 全局变量

全局变量的宿主就是全局对象，ECMAScript定义的全局变量的满足条件如下：

- 在最外层定义的变量
- 全局对象的属性
- 隐式定义的变量（未定义直接赋值的变量）

Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文。 （因为node.js有包装机制，在加载当前模块的时候，会在首尾进行装饰）

注意：永远使用 var 定义变量以避免引入全局变量，因为全局变量会污染 命名空间，提高代码的耦合风险。 



一些全局变量：

（1）__filename变量

__filename表示当前正在执行的脚本的文件名，它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。 

（2）__dirname

__dirname表示当前执行脚本所在的目录

除了上面的一些全局变量以外，还有setTimeout(cb,ms)，clearTimeout(t)，setInterval(cb,ms)，console，process等等。

这里介绍一下console变量提供的方法，对于process变量提供的一些功能，可以查看相关文档https://www.runoob.com/nodejs/nodejs-global-object.html

console全局变量中的方法：

| 序号· | 方法                                         | 描述                                                         |
| ----- | -------------------------------------------- | ------------------------------------------------------------ |
| 1     | **console.log([data]\[,....])**              | 向标准输出流打印字符并以换行符结束。该方法接收若干 个参数，如果只有一个参数，则输出这个参数的字符串形式。如果有多个参数，则 以类似于C 语言 printf() 命令的格式输出。 |
| 2     | **console.info([data]\[, ...])**             | 该命令的作用是返回信息性消息，这个命令与console.log差别并不大，除了在chrome中只会输出文字外，其余的会显示一个蓝色的惊叹号。 |
| 3     | **console.error([data]\[, ...])**            | 输出错误消息的。控制台在出现错误时会显示是红色的叉子。       |
| 4     | **console.warn([data]\[, ...])**             | 输出警告消息。控制台出现有黄色的惊叹号。                     |
| 5     | **console.dir(obj[, options])**              | 用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。 |
| 6     | **console.time(label)**                      | 结束时间，表示计时结束。                                     |
| 7     | **console.trace(message[, ...])**            | 当前执行的代码在堆栈中的调用路径，这个测试函数运行很有帮助，只要给想测试的函数里面加入 console.trace 就行了。 |
| 8     | **console.timeEnd(label)**                   | 结束时间，表示计时结束。                                     |
| 9     | **console.assert(value[, message]\[, ...])** | 用于判断某个表达式或变量是否为真，接收两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。 |

对于process全局变量，它是描述当前Node.js进程状态的对象，提供了一个与操作系统的简单接口，通常在写本地命令行程序的时候，少不了要 和它打交道。详情请看：https://www.runoob.com/nodejs/nodejs-global-object.html

process.cwd()//输出当前目录

process.memoryUsage()//输出当前内存使用情况