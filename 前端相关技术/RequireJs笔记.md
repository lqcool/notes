### RequireJs和AMD规范模块化编程相关笔记

#### RequireJS简介

> RequireJS是一个JavaScript模块加载器。它非常适合在浏览器中使用。它是一个工具库，主要用于客户端的模块管理，当然也可以应用于服务器端，例如Node.js中。RequireJS模块管理遵循AMD规范（Asynchronoous Module Definetion）

#### RequireJS的使用和模块的定义

引入require.js

> 在模块化编程之前，我们需要事先将require.js嵌入网页中，这样就能开始在网页中进行模块化编程了
>
> - RequireJS下载地址：http://requirejs.org/
> - 引入首页面：<script data-main="js/main" src="js/require.js"></script>（data-main属性指定主代码所在的脚本文件，也就是从哪里开始，项目所有javascript的入口文件，该属性不可以省略）这里js文件夹下面的main.js是用户指定的入口文件。

define方法定义模块

> define方法用于定义一个模块，对于RequireJS来说，要求每一个模块都放在一个独立的文件里面，按照是否依赖其它的模块，定义的模块分为两种：
>
> - 定义独立模块（独立模块不需要依赖于其它的模块）
>
> ```javascript
> //一个独立模块，不需要依赖任何其它模块，可以直接使用define方法生成
> //写法一：定义一个拥有两个方法的模块，define里面定义一个拥有方法的对象
> define({
>     method1:function(){},
>     method2:function(){}
> });
>
> //写法二：定义一个拥有两个方法的模块，把对象写成一个函数，函数返回值就是输出的模块，define里面定义一个返回模块的函数function，这种自由度更高，可以在函数里面写一些初始化方法
> define(function(){
>     return {
>         method1:function(){},
>         method2:function(){}
>     }
> });
>
> //define定义的模块可以返回任何的值，不限于对象
> ```
>
> - 定义非独立的模块（依赖其它的模块，定义模块必须采用如下进行定义）
>
>
> ```javascript
> //如果是非独立模块，必须采用如下进行定义
> define(['module1','module2','module3'],function(mu1,mu2,mu3){
>     return {
>         method:function(){
>             mu1.method1();
>             mu2.method2();
>             mu3.method3();
>         }
>     }
> })
> //define方法的第一个参数是一个数组，里面是当前模块所依赖的模块，上面代码中表示当前模块依赖3个模块，只有先加载这三个模块，当前模块才能正常的运行。
> //一般情况下，module1,module2,module3是指当前目录下面的module1.js和module2.js和module3.js文件['module1','module2','module3']等价于['./module1','./module2','./module3']
> //define方法的第二个参数是一个函数，当前面的所有成员加载成功以后，该函数将会被调用，函数参数与数组成员一一对应，函数必须返回一个对象，以供其它模块的调用。
> //上面的代码表示模块返回一个对象，该对象的method方法就是外部调用的接口，method方法内调用了module1、module2、module3的方法。
>
> //如果一个模块的依赖模块过多，参数与模块一一对应非常麻烦，为了避免繁琐的写法，RequireJS提供一种更加简单的定义模块的方法
> define(function(require){
>     var module1 = require("module1");
>     	module2 = require("module2");
>     	module3 = require("module3");
>     	module4 = require("module4");
>     	.......
> });
> ```

require方法：调用模块

