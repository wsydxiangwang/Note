function Foo(){}
function Child(){}
function Other(){}
Child.prototype = new Foo     // 继承原型

const b = new Child()
// console.log(b instanceof Foo)       // true
// console.log(b instanceof Child)     // true
// console.log(b instanceof Other)     // false
// console.log(b instanceof Object)    // true


function instanceOf(A, B) {
    let obj = A.__proto__
    let fn = B.prototype
    while (true) {
        if (obj === null) {
            return false
        }
        if (fn === obj) {
            return true
        }
        console.log(obj)
        obj = obj.__proto__
    }
}
console.log(instanceOf(b, Foo))
// console.log(instanceOf(b, Child))
// console.log(instanceOf(b, Other))
// console.log(instanceOf(b, Object))