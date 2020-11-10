class Scheduler {
    constructor() {
        this.queue = [];
        this.maxLimit = 2;
        this.runCounts = 0;
    }
    add(promiseCreator) {
        this.queue.push(promiseCreator)
    }
    taskStart() {
        for (let i = 0; i < this.maxLimit; i++) {
            this.request()
        }
    }
    request() {
        // 保证每次限定请求数量 & 处理边界
        if (!this.queue || !this.queue.length || this.runCounts >= this.maxLimit) {
            console.log('当前执行数量：', this.runCounts)
            return
        }
        this.runCounts++
        /**
         * 删除队列最后一个方法，并执行
         * 执行结束后，重新执行此方法
         */
        this.queue.shift()().then(() => {
            this.runCounts--
            this.request()
        })
        console.log('当前执行数量：', this.runCounts)
    }
}

const scheduler = new Scheduler()

const timeout = (time) => new Promise(resolve => setTimeout(resolve, time))

const addTask = (time, value) => {
    scheduler.add(() => {
        return timeout(time).then(() => {
            console.log(value)
        })
    })
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
addTask(3000, '5');
addTask(2000, '6');
addTask(2000, '7');
addTask(1000, '8');
addTask(800, '9');
addTask(1000, '10');

scheduler.taskStart()


const urls = [
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2580986389,1527418707&fm=27&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1995874357,4132437942&fm=27&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2640393967,721831803&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1548525155,1032715394&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2434600655,2612296260&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2160840192,133594931&fm=27&gp=0.jpg'
]

function sendRequest (urls, max, callback) {
    const len = urls.length;                // 请求总数
    let currentIdx = Math.min(max, len);    // 并行限制数
    let counter = 0;                        // 已完成请求数

    function _done() {
        counter++
        if (len === counter) {              // 请求结束，执行回调
            return callback()
        }
        if (currentIdx < len) {             // 进入下一个请求 
            _fetch(urls[currentIdx++])
        }
    }
    function _fetch(url) {
        fetch(url).finally(() => {
            _done()
        })
    }
    for (let i = 0; i < currentIdx; i++) {  // 默认执行请求
        _fetch(urls[i])
    }
}

// sendRequest(urls, 2, () => {
//     console.log('请求回调')
// })