> require方法用于调用模块，参数与define方法类似
>
> `````javascript
> require(['module1','module2'],function(module1,module2){
>     //调用方法
> });
>
> //上面方法表示加载两个模块，如果模块都加载成功以后，就执行回掉方法
> `````
>
> require的第一个参数就是表示一个依赖关系的数组，这个数组可以写的很灵和
>
> ```javascript
> require([window.JSON ? undefine:'util/json2'],function(json){
>     JSON = JSON || window.JSON;
>     console.log(JSON.parse('{"JSON":"HERE"}'));
> });
> //上面的代码就写的很灵活，首先判定浏览器是否支持原生JSON如果支持，传入undefine否则就是用工具包util目录下面的json2模块
> ```
>
> require方法可以用在define方法内部
>
> ```javascript
> define(function(require){
>     var module = require("module");
> });
>
> //动态加载模块
> define(function(require){
>     var isReady = false,foobar;
>     require(["module1","module2"],function(module1,module2){
>         isReady=true;
>         foobar = module1() + module2();
>     });
>     
>     return {
>         isReady:isReady,
>         foobar:foobar
>     }
> });
> ```
>
> 一个输出Promise对象的例子，可以在该对象的then方法指定下一个动作
>
> ```javascript
> require(['lib/Deferred'],function(Deferred){
>     var defer = new Dferred();
>     require(['lib/templates/?index.html','lib/data/?stats'],function(templates,data){
>         //成功后，通过defer来处理，调用defer.resolve后，Promise的状态变为fullfilled已处理
>         defer.resolve({template:template,data:data});
>     });
>     return defer.promise();
> });
> ```
>
> require方法允许第三个参数，即处理错误的回掉函数，接收一个error对象作为参数
>
> ```javascript
> require(["module"],function(module){
>     //加载成功的时候回掉函数
> },function(error){
> 	//错误回掉函数
> });
> ```
>
> require对象还允许指定一个全局的Error事件监听函数，所有没有被上面的方法捕获的错误，都会触发onError
>
> ```javascript
> requirejs.onError = function(){
>     //......
> }
> ```

#### 配置require.js：config方法

> require方法本身也是一个对象，拥有一个config方法，用来配置require.js运行参数。config方法接收一个对象作为参数。
>
> ```javascript
> //require的config方法接收一个对象作为参数
> require.config({
>     paths:{
>         jquery:[
>             '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js',
>             'lib/jquery.min.js'
>         ]
>     }
> });
> ```
>
> 配置模块路径的时候，可以单独使用baseUrl属性指定基准目录，也可以单独使用paths属性指定各个模块的位置，也可以结合baseUrl和paths使用
>
> config方法参数对象的属性如下：
>
> - paths属性
>
>   paths参数指定各个模块的位置，位置可以是同一个服务器上的相对位置，也可以是外部网址，他的作用就是将一些常用的js文件，换成通用的名字，如前面的就是将lib/jquery.min.js等换成jquery。可以为每个模块定义多个位置，如果第一个位置加载失败，则加载第二个位置，上面的示例就表示如果CDN加载失败，则加载服务器上的备用脚本。需要注意的是，指定本地文件路径时，可以省略文件最后的js后缀名。
>
>   ```javascript
>   //加载jquery模块，因为jquery的路径已经在paths参数中定义了，所以会到事先设定的位置下载
>   require(["jquery"], function($) {
>       // ...
>   });
>   ```
>
> - baseUrl属性
>
>   baseUrl参数指定本地模块位置的基准目录，也就是本地模块路径相对于哪一个目录，它的作用就是，以它作为基础路径，在这个路径之下，查找文件（baseUrl 要求所有的js文件都放在同一个文件夹目录下，不然就会报错）。该属性通常由require.js加载时的data-main属性指定。
>
> - shim属性
>
>   有些库不是AMD兼容的，这个时候就需要指定shim属性的值。shim可以理解为"垫片"，帮助require.js加载非AMD规范的库。
>
>   ```javascript
>   require.config({
>       paths:{
>           "backbone":"vendor/backbone",
>           "underscore":"vendor/underscore"
>       },
>       shim:{
>           "backbone":{
>               //指定依赖
>               deps:["underscore"],
>               //指定输出符号
>               exports:"Backbone"
>           },
>           "underscore":{
>               //指定输出符号
>               exports:"_"
>           }
>       }
>   });
>   //上面代码中的backbone和underscore就是非AMD规范的库。shim指定它们的依赖关系（backbone依赖于underscore），以及输出符号（backbone为“Backbone”，underscore为“_”）。
>   ```

#### requirejs插件

