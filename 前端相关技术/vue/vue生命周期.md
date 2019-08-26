### VUE生命周期学习

每个 Vue 实例在被创建之前，都要经过一系列的初始化过程，例如，Vue 实例需要设置数据观察(set up data observation)、编译模板(compile the template)、在 DOM 挂载实例(mount the instance to the DOM)，以及在数据变化时更新 DOM(update the DOM when data change)。在这个过程中，Vue 实例还会调用执行一些**生命周期钩子函数**，这样用户能够在特定阶段添加自己的代码。

生命钩子函数会在实例生命周期的不同阶段调用，如 [`mounted`](https://vue.docschina.org/v2/api/#mounted)、[`updated`](https://vue.docschina.org/v2/api/#updated) 和 [`destroyed`](https://vue.docschina.org/v2/api/#destroyed)。所有的钩子函数在调用时，其 `this` 上下文都会指向调用它的 Vue 实例（不要在选项属性或者回调函数中使用箭头函数，如`created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`）。因为箭头函数会绑定父级上下文，所以 `this` 不会按照预期指向 Vue 实例，经常会产生一些错误。

![vue生命周期](https://github.com/lqcool/notes/blob/master/%E4%BB%93%E5%BA%93%E5%9B%BE%E5%BA%93/vue_lifecycle.png)