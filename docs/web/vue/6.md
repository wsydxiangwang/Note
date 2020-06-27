# Computed 和 Watch


`Computed`本质是一个具备缓存的`watcher`，依赖的属性发生变化就会更新视图。
适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

`Watch`没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开`deep：true`选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用`unWatch`手动注销哦。


- 功能上：`computed`是计算属性，也就是依赖其它的属性计算所得出最后的值。`watch`是去监听一个值的变化，然后执行相对应的函数
- 使用上：`computed`中的函数必须要用`return`返回；`watch`的回调里面会传入监听属性的新旧值，通过这两个值可以做一些特定的操作，不是必须要用`return`
- 性能上：`computed`中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而`watch`在每次监听的值发生变化的时候都会执行回调
- 场景上
    - computed：当一个属性受多个属性影响的时候，例子：购物车商品结算；
    - watch：当一条数据影响多条数据的时候，例子：搜索框

## Watch

侦听属性的初始化也是发生在 Vue 的实例初始化阶段的 `initState` 函数中，在 `computed` 初始化之后，执行了：

```js
function initState(vm) {  // 初始化所有状态时
  vm._watchers = []  // 当前实例watcher集合
  const opts = vm.$options  // 合并后的属性
  
  ... // 其他状态初始化
  
  if(opts.watch) {  // 如果有定义watch属性
    initWatch(vm, opts.watch)  // 执行初始化方法
  }
}

---------------------------------------------------------

function initWatch (vm, watch) {      // 初始化方法
  for (const key in watch) {          // 遍历watch内多个监听属性
    const handler = watch[key]        // 每一个监听属性的值
    if (Array.isArray(handler)) {     // 如果该项的值为数组
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])  // 将每一项使用watcher包装
      }
    } else {
      createWatcher(vm, key, handler) // 不是数组直接使用watcher
    }
  }
}

---------------------------------------------------------

function createWatcher (vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) { // 如果是对象，参数移位
    options = handler  
    handler = handler.handler
  }
  if (typeof handler === 'string') {  // 如果是字符串，表示为方法名
    handler = vm[handler]  // 获取methods内的方法
  }
  return vm.$watch(expOrFn, handler, options)  // 封装
}

```

这里的逻辑也很简单，首先对 `hanlder` 的类型做判断，拿到它最终的回调函数，最后调用 `vm.$watch(keyOrFn, handler, options)` 函数，`$watch` 是 `Vue` 原型上的方法，它是在执行 `stateMixin` 的时候定义的：

```js
Vue.prototype.$watch = function(expOrFn, cb, options = {}) {
  const vm = this
  if (isPlainObject(cb)) {  // 如果cb是对象，当手动创建监听属性时
    return createWatcher(vm, expOrFn, cb, options)
  }
  
  options.user = true  // user-watcher的标志位，传入Watcher类中
  const watcher = new Watcher(vm, expOrFn, cb, options)  // 实例化user-watcher
  
  if (options.immediate) {  // 立即执行
    cb.call(vm, watcher.value)  // 以当前值立即执行一次回调函数
  }  // watcher.value为实例化后返回的值
  
  return function unwatchFn () {  // 返回一个函数，执行取消监听
    watcher.teardown()
  }
}
```

虽然`watch`内部是使用`this.$watch`，但是我们也是可以手动调用`this.$watch`来创建监听属性的，所以第二个参数`cb`会出现是对象的情况。接下来设置一个标记位`options.user`为`true`，表明这是一个`user-watcher`。

再给`watch`设置了`immediate`属性后，会将实例化后得到的值传入回调，并立即执行一次回调函数，这也是`immediate`的实现原理。最后的返回值是一个方法，执行后可以取消对该监听属性的监听。接下来我们看看`user-watcher`是如何定义的：

```js
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    vm._watchers.push(this)  // 添加到当前实例的watchers内
    
    if(options) {
      this.deep = !!options.deep  // 是否深度监听
      this.user = !!options.user  // 是否是user-wathcer
      this.sync = !!options.sync  // 是否同步更新
    }
    
    this.active = true  // // 派发更新的标志位
    this.cb = cb  // 回调函数
    
    if (typeof expOrFn === 'function') {  // 如果expOrFn是函数
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)  // 如果是字符串对象路径形式，返回闭包函数
    }
    
    ...
    
  }
}
```

当是`user-watcher`时，`Watcher`内部是以上方式实例化的，通常情况下我们是使用字符串的形式创建监听属性，所以首先来看下`parsePath`方法是干什么的：

```js
const bailRE = /[^\w.$]/  // 得是对象路径形式，如info.name

function parsePath (path) {
  if (bailRE.test(path)) return // 不匹配对象路径形式，再见
  
  const segments = path.split('.')  // 按照点分割为数组
  
  return function (obj) {  // 闭包返回一个函数
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]  // 依次读取到实例下对象末端的值
    }
    return obj
  }
}
```

`parsePath`方法最终返回一个闭包方法，此时`Watcher`类中的`this.getter`就是一个函数了，再执行`this.get()`方法时会将`this.vm`传入到闭包内，补全`Watcher`其他的逻辑：



## 总结

- [计算属性 VS 侦听属性](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/computed-watcher.html)
- [搞懂computed和watch原理，减少使用场景思考时间](https://juejin.im/post/5d629380518825121f661973)
- [浅谈 Vue 中 computed 实现原理](https://juejin.im/post/5b98c4da6fb9a05d353c5fd7)

