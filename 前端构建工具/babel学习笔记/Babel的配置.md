### Babel的基本配置

使用babel来进行转换项目文件不仅仅能够通过cli（命令行）的方式进行，还可以通过配置文件的方式来指定babel的行为。

#### CLI的基本用法

需要的所有 Babel 模块都将作为单独的 npm 包发布，其范围为 `@babel`（自版本7开始）。这种模块化设计允许每种工具都针对特定用例设计。下面我们来看看 `@babel/core` 和 `@babel/cli`。

1. 核心库

Babel 的核心功能在 [@babel/core](https://babel.docschina.org/docs/en/babel-core) 模块。通过以下命令安装：

```
npm install --save-dev @babel/core
```

可以直接在javaScript中使用它进行相应的操作

```js
var babel = require("@babel/core");//依赖
babel.transform("code",optionsObject);//指定要转换的代码片段，与配置参数，进行代码转换
```

2. CLI工具d

[@babel/cli](https://babel.docschina.org/docs/en/babel-cli) 是一个允许你从终端使用 babel 的工具。下面是安装命令和基本用法的示例：

```shell
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

上面的代码`./node_modules/.bin/babel src --out-dir lib`的作用是**它使用我们设置的解析方式来解析 `src` 目录中的所有 JavaScript 文件**，并将转换后每个文件输出到 `lib` 目录。由于我们还没有设置解析方式，这里输出代码将与输入相同（不保留确切的代码样式）。我们**可以通过将它们作为选项传入来指定我们想要的解析方式。**

上面使用babel的时候使用了`--out-dir`选项，可以通过使用 `--help` 运行它来查看 cli 工具接受的其余选项，对我们来说最重要的是 `--plugins` 和 `--presets`

3. Plugins和Presets

代码转换以插件的形式出现，插件是小型 JavaScript 程序，它指示 Babel 如何对代码进行转换。你甚至可以编写自己的插件来应用你想要的任何代码转换。要将ES2015+ 语法转换为 ES5，我们可以依赖官方插件，如 `@babel/plugin-transform-arrow-functions`：

```shell
npm install --save-dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/pligin-transform-arrow-functions
```

上面的代码就是将src文件夹里面的源文件的箭头函数转换为es2015的语法的文件，并输出到lib文件夹下面，如果想要转换代码中还有其他 ES2015+ 功能。可以使用 "preset" 来代替预先设定的一组插件，而不是逐一添加我们想要的所有插件。我们使用`env ` preset

```
npm install --save-dev @babel/preset-env
./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

没有任何配置，这个 preset 包括支持现代 JavaScript（ES2015，ES2016 等）的所有插件。但是 presets 也可以选择。我们不从终端传入 cli 和 preset 选项，而是通过另一种传入选项的方式：配置文件。



#### 通过配置文件配置Babel

方式有如下几种

1. babel.config.js

在项目根文件夹下面创建一个babel.config.js的文件，内容如下

```js
module.exports = function(){
    const presets = [...];
    const plubins = [...];
    
    return {
        presets,
        plubins
    };
}
```

2. .babelrc

在项目根目录下面创建一个名为`.babelrc`的文件，内容如下

```
{
    "presets":[...],
    "plugins":[...]
}
```

3. package.json

此外也可以选择从package.json中的babel值来指定你的.babelrc配置，如下所示：

```js
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

4. .babelrc.js

通过这种方式的配置和.babelrc差不多，但是是通过javascript的方式指定的

```js
const presets = [...];
const plugins = [...];
module.exports = {presets,plugins};
```

5. 使用cli(@babel/cli)配置
6. 使用Babel API进行配置

以上就是可以配置babel的方式

