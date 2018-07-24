## javaScript中的设计模式

 设计模式大致上可以分为3种：

 - 创建型模式：涉及到对象的创建与初始化
 - 结构型模式：描述了如何组合对象以提供新的功能
 - 行为型模式：描述对象之间如何通信

### 单例模式（单件模式）

 最简单的单例模式就是使用对象字面量方法：

 ```javascript
 var Singleton = {
     prop1:"something",
     prop2:"something else",
     method1:function(){
         //do something what you can
     }
 }

 //后面的改进，例如想扩展当前单例，可以使用下面这总方式，通过在函数内部封装变量和函数申明，然后向外面暴露接口
 function Singleton(){
     var privateProp = "value1";
     var publicProp = "value2";
     function privateMthod (){
         //do something what you want
     }
     function publicMethod(){
         //do somthing what you want
     }
     //这里进行接口的暴露，暴露公共方法，暴露公共属性
     return {
         publicMethod:publicMethod,
         publicProp:publicProp
     }
 }
 ```

 

 全局变量方式（不推荐）

 ```javascript
 function SingleObjCreator(){
     if(typeof globalObj === 'undefined'){
         globalObj = this;
     }
     return globalObj;
 }
 //缺点：使用了全局变量，任何时候都可能被覆盖，导致实例丢失，同样的，全局变量任何时候都可能覆盖别的对象。
 ```

 构造器属性方式（推荐，也有缺陷）

 ```javascript
 function SingleObjCreator(){
     if(!SingleObjCreator.single_instance){
         SingleObjCreator.single_instance = this;
     }
     return SingleObjCreator.single_instance;
 }
 //优点：通过构造器属性，解决了全局变量带来的问题
 //缺点：SingleObjCreator构造器的属性是公有的，任然有被覆盖的风险
 ```

 