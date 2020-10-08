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
        if (!this.queue || !this.queue.length || this.runCounts >= this.maxLimit) {
            console.log('当前执行数量：', this.runCounts)
            return
        }
        this.runCounts++
        this.queue.shift()().then(() => {
            this.runCounts--
            this.request()
        })
        console.log('当前执行数量：', this.runCounts)
    }
}

const scheduler = new Scheduler()

const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})

const addTask = (time, value) => {
    scheduler.add(() => timeout(time).then(() => console.log(value)))
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
