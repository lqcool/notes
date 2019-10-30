typeScript中使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

```typescript
function (name:string) {}
```

TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。

### 数据类型

JavaScript类型包括原始数据类型和对象类型，原始数据类型指的是【布尔值、字符串、数字、null、undefined、symbol】对象类型指的是【Object、function、array等】

```typescript
//布尔值声明
let isDone: boolean = false;
//数值声明
let age: number = 20;
//字符串声明
let name: string = 'lqcool';
//空值，JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
function sayHello(): void {}
//null和undefined
let u: undefined = undefined;
let n: null = null;
//与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：而 void 类型的变量不能赋值给 number 类型的变量：
let u: void;
let x: number = u;// 报错
let p: undefined;
let q: number = p;// 不会报错 同理null也一样
```

### 任意值

任意值（Any）用来表示允许赋值为任意类型。如果是一个普通类型，在赋值过程中改变类型是不被允许的。

```typescript
let xnmx: string = 'ddd';
xnmx = 7; // 报错
```

如果是任意值，则允许被赋值为任意类型

```typescript
let xnmx: any = 'seven';
xnmx = 7;
```

在任意值上可以访问任何方法以及属性。变量如果在未声明时，未指定其类型，那么它会被识别为任意值类型。

### 联合类型

```typescript
let scd: string|number;
scd = 'ddd';
scd = 12;
```

### 对象的类型-接口

面向对象语言中，接口interface是一个非常重要的概念，是对行为的抽象，而具体的行为如何表现，则需要有具体的类class去实现implement。TypeScript中使用interface定义接口

```typescript
//基础接口【定义的接口类型的变量包含的属性必须要和接口个数类型相同】
interface Person{
  name: string;
  age: number;
}
//实现
let tom: Person = {
  name: 'tom',
  age: 20
}

// 带有可选属性的接口
interface Person {
  name: string;
  age?: number;// 该属性为可选属性【可选属性含义是定义变量时候，可以不用指定该属性】
}

// 带有任意属性的接口【使用】
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}
//需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集,因此下面的定义将会报错。
let tom: Person = {
  name: 'tom',
  age: 20, // age指定的属性为number，不是任意属性指定的类型string的子集
  gender: 'man'
}

// 带有只读属性的接口 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
interface Person {
  readonly id: number; // 定义了一个只读的number类型的属性id，因此后面该接口类型的变量创建之后，id属性不能更改
  name: string;
  age?: number;
  [propName: string]: any
}

let tom: Person = {
  id: 232132,
  name: 'tom'
}
tom.id = 222; // 将会报错
```



### 数组的类型

最简单的方法是使用「类型 + 方括号」来表示数组：

```typescript
let arx: number[] = [1,2,3,4,5]; // 该数组只能存放number类型，不能存放其它类型
```

数组泛型，我们也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组：

```typescript
let fibonacci: Array<number> = [1,2,3,4,5]; // 泛型数组
```

任意类型数组

```typescript
let anyArry: any[] = ['122',23,false];
```

### 函数的类型

通常函数包含函数申明和函数表达式，一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```typescript
// 函数申明 【输入多余的（或者少于要求的）参数，是不被允许的：】
function sum(x: number, y: number): number {
  return x+y;
}

// 函数表达式 【下面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的】
let mySum = function (x: number, y: number): number {return x+y}

// 如果需要我们手动给 mySum 添加类型，则应该是这样：TS中的=>表示函数的定义，左边是函数的输入类型，需要括号括起来，右边是输出类型
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
}
```

接口定义函数形状

```typescript
interface IsearchFn {
  (source: string, subString: string) : boolean;
}

let search: IsearchFn;
search = function(source:string, subString:string):boolean {
  return source.search(subString) !=== -1;
}
```

可选参数用?:定义,需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**：

```typescript
function buildName(firstName:string , lastName?: string):string {
  .....
}
```

参数默认值，此时就不受「可选参数必须接在必需参数后面」的限制了：

```typescript
function buildName(firstName:string , lastName:string = 'cat'):string {
  .....
}
```

### 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

语法：`<类型>值` 或者`值 as 类型`

```typescript
//当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
function getLength(something: string | number): number {
    return something.length; // 将会报错
}

// 可以使用类型断言将 something断言成string类型
function getLength(something: string | number): number {
    return (<string>something).length; // 不会报错
}
```

**类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的，因此前面函数中参数的断言只能断言成为number或者string类型**



### 类

TypeScript中可以使用三种访问修饰符

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

需要注意的是，TypeScript 编译之后的代码中，并没有限制 `private` 属性在外部的可访问性。

使用 `private` 修饰的属性或方法，在子类中也是不允许访问的：

当构造函数修饰为 `private` 时，该类不允许被继承或者实例化：

当构造函数修饰为 `protected` 时，该类只允许被继承：

**readonly**

只读属性关键字，只允许出现在属性声明或索引签名中。注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```typescript
class Animal {
    // public readonly name;
    public constructor(public readonly name) {
        this.name = name;
    }
}
```

**抽象类**

`abstract` 用于定义抽象类和其中的抽象方法。

- 首先，抽象类是不允许被实例化的
- 其次，抽象类中的抽象方法必须被子类实现：



### 类与接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。

一个类可以实现多个接口：

```typescript
interface Alarm{
  alert();
}

interface Light{
  lighton();
  lightoff();
}

class Car implements Alarm,Light{
  alert() {
    ...
  }
  lighton() {
    ...
  }
  lightoff() {
    ...
  }
}
```

### 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

简单实例：

```typescript
//在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
function createArray<T> (length: number, value: T): Array<T> {
  let result: T[] = [];
  for(let i = 0; i < length; i ++){
    result[i] = value;
  }
  return result;
}

//接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来：
createArray<string>(3, 'x'); // ['x', 'x', 'x']
createArray(3, 'x'); // ['x', 'x', 'x']
```

**多个类型参数**

定义泛型的时候，可以一次定义多个类型参数：

```typescript
//定义了一个 swap 函数，用来交换输入的元组。
function swap<T,U>(tuple: [T,U]): [U,T]{
  return [tuple[1],tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]
```

**泛型约束**

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```typescript
function loggingIdentity<T>(arg: T):T {
  console.log(arg.length); // 将会报错，由于这里不知道arg的具体类型，不确定是否包含length属性，因此会报错
  return arg;
}
```

可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```typescript
interface Lengthwise{
  length: number;
}
//下面使用了extends对泛型参数进行了约束，泛型T只能复合接口Lengthwise的形状，也就是必须包含length属性
function loggingIndentity<T extends Lengwise>(arg: T) : T{
  console.log(arg.length);
  return arg;
}
```

**泛型接口**

接口也可以用来定义一个函数需要符合的形状：

```typescript
interface SearchFunc{
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```

当然也可以使用含有泛型的接口来定义函数的形状：

```typescript
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function <T>(length:number, value:T): Array<T> {
  let result: T[] = [];
  for(let i = 0; i < length; i ++){
    result[i] = value;
  }
  return result;
}

createArray<string>(3,'x'); // 或者 createArray(3,'x')
```

进一步，我们可以把泛型参数提前到接口名上：

```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>; // 指明具体泛型类型
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

**泛型类**

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

泛型参数的默认类型

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> { // 指定了泛型的默认类型
	
}
```

