# Set 和 Map 数据结构

Set 和 Map 主要的应用场景在于 **数据重组** 和 **数据储存**

Set 是一种叫做**集合**的数据结构，Map 是一种叫做**字典**的数据结构


## Set

ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值（去重）。

**Set 本身是一种构造函数，用来生成 Set 数据结构。**

```js
const set = new Set([2, 4, 5]);
set.size            // 返回Set实例成员总数
set.add(value)      // 添加值，返回Set结构本身
set.delete(value)   // 添加值，返回布尔值
set.has(value)      // 判断是否存在
set.clear()         // 清除所有成员
```



将 Set 结构转为数组

```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

// or

[...new Set(array)] 
```


## WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

- WeakSet 的成员只能是对象，而不能是其他类型的值。
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

## Map

它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

也就是说，`Object`结构提供了“字符串—值”的对应，`Map`结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，`Map`比`Object`更合适。

```js
// 最终生成的格式
const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);

const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')   // 添加
m.get(value)          // 获取
m.delete(o)           // 删除
m.has(o)              // 是否存在
m.size                // 长度
m.clear()             // 清除所有
```

## weakMap

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。

WeakMap与Map的区别有两点：

- WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
- WeakMap的键名所指向的对象，不计入垃圾回收机制

## 区别

Set

1. 成员不能重复
2. 只有健值，没有健名，有点类似数组。
3. 可以遍历，方法有add, delete,has

weakSet

1. 成员都是对象
2. 成员都是弱引用，随时可以消失。 可以用来保存DOM节点，不容易造成内存泄漏
3. 不能遍历，方法有add, delete,has

Map
1. 本质上是健值对的集合，类似集合
2. 可以遍历，方法很多，可以跟各种数据格式转换

weakMap
1. 直接受对象作为健名（null除外），不接受其他类型的值作为健名
2. 健名所指向的对象，不计入垃圾回收机制
3. 不能遍历，方法同get,set,has,delete


## 参考

- [阮一峰的Set和Map数据结构](https://es6.ruanyifeng.com/?search=static&x=0&y=0#docs/set-map#Map)
- [介绍下 Set、Map、WeakSet 和 WeakMap 的区别？](https://muyiy.cn/question/js/4.html)