#### computed属性

在模板中使用表达式是非常方便直接的，然而这只适用于简单的操作。在模板中放入太多的逻辑，会使模板过度膨胀和难以维护。如：

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

这个时候需要**computed 属性(computed property)**。

```html
<div id="example">
  <p>初始 message 是："{{ message }}"</p>
  <p>计算后的翻转 message 是："{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 一个 computed 属性的 getter 函数
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

#### computed缓存 vs method方法

可以在表达式中通过调用 method 方法的方式，也能够实现与 computed 属性相同的结果，然而细微的差异之处在于，**computed 属性会基于它所依赖的数据进行缓存。**每个 computed 属性，只有在它所依赖的数据发生变化时，才会重新取值(re-evaluate)。这就意味着，只要 `message` 没有发生变化，多次访问 computed 属性 `reversedMessage`，将会立刻返回之前计算过的结果，而不必每次都重新执行函数。相比之下，每当触发重新渲染(re-render)时，method 调用方式将**总是**再次执行函数。

#### computed属性和watch属性

Vue 其实还提供了一种更加通用的方式，来观察和响应 Vue 实例上的数据变化：**watch 属性**。`watch` 属性是很吸引人的使用方式，然而，当你有一些数据需要随着另外一些数据变化时，过度滥用 watch 属性会造成一些问题 - 尤其是那些具有 AngularJS 开发背景的开发人员。因此，更推荐的方式是，使用 computed 属性，而不是命令式(imperative)的 `watch` 回调函数。



#### VUE组件分为全局组件和局部组件

通过`Vue.component("vu-button",{...})`注册全局组件，全局方式注册的组件，可以用于之后创建的所有（通过 `new Vue` 创建的）Vue 根实例，以及 Vue 实例组件树中所有子组件的内部。

```js
Vue.component('my-component-name', {
  // ... options ...
})
```

