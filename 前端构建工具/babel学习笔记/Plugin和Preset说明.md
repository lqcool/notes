### Plugin&Preset

babel是一个编译器，只是将源代码编译为目标代码。和其它许多编译器一样，需要经过三步，解析、转换和打印。

现在babel本身需要实现代码的编译需要添加插件选项来支持。转换插件将启用相应的语法插件，因此您不必同时指定两者。

#### 插件和预设(plugin/preset)的路径

如果插件是通过npm安装的，也就是在npm中，这个时候可以直接在插件选项`plugin`中指定插件名称就可以，当然也可以使用相对或者绝对路径指定插件。

```js
{
    "plugins":["babel-plugin-myPlugin"]
}
```

或者：

```
{
    "plugins":["./node_modules/asdf/plugin"]
}
```

#### 插件名称缩写

如果插件包名称是带有`babel-plugin-`前缀，就可以使用缩写，也就是直接指定后面的名称

```js
{
    "plugins":[
        "myPlugin",//shorthand
        "babel-plugin-myplugin"//the same to the top
    ]
}
```

#### 运行顺序

Plugin 会运行在 Preset 之前。

Plugin 会从第一个开始顺序执行。ordering is first to last.

Preset 的顺序则刚好相反(从最后一个逆序执行)。

#### 插件配置

插件和预设都可以通过名字和配置对象封装在一个数组中的形式进行插件和预设的配置。没有配置的时候，下面的都是等效的。

```js
{
    "plugins":[
        "pluginA",
        ["pluginA"],
        ["pluginA",{}]
    ]
}
//没有配置的时候，配置的插件pluginA，上面几种写法都是等效的
```

如果有配置的时候，传递一个有键值对的对象来进行配置，如下所示

```js
{
    "plugins":[
        [
        	"transform-async-to-module-method",
            {
            	"module": "bluebird",
            	"method": "coroutine"
            }
        ]
    ],
    "presets":[
           ["evn",{"loose":true,"modules":false}] 
    ]
}
```



#### Preset

Preset的配置基本和plugin差不多，不论是Plugin还是Preset，有不少都有单独属于自己的配置项。Babel官网中的说明，**Preset**和**Stage-X**都是归属到**Plugin**里面的，只不过所覆盖的范围不同而已。其中介绍，如果需要转换ES2015（ES6）的语法，可以在.babelrc文件中的plugins选项中按需引入`check-es2015-constants`、`es2015-arrow-functions`、`es2015-block-scoped-functions`等等几十个不同作用的plugin，如下所示：

```js
// .babelrc
{
  "plugins": [
    "check-es2015-constants",
    "es2015-arrow-functions",
    "es2015-block-scoped-functions",
    // ...
  ]
}
```

Babel团队为了方便，将同属ES2015的几十个Transform Plugins集合到babel-preset-2015一个preset中，这样你只需要在`.babelrc`的`presets`加入`es2015`一个配置就可以完成全部ES2015语法的支持了：

```js
// .babelrc
{
  "presets": [
    "es2015"
  ]
}
```

相关链接：

[关于Babel配置项的这点事](https://segmentfault.com/a/1190000010468759)