> RequireJS允许使用插件，加载各种格式的数据。
>
> 插入文本数据使用的text插件例子
>
> ```javascript
> define(['module1','text!templates.html'],function(module1,templates){
>     
> });
> //上面代码加载的第一个模块是module1，第二个模块是一个文本，用'text!'表示。该文本作为字符串存放在回掉函数的templates变量中。
> ```

#### 优化器 r.js

> RequireJS提供一个基于node.js的命令行工具r.js，用来压缩多个js文件。它的主要作用是将多个模块文件压缩合并成一个脚本文件，以减少网页的HTTP请求数。
>
> 使用步骤：
>
> - 第一步安装r.js（如果已经安装node.js）:运行 npm install -g requirejs
>
> - 然后使用命令：node r.js -o <arguments>（arguments表示命令运行的时候所需要的一系列参数，例如）
>
>   node r.js -o baseUrl= . name=main out=main-build.js
>
> 除了命令行提供参数设置，也可以将参数写入一个文件，假定文件名称为build.js
>
> ```
> （{
>     baseUrl:".",
>     name:"main",
>     out:"main-build.js"
> }）
> ```
>
> 然后在用r.js运行这个参数文件，就可以了不需要其它步骤了。
>
> node r.js -o build.js
>
> 下面是一个范例，位置在根目录下面，文件名为build.js：
>
> ```javascript
> ({
>     appDir: './',
>     baseUrl: './js',
>     dir: './dist',
>     modules: [
>         {
>             name: 'main'
>         }
>     ],
>     fileExclusionRegExp: /^(r|build)\.js$/,
>     optimizeCss: 'standard',
>     removeCombined: true,
>     paths: {
>         jquery: 'lib/jquery',
>         underscore: 'lib/underscore',
>         backbone: 'lib/backbone/backbone',
>         backboneLocalstorage: 'lib/backbone/backbone.localStorage',
>         text: 'lib/require/text'
>     },
>     shim: {
>         underscore: {
>             exports: '_'
>         },
>         backbone: {
>             deps: [
>                 'underscore',
>                 'jquery'
>             ],
>             exports: 'Backbone'
>         },
>         backboneLocalstorage: {
>             deps: ['backbone'],
>             exports: 'Store'
>         }
>     }
> })
> ```
>
> 上面代码将多个模块压缩为一个main.js
>
> 文件配置属性解释：
>
> - appDir：项目目录，相对于参数文件的位置。
> - baseUrl：js文件的位置。
> - dir：输出目录。
> - modules：一个包含对象的数组，每个对象就是一个要被优化的模块。
> - fileExclusionRegExp：凡是匹配这个正则表达式的文件名，都不会被拷贝到输出目录。
> - optimizeCss: 自动压缩CSS文件，可取的值包括“none”, “standard”, “standard.keepLines”, “standard.keepComments”, “standard.keepComments.keepLines”。
> - removeCombined：如果为true，合并后的原文件将不保留在输出目录中。
> - paths：各个模块的相对路径，可以省略js后缀名。
> - shim：配置依赖性关系。如果某一个模块不是AMD模式定义的，就可以用shim属性指定模块的依赖性关系和输出值。
> - generateSourceMaps：是否要生成source map文件。
>
> 更多信息看官方文档https://github.com/requirejs/r.js/blob/master/build/example.build.js
>
> 另一个build.js的例子
>
> ```
> ({
>     mainConfigFile : "js/main.js",
>     baseUrl: "js",
>     removeCombined: true,
>     findNestedDependencies: true,
>     dir: "dist",
>     modules: [
>         {
>             name: "main",
>             exclude: [
>                 "infrastructure"
>             ]
>         },
>         {
>             name: "infrastructure"
>         }
>     ]
> })
> ```
>
> 上面代码将模块文件压缩合并成两个文件，第一个是main.js（指定排除infrastructure.js），第二个则是infrastructure.js。

来自 [《JavaScript标准参考教程(alpha)》](http://javascript.ruanyifeng.com/) by阮一峰