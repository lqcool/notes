### Node.js的文件模块

Node.js提供一组类似于UNIX标准的文件操作API。Node导入文件系统的模块语法：var fs = require("fs");

#### 读取文件的方法 readFile()和readFileSync()

(1)readFile()方法：是一个异步读取文件，是非阻塞式IO操作

```js
var fs = require("fs");//导入文件模块
//异步读取文件
fs.readFile("input.txt",(err,data)=>{
    if(err){
        //处理错误
    }
    //处理数据data
})
```

(2)readFileSync()方法：同步读取文件，阻塞后面代码的执行

```js
var fs = require("fs");//导入文件模块
//同步读取文件
var data = fs.readFileSync("input.txt");
//处理数据data
```

上面两个方法，异步读取效率更高，通常使用异步readFile()读取文件。

#### 打开文件方法open()

在异步模式下面打开文件语法格式：fs.open(path,flags[,mode],callback)

参数说明：

- path:文件的路径
- flags:文件打开的行为
- mode:设置文件模式（权限），文件创建默认权限为0666（可读，可写）
- callback:回掉函数，带两个参数callback(err,fd)

flags参数可以是一下的值：

| Flag | 描述                                                   |
| ---- | ------------------------------------------------------ |
| r    | 以读取模式打开文件。如果文件不存在抛出异常。           |
| r+   | 以读写模式打开文件。如果文件不存在抛出异常。           |
| rs   | 以同步的方式读取和写入文件。                           |
| rs+  | 以同步的方式读取和写入文件。                           |
| w    | 以写入模式打开文件，如果文件不存在则创建。             |
| wx   | 类似 'w'，但是如果文件路径存在，则文件写入失败。       |
| w+   | 以读写模式打开文件，如果文件不存在则创建。             |
| wx+  | 类似 'w+'， 但是如果文件路径存在，则文件读写失败。     |
| a    | 以追加模式打开文件，如果文件不存在则创建。             |
| ax   | 类似 'a'， 但是如果文件路径存在，则文件追加失败。      |
| a+   | 以读取追加模式打开文件，如果文件不存在则创建。         |
| ax+  | 类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。 |

文件读写的例子：

```js
var fs = require("fs");
// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', (err, fd)=>{
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});
```

#### 获取文件信息stat()

通过异步模式获取文件信息语法格式：fs.stat(path,callback)

参数说明：

- path:文件路径
- callback:回掉函数，带两个参数如callback(err,stats)，stats是fs.Stats对象

fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。

stats类中的方法如下：

| 方法                      | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| stats.isFile()            | 如果是文件返回true，否则返回false                            |
| stats.isDirectory()       | 如果是目录返回true，否则返回false                            |
| stats.isBlockDevice()     | 如果是块设备返回 true，否则返回 false。                      |
| stats.isCharacterDevice() | 如果是字符设备返回 true，否则返回 false。                    |
| stats.isSymbolicLink()    | 如果是**软链接**返回 true，否则返回 false。                  |
| stats.isFIFO()            | 如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。 |
| stats.isSocket()          | 如果是 Socket 返回 true，否则返回 false。                    |

附加：软链接和硬链接

> 链接实际上是一种文件共享的方式，是POSIX中的概念，主流文件系统都支持链接文件。
>
> 作用：
>
> 链接简单地理解为 Windows 中常见的快捷方式（或是 OS X 中的替身），Linux 中常用它来解决一些库版本的问题，通常也会将一些目录层次较深的文件链接到一个更易访问的目录中。在这些用途上，我们通常会使用到软链接（也称符号链接）。 
>
> 区别：
>
> 从使用的角度讲，两者没有任何区别，都与正常的文件访问方式一样，支持读写，如果是可执行文件的话也可以直接执行。 
>
> 硬链接：两个文件如同同一个文件，innode值相同，都指向同一个区块，文件的 inode 值，你可以简单把它想成 C 语言中的指针。它指向了物理硬盘的一个区块，事实上文件系统会维护一个引用计数，只要有文件指向这个区块，它就不会从硬盘上消失。 当我们修改一个文件，另一个也会改变。
>
> 软链接（符号链接）：软链接的 inode 不一样，并且它的文件属性上也有一个 l 的 flag，这就说明它与之前我们创建的两个文件（也就是硬链接）根本不是一个类型。 当我们删除创建的文件的时候，之前的硬链接没有丝毫地影响，因为它 inode 所指向的区块由于有一个硬链接在指向它，所以这个区块仍然有效，并且可以访问到。 然而软链接的 inode 所指向的内容实际上是保存了一个绝对路径，当用户访问这个文件时，系统会自动将其替换成其所指的文件路径，然而这个文件已经被删除了，所以自然就会显示无法找到该文件了。 
>
> 硬链接： 与普通文件没什么不同，inode 都指向同一个文件在硬盘中的区块 软链接： 保存了其代表的文件的绝对路径，是另外一种文件，在硬盘上有独立的区块，访问时替换自身路径。 
>
> https://blog.csdn.net/zhanglh046/article/details/78441698

#### 写入文件writeFile()

异步模式下写入文件语法：fs.writeFile(file,dasta[,options],callback)

writeFile直接打开文件默认是w模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。

参数说明：

- file:文件名称或者文件描述符
- data:要写入文件的数据，可以是String(字符串)或者Buffer(流)对象。
- options:该参数是一个对象，包含{encoding,mode，flag}。默认编码为utf-8，模式为0666，flag为'w'
- callback:回掉函数，回调函数只包含错误信息参数（err），在写入失败的时候返回。

创建文件xxx.file的例子：

```js
var fs = require("fs");
fs.writeFile("input.txt",'我是通过fs.writeFile写入文件的内容',(err)=>{
    if(err){
        //错误报告，错误处理
        return ;
    }
    console.log("文件写入成功！");
});
```

####读取文件read()

异步模式下读取文件语法格式：fs.read(fd,buffer,offset,length,position,callback)

该方法使用了文件描述符来读取文件

参数说明：

- fd:通过fs.open()方法返回的文件描述符
- buffer:数据写入的缓冲区
- offset:缓冲区写入的写入偏移量
- length:要从文件中读取的字节数
- position:文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。 
- callback:回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。 

#### 关闭文件close()

异步模式下关闭文件的语法格式：fs.close(fd,callback)

使用文件描述符获取文件，也就是通过fs.open()方法获取的文件描述符fd

参数说明：

- fd:通过fs.open()方法返回的文件描述符
- callback:回掉函数，没有参数

关闭文件的例子：

```js
var fs = require("fs");
var buf = new Buffer(1024);
//开始打开文件
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("准备读取文件！");
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
      // 关闭文件
      fs.close(fd, function(err){
         if (err){
            console.log(err);
         } 
         console.log("文件关闭成功");
      });
   });
});
```



