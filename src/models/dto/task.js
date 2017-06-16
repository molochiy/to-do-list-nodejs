class Task {
    constructor(task) {
        this.id = task.id;
        this.userId = task.userId;
        this.title = task.title;
        this.isDone = task.isDone;
    }
}

module.exports = Task;