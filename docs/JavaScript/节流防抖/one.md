# 性能优化之节流防抖

## 节流 throttle

函数节流指的是某个函数在一定时间间隔内（例如 3 秒）只执行一次，在这 3 秒内 `无视后来产生的函数调用请求`，也不会延长时间间隔。三秒后，才能进入**下一个任务**。这就好比公交车，10 分钟一趟，10 分钟内有多少人在公交站等我不管，10 分钟一到我就要发车走人！

使用场景:

函数节流非常适用于函数被频繁调用的场景，例如：window.onresize() 事件、mousemove 事件、scroll 滚动事件、上传进度等情况。使用 throttle API 很简单，那应该如何实现 throttle 这个函数呢？

定时器：

```js
function throttle(fn, interval) {
    let flag = true;
    return function(...args) {
        if (flag){
            flag = false;
            setTimeout(() => {
                fn.apply(this, args);
                flag = true;
            }, interval);
        }
    }
}
```

时间戳：

```js
function throttle(fn, interval) {
    let last = 0;
    return function (...args) {
        let now = +new Date();
        if(now - last > interval){
            last = now;
            fn.apply(this, args)
        }
    }
}
```

## 防抖 debounce

防抖函数指的是某个函数在某段时间内，无论触发了多少次回调，**都只执行最后一次**。假如我们设置了一个等待时间 3 秒的函数，在这 3 秒内如果遇到函数调用请求就重新计时 3 秒，直至新的 3 秒内没有函数调用请求，此时执行函数，不然就以此类推重新计时。

```js
function debounce(fn, interval) {
    let timer = null;
    return function (...args) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, interval);
    }
}
```

## 加强版 throttle
现在考虑一种情况，如果用户的操作非常频繁，不等设置的延迟时间结束就进行下次操作，会频繁的清除计时器并重新生成，所以函数 fn 一直都没办法执行，导致用户操作迟迟得不到响应。

有一种思想是将「节流」和「防抖」合二为一，变成加强版的节流函数，关键点在于「 interval 时间内，可以重新生成定时器，但只要 interval 的时间到了，必须给用户一个响应」。这种合体思路恰好可以解决上面提出的问题。

```js
function throttle(fn, interval) {
	let last = 0, timer = null;
	return function (...args) {
		let now = +new Date();
		if(now - last < interval){
			if(timer) clearTimeout(timer);
			timer = setTimeout(() => {
				last = now;
				fn.apply(this, args);
			}, interval);
		} else {
			// 这个时候表示时间到了，必须给响应
			last = now;
			fn.apply(this, args);
		}
	}
}
```

