### Node.js Stream(流)

Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。 

#### node.js中的Stream的类型

- Readable - 可读操作。 
- Writable - 可写操作 。
- Duplex - 可读可写操作。
- Transform - 操作被写入数据，然后读出结果。 

所有的Stream对象都是EventEmitter的实例。常用的事件如下：

| 名称   | 说明                             |
| ------ | -------------------------------- |
| data   | 当有数据可读时触发               |
| end    | 没有更多的数据可读时触发         |
| error  | 在接收和写入过程中发生错误时触发 |
| finish | 所有数据已被写入到底层系统时触发 |



从流中读取数据的例子：

```js
var fs = require("fs");
var data = "";
//创建可读流
var readerStream = fs.createReadStream("xxx/xxds/input.txt");
//设置读取编码格式
readerStream.setEncoding("UTF8");
//监听事件data，end，error，finish
//读取数据时候触发的事件
readerStream.on("data",(chunk)=>{
    data += chunk;
});
//读取完毕触发的事件
readerStream.on("end",()=>{
    console.log(data);
});
readerStream.on("error",(err)=>{
    console.log(err.stack);
});
```

写入流的例子

```js
var fs = require("fs");
var data = "问你一个问题好不好，那个，你是不是那个我的谁谁谁？";
//创建写入流，写入到文件dest.txt中
var writerStream = fs.createWriteStream("xxx/xxds/dest.txt");
// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');
// 标记文件末尾
writerStream.end();
//读取数据时候触发的事件
readerStream.on("finish",()=>{
    console.log("写入完成。");
});
readerStream.on("error",(err)=>{
    console.log(err.stack);
});
```

#### 管道流

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。 

![44](https://github.com/LQ55/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/44.png)

如图所示：文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。 

读取一个文件内容并将内容写入到另外一个文件中 的例子：

```js
var fs = require("fs");
// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');
var writerStram = fs.createWriteStream('output.txt');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
```

#### 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。 

用管道和链式来压缩和解压文件 的例子：

```js
var fs = require("fs");
var zlib = require('zlib');
//压缩 input.txt 文件为 input.txt.gz
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))；
console.log("文件压缩完成");


// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
console.log("文件解压完成");
```

