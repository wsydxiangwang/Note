//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor){
    const self = this;          // 缓存当前promise实例
    self.state = PENDING;       // 默认状态
    self.value = null;          // 成功的值
    self.error = null;          // 失败的值
    self.onFulfilledCallbacks = [];    // 保存then中的回调
    self.onRejectedCallbacks = [];     // 保存catch中的回调

    const resolve = (value) => {
        if(self.state == PENDING){
            setTimeout(() => {
                self.state = FULFILLED;
                self.value = value;
                self.onFulfilledCallbacks.map(cd => cd(self.value));
            })
        }
    }
    const reject = (error) => {
        if(self.state == PENDING){
            setTimeout(() => {
                self.state = REJECTED;
                self.error = error;
                self.onRejectedCallbacks.map(cd => cd(self.error));
            })
        }
    }

    // 如果executor执行报错，直接执行reject
    try{
        executor(resolve, reject)
    }catch(err){
        reject(err)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
    let self = this,
        bridgePromise;

    // 判断then的参数是否为函数类型，不是则赋予默认值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

    function resolvePromise(bridgePromise, x, resolve, reject) {
        // 如果x是一个promise
        if(x instanceof MyPromise){
            if(x.state === PENDING){
                x.then(y => {
                    resolvePromise(bridgePromise, y, resolve, reject)
                }), err => {
                    reject(err)
                }
            }else{
                x.then(resolve, reject)
            }
        }else{
            // 非 Promise 的话直接 resolve 即可
            resolve(x)
        }
    }

    if(this.state == PENDING){
        return bridgePromise = new MyPromise((resolve, reject) => {
            // 避免传入错误值
            self.onFulfilledCallbacks.push((value) => {
                try{
                    const x = onFulfilled(value)
                    resolvePromise(bridgePromise, x, resolve, reject);
                }catch(err){
                    reject(err)
                }
            })
            self.onRejectedCallbacks.push((err) => {
                try{
                    const x = onRejected(err)
                    resolvePromise(bridgePromise, x, resolve, reject);
                }catch(err){
                    reject(err)
                }
            })
        })
    }
    else if(this.state == FULFILLED){
        console.log(2)
        return bridgePromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try{
                    const x = onFulfilled(self.value)
                    resolvePromise(bridgePromise, x, resolve, reject);
                }catch(err){
                    reject(err)
                }
            })
        })
    }
    else{
        return bridgePromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try{
                    const x = onRejected(self.error)
                    resolvePromise(bridgePromise, x, resolve, reject);
                }catch(err){
                    reject(err)
                }
            })
        })
    }
}

const promise = (name) => {
    return new MyPromise((resolve, reject) => {
        resolve(name)
    })
}
promise('1111').then(res => {
    console.log(res)
    return promise('22222')
}).then(res => {
    console.log(res)
})
new MyPromise((resolve, reject) => {
    resolve('222')
}).then(res => {
    console.log(res)
})

// function a(fn){
//     console.log(22222)
//     const c = () => {
//         console.log(4)
//     }
//     const b = () => {
//         console.log(5)
//     }
//     fn(c, b)
// }

// new a((s, b) => {
//     console.log(33)
//     // s()
//     b()
// })