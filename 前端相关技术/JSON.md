### JSON

JSON全称为“javascript object notation”（javascript对象表示法），起源于JavaScript的对象和数组。 不要误以为JSON最大的用处是在前端，其实JSON最大的用处是处理JavaScript和web服务器端之间数据交换。 

JSON结构有两种：对象和数组，通过这两种结构就可以表示各种复杂的结构。 

**JSON对象结构**

对象结构是使用大括号“{}”括起来的，大括号内是由0个或多个用英文逗号分隔的“关键字:值”对（key:value）构成的。 注意，这里的键名是字符串，但是值可以是数值、字符串、对象、数组或逻辑true和false。 

```js
var jsonObj ={
    "键名1":值1,
    "键名2":值2,
    "键名n":值n
}
```

从JSON中读取数据的方式：jsonObj.key或者jsonObj["key"]

从JSON中写入数据的方式：jsonObj.key = value或者jsonObj["key"] = value。

删除JSON中的数据方式：delete jsonObj.key。

遍历JSON对象方式可以使用for....in进行

```
var obj =
    {
        "name":"helicopter",
        "age":23,
        "gender":"男",
    }
for(var c in obj)
{
    if(c=="name")
    {
        document.write("姓名是："+obj[c]);
    }
}
```

**JSON的数组结构**

JSON数组结构是用中括号“[]”括起来，中括号内部由0个或多个以英文逗号“,”分隔的值列表组成。

```js
var arr =
[
    {
        "键名1":值1,
        "键名2":值2
    },
    {
        "键名3":值3,
        "键名4":值4
    },
    ……
]
```

对于获取、写入、修改、删除、遍历JSON数组结构中的数据，跟JSON对象结构的数据操作类似。

**JSON字符串**

一般，在Web服务器后台向前台传输数据的过程中，往往都是用字符串形式来传输JSON数据。

JSON字符串，指的是符合“JSON格式”的字符串。JSON字符串要求两点：

- 必须是字符串，也就是要用单引号或双引号括起来；
- 必须符合“JSON”格式。

```js
var jsonStr = '{"name": "helicopter", "age":23, "gender": "男"}';
```

JSON字符串说白了就是在JSON对象外面加一对单引号。

JSON对象转JSON字符串可以使用JSON.stringify()方法将JSON对象转换为JSON字符串。

```js
JSON.stringify(jsonObj);
```

JSON字符串转化为JSON对象，在服务器传到前台的JSON数据，如果我们在前台想要获取JSON数据，就必须将JSON字符串转换为JSON对象才能操作。可以使用JSON.parse转化。

```js
JSON.parse(jsonStr); 
```



