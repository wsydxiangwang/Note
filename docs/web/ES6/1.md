# let 和 const

`let`与`const`共同点：

- 不能重复声明
- 具有块级作用域
- 变量不会提升

不同点：

- `let`：可修改值
- `const`: 声明的变量必须提供值，不能重新赋值，可修改引用类型的属性值


## 暂时性死区

我们都知道，JS引擎扫描代码时，如果发现变量声明，用`var`声明变量时会将声明提升到函数或全局作用域的顶部。

但是`let`或者`const`，会将声明关进一个小黑屋也是**TDZ(暂时性死区)**，只有执行到变量声明这句语句时，变量才会从小黑屋被放出来，才能安全使用这个变量。

```js
console.log(c); //undefined

var c = 10;

console.log(d); // 报错ReferenceError

let d = 8;

if(true){
    console.log(tmp);  // 报错
    let tmp;
    console.log(tmp); // undefined
}
if(true){
    let tmp;
    tmp = 234;
    console.log(tmp); //234
}
```

## 块级作用域

在`{}`花括号内的代码块即可以认为`let`和`const`的作用域。

> `let`可以修改值，但不能在一个代码块内重复声明

```js
{
    let aa = 1;
    console.log(aa) //1
}

(function(){
    let aa = 3;
    console.log(aa) //3
    {
        let cc = 4
        console.log(cc) //4
    }
    console.log(cc); // cc is not defined
})()

console.log(aa); // aa is not defined

{
    let bb = 1;
    let bb = 11; // 报错 重复声明
}
```

> `const`声明的变量必须提供一个值，而且会被认为是常量，意思就是它的值被设置完成后就不能再修改了。

还有，如果`const`的是一个对象，对象所包含的值是可以被修改的。抽象一点儿说，就是对象所指向的地址不能改变，而变量成员是可以修改的。

```js
const name = 10;
name = 20; // 报错 不予许修改

const nfc = { name : 'xiaobai' };
nfc.name = 'xiao';      // 可以修改对象里面的值
nfc = { name : 22 }     // 报错
```