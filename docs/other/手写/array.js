
Array.prototype.filter = function (callback, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'filter' of null or undefined")
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(callback + ' is not a function')
    }

    let Obj = Object(this),         // 让Obj成为回调函数的对象传递（强制转换对象）
        len = Obj.length >>> 0,     // >>>0 保证len为number，且为正整数
        res = [];

    for (let i = 0; i < len; i++) {
        // 检查i是否存在Obj的属性（会检查原型链）
        if (i in Obj) { 
            // 回调函数调用、传参
            if (callback.call(thisArg, Obj[i], i, Obj)) {
                res.push(Obj[i]) 
            }
        }
    }

    return res;
} 

Array.prototype.map = function (callback, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'filter' of null or undefined")
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(callback + ' is not a function')
    }
    let O = Object(this),           // 转换为对象
        len = O.length >>> 0,       // 为Number的正整数
        A = new Array(len);         // 定义原长度的空值数组
    for (let k = 0; k < len; k++) {
        // 使用 in 在原型链查找
        // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
        if (k in O) { 
            let kValue = O[k]
            // 依次传入this, 当前项，当前索引，整个数组
            let mappedValue = callback.call(thisArg, kValue, k, O)
            A[k] = mappedValue
        }
    }
    return A;
} 

Array.prototype.reduce = function (callback, initialValue) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'filter' of null or undefined")
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new TypeError(callback + ' is not a function')
    }

    let O = Object(this),
        len = O.length >>> 0,
        k = 0,
        accumulator = initialValue;

    // 第一个有效值作为累加器的初始值
    if (accumulator === undefined) {
        for (; k < len; K++) {
            if (k in O) {
                accumulator = O[k];
                k++;
                break;
            }
        }
        // 超出数组界限，则TypeError
        if (k > len || len === 0) {
            throw new Error('Each element of the array is empty')
        }
    }

    for (; k < len; k++) {
        if (k in O) {
            // accumulator: 参数传递 实现累加
            accumulator = callback.call(undefined, accumulator, O[k], O)
        }
    }
    return accumulator
} 


const a = [
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
  ]

const b = a.reduce((acc, obj) => {
    var key = obj['age'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
}, {})

console.log('b', b)