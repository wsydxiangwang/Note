# Virtual DOM

要知道渲染`真实DOM`的开销是很大的，比如有时候我们修改了某个数据，**如果直接渲染到真实dom上会引起整个dom树的重绘和重排**，有没有可能我们只更新我们修改的那一小块dom而不要更新整个dom呢？

`diff算法`能够帮助我们。

我们先根据真实DOM生成一颗`virtual DOM`，当`virtual DOM`某个节点的数据改变后会生成一个新的`Vnode`，然后`Vnode`和`oldVnode`作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使`oldVnode`的值为`Vnode`。

`diff`的过程就是调用名为`patch`的函数，比较新旧节点，一边比较一边给**真实的DOM**打补丁。

## virtual DOM和真实DOM的区别

`virtual DOM`是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。比如dom是这样的：

```html
<div>
    <p>123</p>
</div>
```

对应的virtual DOM（伪代码）：

```js
var Vnode = {
    tag: 'div',
    children: [
        { tag: 'p', text: '123' }
    ]
};
```

（温馨提示：`VNode`和`oldVNode`都是对象，一定要记住）

- 用JavaScript对象模拟DOM
- 把此虚拟DOM转成真实DOM并插入页面中
- 如果有事件发生修改了虚拟DOM
- 比较两棵虚拟DOM树的差异，得到差异对象
- 把差异对象应用到真正的DOM树上

## VNode

对于 `VNode`，相信大家一点都不陌生，用于表示虚拟节点，是实现` Virtual DOM `的一种方式。那么它究竟是怎样的呢？我们就去 Vue 源码里探讨一下。

```js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

这里千万不要因为 `VNode` 的这么属性而被吓到，或者咬紧牙去摸清楚每个属性的意义，其实，我们主要了解其几个核心的关键属性就差不多了，例如：

- `tag` 属性即这个`vnode`的标签属性
- `data` 属性包含了最后渲染成真实dom节点后，节点上的`class`，`attribute`，`style`以及绑定的事件
- `children` 属性是`vnode`的子节点
- `text` 属性是文本属性
- `elm` 属性为这个`vnode`对应的真实dom节点
- `key` 属性是`vnode`的标记，在`diff`过程中可以提高`diff`的效率


`Virtual DOM` 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 `VNode` 的 create、diff、patch 等过程。