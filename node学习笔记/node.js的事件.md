### Node.js的EventEmitter

Node.js所有的异步I/O操作在完成的时候都会发送一个事件到事件队列。Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。 

####EventEmitter类

该类是events模块提供的，并且该模块只提供了这样一个对象。EventEmitter是事件触发和事件监听器功能的封装。

实例化EventEmitter对象

```js
var events = require("events");
var eventEmitter = new events.EventEmitter();
```

#### EventEmitter的属性

| 序号 | 方法                               | 描述                                                         |
| ---- | ---------------------------------- | ------------------------------------------------------------ |
| 1    | addListener(event,listener)        | 为指定事件添加一个监听器到监听器数组的尾部。                 |
| 2    | on(event, listener)                | 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。 |
| 3    | once(event, listener)              | 为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。 |
| 4    | removeListener(event, listener)    | 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。 |
| 5    | removeAllListeners([event])        | 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。 |
| 6    | setMaxListeners(n)                 | 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。 |
| 7    | listeners(event)                   | 返回指定事件的监听器数组。                                   |
| 8    | emit(event, [arg1], [arg2], [...]) | 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。 |

#### 类方法

| 序号 | 方法                         | 描述                       |
| ---- | ---------------------------- | -------------------------- |
| 1    | listenerCount(emitter,event) | 返回指定事件的监听器数量。 |

#### 事件

| 序号 | 事件           | 描述                                                         |
| ---- | -------------- | ------------------------------------------------------------ |
| 1    | newListener    | 回调函数包括两个参数event字符串类型，表示事件名称；listener一个函数表示时间处理程序。该事件在添加新监听器时被触发。 |
| 2    | removeListener | 回调函数包括两个参数event字符串类型，表示事件名称；listener一个函数表示时间处理程序。从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引。 |


