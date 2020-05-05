# defineProperty


ES5 提供了`Object.defineProperty`方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

语法：`Object.defineProperty(obj, prop, descriptor)`

参数：
- obj: 要在其上定义属性的对象。
- prop:  要定义或修改的属性的名称。
- descriptor: 将被定义或修改的属性的描述符。

## 用法

```js
var obj = {};
Object.defineProperty(obj, "num", {
    value : 1,
    writable : true,
    enumerable : true,
    configurable : true
});
//  对象 obj 拥有属性 num，值为 1
```

虽然我们可以直接添加属性和值，但是使用这种方式，我们能进行更多的配置。

函数的第三个参数`descriptor`所表示的属性描述符有两种形式：**数据描述符和存取描述符。**

两者均具有以下两种键值：

- configurable

当且仅当该属性的`configurable`为`true`时，该属性描述符才能够被改变，也能够被删除。默认为`false`。

- enumerable

当且仅当该属性的`enumerable`为`true`时，该属性才能够出现在对象的枚举属性中。默认为`false`。

**数据描述符同时具有以下可选键值：**

- value

该属性对应的值。可以是任何有效的`JavaScript`值（数值，对象，函数等）。默认为`undefined`。

- writable

当且仅当该属性的`writable`为`true`时，该属性才能被赋值运算符改变。默认为`false`。

**存取描述符同时具有以下可选键值：**

- get

一个给属性提供`getter`的方法，如果没有`getter`则为`undefined`。该方法返回值被用作属性值。默认为`undefined`。

- set

一个给属性提供`setter`的方法，如果没有`setter`则为`undefined`。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为`undefined`。


## 注意

**属性描述符必须是数据描述符或者存取描述符两种形式之一，不能同时是两者**。

这就意味着你可以：

```js
Object.defineProperty({}, "num", {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
});
```

也可以：

```js
var value = 1;
Object.defineProperty({}, "num", {
    get : function(){
      return value;
    },
    set : function(newValue){
      value = newValue;
    },
    enumerable : true,
    configurable : true
});
```

但不可以：

```js
// 报错
Object.defineProperty({}, "num", {
    value: 1,
    get: function() {
        return 1;
    }
});
```

此外，所有的属性描述符都是非必须的，但是`descriptor`这个字段是必须的，如果不进行任何配置，你可以这样：

```js
var obj = Object.defineProperty({}, "num", {});
console.log(obj.num); // undefined
```

|           | configurable | enumerable | value | writable | get | set |
| --------- | :---------:  | :--------: | :---: | :------: | :-: | :-: |
| 数据描述符  |     ok      |     ok     |   ok  |    ok    |  no  | no  |
| 存取描述符  |     ok      |     ok     |   no  |    no    |  ok  | ok  | 

## Setters 和 Getters

之所以讲到`defineProperty`，是因为我们要使用存取描述符中的`get`和`set`，这两个方法又被称为`getter`和`setter`。由`getter`和`setter`定义的属性称做”存取器属性“。

当程序查询存取器属性的值时，JavaScript调用`getter`方法。这个方法的返回值就是属性存取表达式的值。

当程序设置一个存取器属性的值时，JavaScript调用`setter`方法，将赋值表达式右侧的值当做参数传入`setter`。

从某种意义上讲，这个方法负责“设置”属性值。可以忽略`setter`方法的返回值。

举个例子：

```js
var obj = {}, value = null;
Object.defineProperty(obj, "num", {
    get: function(){
        console.log('执行了 get 操作')
        return value;
    },
    set: function(newValue) {
        console.log('执行了 set 操作')
        value = newValue;
    }
})

obj.num = 1 // 执行了 set 操作

console.log(obj.num); // 执行了 get 操作 // 1
```

这不就是我们要的监控数据改变的方法吗？我们再来封装一下：

```js
function Archiver() {
    var value = null;
    // archive n. 档案
    var archive = [];

    Object.defineProperty(this, 'num', {
        get: function() {
            console.log('执行了 get 操作')
            return value;
        },
        set: function(value) {
            console.log('执行了 set 操作')
            value = value;
            archive.push({ val: value });
        }
    });

    this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.num; // 执行了 get 操作
arc.num = 11; // 执行了 set 操作
arc.num = 13; // 执行了 set 操作
console.log(arc.getArchive()); // [{ val: 11 }, { val: 13 }]
```

## watch API

既然可以监控数据的改变，那我可以这样设想，即当数据改变的时候，自动进行渲染工作。举个例子：

HTML 中有个 span 标签和 button 标签

```html
<span id="container">1</span>
<button id="button">点击加 1</button>
```

当点击按钮的时候，span 标签里的值加 1。

传统的做法是：

```js
document.getElementById('button').addEventListener("click", function(){
    var container = document.getElementById("container");
    container.innerHTML = Number(container.innerHTML) + 1;
});
```

如果使用了 defineProperty：

```js
var obj = {
    value: 1
}

// 储存 obj.value 的值
var value = 1;

Object.defineProperty(obj, "value", {
    get: function() {
        return value;
    },
    set: function(newValue) {
        value = newValue;
        document.getElementById('container').innerHTML = newValue;
    }
});

document.getElementById('button').addEventListener("click", function() {
    obj.value += 1;
});
```

代码看似增多了，但是当我们需要改变`span`标签里的值的时候，直接修改`obj.value`的值就可以了。

然而，现在的写法，我们还需要单独声明一个变量存储`obj.value`的值，因为如果你在`set`中直接`obj.value = newValue`就会陷入无限的循环中。此外，我们可能需要监控很多属性值的改变，要是一个一个写，也很累呐，所以我们简单写个`watch`函数。使用效果如下：

```js
var obj = {
    value: 1
}

watch(obj, "value", function(newvalue){
    document.getElementById('container').innerHTML = newvalue;
})

document.getElementById('button').addEventListener("click", function(){
    obj.value += 1
});
```

我们来写下这个 watch 函数：

```js
(function(){
    var root = this;
    function watch(obj, name, func){
        var value = obj[name];

        Object.defineProperty(obj, name, {
            get: function() {
                return value;
            },
            set: function(newValue) {
                value = newValue;
                func(value)
            }
        });

        // value有初始值的情况下能立即在页面上展示
        if (value) obj[name] = value
    }

    this.watch = watch;
})()
```

现在我们已经可以监控对象属性值的改变，并且可以根据属性值的改变，添加回调函数，棒棒哒~

