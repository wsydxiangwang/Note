class Scheduler {
    constructor(
        maxLimit = 2
    ) {
        this.queue = [];
        this.maxLimit = maxLimit;
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
            return
        }
        this.runCounts++
        console.log('dd', this.runCounts)
        this.queue.shift()().then(() => {
            this.runCounts--
            this.request()
        })
    }
}

const scheduler = new Scheduler()

const addTask = (time, order) => {
    scheduler.add(() => {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        }).then(() => {
            console.log(order)
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
