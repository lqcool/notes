**借用构造函数实现继承**  

```js
function SuperType(){
    this.colors = ["red","blue","green"];
}

function SubType(){
    //在子类构造函数中调用父类构造函数（同时这种方式支持向父类构造函数传参）
    SuperType.call(this);
    //SuperType.call(this,arg1,arg2)
    //SuperType.apply(this,args)
}
```

作用：借用构造函数方式是在新的SubType对象上面执行SuperType中定义的初始化代码，针对在原型中的引用类型，每一个实例都有自己的一个副本（可以清除原型中包含引用类型值的问题）

问题：仅仅是借用构造函数，无法避免构造函数模式存在的问题，方法都是在构造函数中定义，因此函数复用就无从谈起了

**组合继承**(经典继承)

这种方式的**思想**是使用原型实现对原型属性和方法的继承，而通过构造函数实现对实例属性的继承

```js
function SuperType(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
//父类原型的属性和方法
SuperType.prototype.SayName = function(){
    alert(this.name);
}
function SubType(name,age){
    //通过调用父类的构造方法继承父类的实例属性
    SuperType.call(this,name);
    //自己的实例属性
    this.age = age;
}
//通过原型方式继承父类
SubType.prototype = new SuperType();
//重写constructor属性
SubType.prototype.constructor = SubType;
SubType.ptototype.sayAge = function(){
    alert(this.age);
}
```

组合继承避免了原型链和借用构造函数的缺陷，融合了他们的优点，是javaScript中最常用的一种继承模式。

问题：组合继承会导致父类构造方法被调用两次，当我们在创建子类原型的时候会调用一次，第二次是我们调用子类构造方法的时候里面会调用一次。

**原型式继承**

借助原型可以基于已有对象创建新的对象，同时还不必因此创建自定义类型

```js
var person = {
    name:"SC",
    friends:["nix","unix","windows","ubantu"]
}
function object(o){
    //临时构造函数
    function F(){};
    //继承
    F.prototype = o;
    return new F();
}
var p1 = object(person);
p1.friends.push("p1's friends");
p1.name = "P1";

var p2 = object(person);
p2.friends.push("p2's friends");
p2.name = "P2";

console.log(p1.name);//P1
console.log(p2.name);//P2
console.log(p1.friends);//["nix", "unix", "windows", "ubantu", "p1's friends", "p2's friends"]
console.log(p2.friends);//["nix", "unix", "windows", "ubantu", "p1's friends", "p2's friends"]
```

上面的原型方式在ECMScript5中通过新增Object.create()方法规范化了，该方法接收两个参数，第一个为用作新对象原型的对象和（可选的）一个新对象定义额外属性的对象。

问题：原型式继承同样没有解决引用问题

**寄生式继承**

寄生式继承思路与寄生构造函数类似，也就是创建一个仅仅用于封装继承过程的函数，该函数内部以某种方式来增强对象，最后再像真正的地是它做了所有的工作一样返回对象。

```js
//寄生式继承
function createAnother(original){
    //调用函数创建一个新的对象
    var clone = object(original);
    //以某种方式来增强这个对象
    clone.sayHi = function(){
        alert("HI");
    }
    return clone;
}
//上面的object()函数不是必须的，每一个能够返回新对象的函数都可以适用这个模式
```

问题：可以使用寄生继承来为对象添加函数，会由于不能做到函数复用而降低效率，这一点会与构造函数模式类似。

**寄生组合式继承**

寄生组合式继承解决组合继承中两次调用父类构造函数的问题。寄生组合式继承，也就是通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

思路是：不必为了指定子类的原型而调用超类的构造函数，我们所需要的无非就是超类型原型的一个副本而已，本质上，就是使用寄生继承来继承超类原型，然后再将结果指定给子类型的原型

```js

function inheritPrototype(subType,superType){
    //创建对象
    var prototype = object(superType.prototype);
    //增强对象
    prototype.constructor = subType;
    //指定对象
    subType.prototype = prototype;
}
```



