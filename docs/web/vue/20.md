# 一句话说明

## keep-alive

`keep-alive`是 Vue 内置的一个组件，可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

`activated`和`deactivated`两个生命周期, 将会在`<keep-alive>`树内的所有嵌套组件中触发, 用来得知当前组件是否处于活跃状态。

- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- max - 数字。最多可以缓存多少组件实例。


实现原理：
- [keep-alive](https://ustbhuangyi.github.io/vue-analysis/v2/extend/keep-alive.html)
- [聊聊keep-alive组件的使用及其实现原理](https://github.com/answershuto/learnVue/blob/master/docs/%E8%81%8A%E8%81%8Akeep-alive%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%85%B6%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.MarkDown)

## 组件中 data 为什么是一个函数

为什么组件中的 `data` 必须是一个函数，然后 return 一个对象，而 `new Vue` 实例里，`data` 可以直接是一个对象？

因为组件是用来复用的，且 JS 里**对象是引用关系**，如果组件中 `data` 是一个对象，那么这样作用域没有隔离，子组件中的 `data` 属性值会相互影响，如果组件中 `data` 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 `data` 属性值不会互相影响；而 `new Vue` 的实例，是不会被复用的，因此不存在引用对象的问题。

## 父子组件钩子函数执行顺序

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：


- 加载渲染过程

父 `beforeCreate` -> 父 `created` -> 父 `beforeMount` -> 子 `beforeCreate` -> 子 `created` -> 子 `beforeMount` -> 子 `mounted` -> 父 `mounted`

- 子组件更新过程

父 `beforeUpdate` -> 子 `beforeUpdate` -> 子 `updated` -> 父 `updated`

- 父组件更新过程

父 `beforeUpdate` -> 父 `updated`

- 销毁过程

父 `beforeDestroy` -> 子 `beforeDestroy` -> 子 `destroyed` -> 父 `destroyed`

## 父组件监听子组件的生命周期

比如有父组件 `Parent` 和子组件 `Child`，如果父组件监听到子组件挂载 `mounted` 就做一些逻辑处理，可以通过以下写法实现：

```html
// Parent.vue
<Child @mounted="doSomething"/></Child>
    
// Child.vue
<script>
mounted() {
    this.$emit("mounted");
}
</script>
```

以上需要手动通过 `$emit` 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 `@hook` 来监听即可，如下所示：

```html
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

<script>
doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
}
</script>

//  Child.vue
<script>
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},
</script>
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```

当然 `@hook` 方法不仅仅是可以监听 `mounted`，其它的生命周期事件，例如：`created`，`updated` 等都可以监听。

