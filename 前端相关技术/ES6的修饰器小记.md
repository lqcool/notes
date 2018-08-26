---
title: ES6的修饰器小记
categories: 
- ES6
---

ES6中的修饰器包括了类修饰器，类成员属性修饰器，类方法修饰器，修饰器在其中都是以函数的方式呈现，在使用的时候，使用`@修饰器名称`

在使用webpack打包的时候，在js中使用修饰器的时候，需要添加`babel-plugin-transform-decorators-legacy`插件让babel能够识别修饰器语法

webpack中的部分语法如下：

```js
//定义loader
module:{
    rules:[
        {
            test:/\.js$/,
            //忽略node_modules下面的文件
            exclude:/node_modules/,
            use:{
                loader: "babel-loader",
                options: {
                    presets:['env'],
                    plugins:['transform-decorators-legacy','transform-class-properties']
                }
            }
        }
    ]
},
```

1、类修饰器

在本个类的修饰中，我们会在调用类实例的方法时候，通过类修饰器log在调用方法之前和之后做一些事情[参照](https://www.imooc.com/video/17455)

```js
/**
 * @param target 代表被修饰的类
 */
function log(target) {
    //获取所有签名
    const desc = Object.getOwnPropertyDescriptors(target.prototype);
    for(const key of Object.keys(desc)){
        if(key === 'constructor'){
            continue;
        }
        //我们在调用之前和之后做一点事
        const  func = desc[key].value;
        //只对方法做处理
        if('function' === typeof func){
            Object.defineProperties(target.prototype,key,{
                value(...args){
                    //在调用之前做事情
                    console.log("before " + key );
                    //调用真正的原函数定义
                    const ret = func.apply(this,args);
                    //在调用之后做事情
                    console.log("after " + key);
                    return ret;
                }
            })
        }
    }
}
//@log为类修饰器
@log
class Numberic{
    add(...nums){
        return nums.reduce((a,b)=>{a+b},0);
    }
}

```

2、类成员属性修饰器

在下面的例子中，我们定义了一个成员属性修饰器，该修饰器的作用是使得成员属性`PI`不可修改，修改将导致报错。

在类中定义成员属性的时候，也需要添加插件让babel能够识别该语法，插件是`babel-plugin-transform-class-properties`，通过npm安装并在webpack的配置文件中配置，如下：

```js
//定义loader
module:{
    rules:[
        {
            test:/\.js$/,
            //忽略node_modules下面的文件
            exclude:/node_modules/,
            use:{
                loader: "babel-loader",
                options: {
                    presets:['env'],
                    plugins:['transform-decorators-legacy','transform-class-properties']
                }
            }
        }
    ]
},
```

成员属性修饰器：

```js
/**
 * 类属性成员修饰器
 * @param target 类的实例对象
 * @param key 类的成员名称
 * @param descriptor 描述对象
 */
function readonly(target,key,descriptor) {
    //设置descriptor的writeable为false，说明成员不能够修改
    descriptor.writable = false;
}

class Numberic{
    //@readonly属性成员修饰器
   @readonly PI = 3.1415926;
}

//这里修改实例的PI属性将会报错
new Numberic().PI = 100;
```

3、类方法修饰器

在下面的例子中，我们定义了一个类方法修饰器`@validate`，该方法修饰器的作用是验证方法的入参是否合法(这里要求方法参数必须为数字)，如果不合法，就报错，代码如下

```js
/**
 * 类方法修饰器
 * @param target 类的实例对象
 * @param key 
 * @param descriptor
 */
function validate(target,key,descriptor) {
    const func = descriptor.value;
    descriptor.value = function(...args){
        for(let num of args){
            //检查入参是否合法，不合法直接报错
            if('number' !== typeof num){
                throw  new Error(`"${num}" is not a number`);
            }
        }
        return func.apply(this,args);
    }
}

class Numberic{
   @validate
   add(...nums){
        return nums.reduce((p,n)=>{p+n},0)
    }
}
//传入不和发参数将会报错
new Numberic().add(1,2,'x');
```