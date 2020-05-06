# proxy

使用`defineProperty`只能重定义属性的读取（get）和设置（set）行为，到了 ES6，提供了`Proxy`，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。

`Proxy`这个词的原意是代理，用在这里表示由它来“代理”某些操作，ES6 原生提供`Proxy`构造函数，用来生成`Proxy`实例。我们来看看它的语法：


```js
var proxy = new Proxy(target, handler);
```

`proxy`对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。

其中，`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。

```js
var proxy = new Proxy({}, {
    get: function(obj, prop) {
        console.log('设置 get 操作')
        return obj[prop];
    },
    set: function(obj, prop, value) {
        console.log('设置 set 操作')
        obj[prop] = value;
    }
});

proxy.time = 35; // 设置 set 操作

console.log(proxy.time); // 设置 get 操作 // 35
```

除了`get`和`set`之外，`proxy`可以拦截多达13种操作，比如`has(target, propKey)`，可以拦截 propKey in proxy 的操作，返回一个布尔值。

```js
// 使用 has 方法隐藏某些属性，不被 in 运算符发现
var handler = {
    has (target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log('_prop' in proxy); // false
```

## apply()

`apply`方法拦截函数的调用、`call`和`apply`操作。

`apply`方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（`this`）和目标对象的参数数组。

```js
var target = function () { return 'I am the target'; };
var handler = {
    apply: function () {
        return 'I am the proxy';
    }
};

var p = new Proxy(target, handler);

p();
// "I am the proxy"
```


## has()

has(target, propKey) 可以拦截`propKey in proxy`的操作，返回一个布尔值。

`has`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符。

```js
var handler = {
    has (target, key) {
        if (key[0] === '_') {
        return false;
        }
        return key in target;
    }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

上面代码中，如果原对象的属性名的第一个字符是下划线，`proxy.has`就会返回`false`，从而不会被`in`运算符发现。

## ownKeys()

可以拦截对象自身属性的读取操作，返回一个数组。具体来说，拦截以下操作：

- Object.getOwnPropertyNames()
- Object.getOwnPropertySymbols()
- Object.keys()
- for...in

下面的例子是拦截第一个字符为下划线的属性名，不让它被`for of`遍历到。

```js
let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"
```

更多的拦截行为可以查看阮一峰老师的[《ECMAScript 6 入门》](https://es6.ruanyifeng.com/#docs/proxy?blank)


## watch API 优化

```js
(function() {
    var root = this;

    function watch(target, func) {

        var proxy = new Proxy(target, {
            get: function(target, prop) {
                return target[prop];
            },
            set: function(target, prop, value) {
                target[prop] = value;
                func(prop, value);
            }
        });

        return proxy;
    }

    this.watch = watch;
})()

var obj = {
    value: 1
}

var newObj = watch(obj, function(key, newvalue) {
    if (key == 'value') document.getElementById('container').innerHTML = newvalue;
})

document.getElementById('button').addEventListener("click", function() {
    newObj.value += 1
});
```