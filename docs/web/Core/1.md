# DOM 操作

## 获取节点



```js
getElementById():           // 通过ID获取元素，返回元素对象
getElementsByName():        // 通过name属性获取元素，返回数组
getElementsByTagName():     // 通过标签名获取元素，返回数组
getElementsByClassName():   // 通过`class`获取元素，返回数组

querySelector():            // 获取指定节点的第一个
querySelectorAll():         // 获取符合条件的节点，返回数组

getElementById().nodeName;  // 获取节点的名称
```
注意：低版本的IE<8不支持`querySelector`和`querySelectorAll`。IE8仅有限支持。


## 获取/设置属性值

```js
// 返回对应属性的属性值
element.getAttribute(name)

// 传入属性名及设置的值
element.setAttribute(name, value)

// 可设置class、自定义属性...
element.setAttribute('class', 'div1')
element.setAttribute('data-id', '1')

// 删除元素节点的属性
element.removeAttribute(name)
```

## 创建、添加、删除、克隆

- `createElement()`： 创建标签
- `createTextNode()`： 创建文本
- `appendChild()`： 添加到元素尾部

```js
// 页面已有元素
const oh = document.getElementById("div");

// 创建标签
const h1 = document.createElement('h1')
// 创建文本节点
const txt = document.createTextNode("这是一个新的段落。")

h1.appendChild(txt);    // 将文本节点添加到 <h1> 元素中
oh.appendChild(h1);     // 添加到元素内部
oh.removeChild(h1);     // 删除元素指定节点

cloneNode(true)         // 克隆节点，true：克隆节点及其属性，以及后代；false：克隆节点本身
replaceChild(a, b)      // 替换节点，参数（插入的节点，被替换的节点）

// 没有+号，则是全部覆盖，反之，追尾相加
h1.innerHTML += `hh<p>2<p>`;  // 会对html标签转化
h1.innerText += `hh<p>2<p>`;  // 按字符串处理
```

- `insertBefore()`： 添加到元素前面
- `insertAfter()`: 添加到元素后面

javascript 有 `insertBefore` 方法，却没有提供 `insertAfter` 方法。所以我们得自己动手丰衣足食!

```js
// insertBefore
// 将 newEl 添加到 targetEl 之前
parentEl.insertBefore(newEl, targetEl)

// insertAfter
// 将 newEl 添加到 targetEl 之后
function insertAfter(newElement, targetElement) {
    let parent = targetElement.parentNode
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement)
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling)
    }
}
```

## 获取父/子/同级节点

```js
// 包括文本节点、注释节点即回车、换行、空格、文本等等
parentNode          // 返回当前元素的父节点对象
childNodes          // 获取所有子节点
firstChild          // 第一个子节点
lastChild           // 最后一个子节点
nextSibling         // 下一个兄弟节点
previousSibling     // 上一个兄弟节点

// 只获取元素节点
children                    // 所有子节点
parentElement               // 父节点
firstElementChild           // 第一个子节点
lastElementChild            // 最后一个子节点
nextElementSibling          // 返回元素的下一个兄弟元素节点
previousElementSibling      // 返回元素的上一个兄弟元素节点

// 返回节点的类型,数字形式（1-12）
// 常见几个1：元素节点，2：属性节点，3：文本节点。
nodeType
```


## 操作class

```js
const oh = document.getElementById("div");

oh.classList.add('hello')       // 添加class，可多个
oh.classList.remove('hello')    // 删除class，可多个
oh.classList.toggle('hello')    // 切换class，可多个

oh.classList.contains('hello')  // 是否存在class，返回Boolen

oh.classList.length             // 多少个类

oh.className = 'hello';         // 所有class被覆盖，可多个
```

