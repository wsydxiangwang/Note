# this 全面解析

`this`的绑定规则总共有下面5种。

1. 默认绑定（严格/非严格模式）
2. 隐式绑定
3. 显式绑定
4. new绑定
5. 箭头函数绑定

## 绑定规则

### 1.1 默认绑定
全局上下文默认this指向`全局对象window`, 严格模式下指向`undefined`。
```js
function foo() { // 运行在严格模式下，this会绑定到undefined
    "use strict";
    console.log( this.a );
}
var a = 2;
foo(); // TypeError: Cannot read property 'a' of undefined

// --------------------------------------

function foo() { // 运行
    console.log( this.a );
}
var a = 2;
(function() { // 严格模式下调用函数则不影响默认绑定
    "use strict";
    foo(); // 2
})();
```

### 1.2 隐式绑定
这种情况是直接调用。this相当于全局上下文的情况。
```js
let name = 2222;
let obj = {
    name: 3333,
    a: function() {
        console.log(this.name); // 2222
    }
}
let func = obj.a;
func();         
```

### 1.3 显式绑定
通过`call(..)` 或者 `apply(..)`方法。第一个参数是一个对象，在调用函数时将这个对象绑定到`this`。因为直接指定`this`的绑定对象，称之为显示绑定。

### 1.4 new绑定
> 如果函数调用前使用了 new 关键字, 则是调用了构造函数。
> 这看起来就像创建了新的函数，但实际上 JavaScript 函数是重新创建的对象：
```js
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}
// This creates a new object
var a = new myFunction("Li", "Cherry");
a.lastName;  // "Cherry"
```

## this 的指向

在 ES5 中，其实 this 的指向，始终坚持一个原理：**this 永远指向最后调用它的那个对象**。

下面我们来看一个最简单的例子：
```js
var name = "windowsName";
function a() {
    var name = "Libai";
    console.log(this.name);          // windowsName
    console.log("inner:" + this);    // inner: Window
}
var b = {
    name: "Libai",
    fn : function () {
        console.log(this.name);      // Libai
    }
}
a();
b.fn();             // Libai
window.b.fn();      // Libai 最后调用它的对象仍然是对象 a
```
这个相信大家都知道为什么 log 的是 `windowsName`，我们看最后调用 a 的地方 `a()`，前面没有调用的对象那么就是全局对象 `window`，这就相当于是 `window.a()`  

函数 `fn` 是对象 `b` 调用的，所以打印的值就是 `b` 中的 `name` 的值。是不是有一点清晰了呢~

再来看看下面这两个例子
```js
var name = "windowsName";
var a = {
    name: "Libai",
    fn : function () {
        console.log(this.name);      // windowsName
    }
}
var f = a.fn;
f();

function fn() {
    var name = 'Libai';
    innerFunction();
    function innerFunction() {
        console.log(this.name);      // windowsName
    }
}
fn()
```
读到现在了应该能够理解这是为什么了吧(oﾟ▽ﾟ)o。



## 箭头函数

**箭头函数的 this 始终指向函数定义时的 this，而非执行时。** 

箭头函数需要记着这句话：“`箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值`，如果箭头函数被非箭头函数包含，则 `this` 绑定的是最近一层非箭头函数的 `this`，否则，`this`为 `window`”。

```js
var name = "windowsName";
var a = {
    name : "Libai",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout( () => {
            this.func1()
        },100);
    }
};
a.func2()     // Libai
```

## 使用 _this = this
如果不使用 ES6，那么这种方式应该是最简单的不会出错的方式了，我们是先将调用这个函数的对象保存在变量`_this` 中，然后在函数中都使用这个 `_this`，这样 `_this` 就不会改变了。

```js
var name = "windowsName";
var a = {
    name : "Libai",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        var _this = this;
        setTimeout( function() {
            _this.func1()
        },100);
    }
};
a.func2()       // Libai
```


## apply、call、bind
> 使用 `apply、call、bind` 函数也是可以改变 `this` 的指向的

### apply 和 call 的区别

`apply` 和 `call` 基本类似，他们的区别只是传入的参数不同。

```js
fun.call(this, arg1, arg2)    // 使用 call，参数列表
fun.apply(this, [arg1, arg2]) // 使用 apply，参数数组

var a = {
    name : "Libai",
    fn : function (a,b) {
        console.log(this.name, a + b)
    }
}
var b = a.fn;

b.call(a, 1, 2)         // Libai 3
b.apply(a, [1, 2])      // Libai 3
```

### bind 和 apply、call 区别
```js
var a = {
    name : "Libai",
    fn : function (a,b) {
        console.log(this.name, a + b)
    }
}
var b = a.fn;

b.bind(a, 1, 2)
```

我们会发现并没有输出，这是为什么呢，我们来看一下 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind?_blank) 上的文档说明：

> bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

所以我们可以看出，bind 是创建一个新的函数，我们必须要手动去调用：

```js
var a = {
    name : "Libai",
    fn : function (a,b) {
        console.log(this.name, a + b)
    }
}
var b = a.fn;

b.bind(a, 1, 2)()         // Libai 3
```