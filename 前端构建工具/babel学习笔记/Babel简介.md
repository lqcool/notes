### Babel简介

babel是一个javascript编译器，是一个工具链，在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码。

#### babel功能和特色

（1）ES2015及其它

Babel 通过语法变换器支持最新版本的 JavaScript。

这些 [plugins](https://babel.docschina.org/docs/en/plugins) 允许你**现在**就使用新语法，而无需等待浏览器的支持。点击查看[使用指南](https://babel.docschina.org/docs/en/usage)以开始使用。

（2）JSX和React

Babel 可以转换 JSX 语法！你可以通过下面这个命令安装该 preset

```shell
npm install --save-dev @babel/preset-react
```

（3）类型注释（Flow和TypeScript）

Babel 可以删除类型注释！点击查看 [Flow preset](https://babel.docschina.org/docs/en/babel-preset-flow) 或 [TypeScript preset](https://babel.docschina.org/docs/en/babel-preset-typescript) 以开始使用。Babel 本身没有进行类型检查的功能，只是结合这些使用。

安装preset-flow：

```shell
npm install --save-dev @babel/preset-flow
```

例子：

```
//@flow
function square(n:number):number{}
```

也可以通过下面这个命令安装 typescript preset

安装preset-typescript：

```shell
npm install --save-dev @babel/preset-typescript
```

例子：

```typescript
function Greeter(greeting: string) {
    this.greeting = greeting;
}
```

（4）可拔插

Babel 是用插件构建的。你可以使用现有插件编写自己的转换管道或编写自己的插件。通过使用或创建 [preset](https://babel.docschina.org/docs/en/plugins#presets)轻松使用一组插件。

（5）可调式

支持 **Source map**，因此你可以轻松调试编译过的代码。

（6）规范性

Babel 试图尽可能地遵循 ECMAScript 标准。为了平衡性能，它也可能有特定的一些选项，以便可以更符合规范。

（7）压缩性

Babel 尝试使用尽可能少的代码而不依赖于庞大的运行时环境。