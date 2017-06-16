const errors = require('root/src/models/errors');

const taskService = (db) => {
    const Task = db.model('Task');

    const findAll = (userId) => {
        return Task.find({
            userId
        }).exec();
    };

    const create = (task) => {
        const taskEntity = new Task({
            userId: task.userId,
            title: task.title,
            isDone: false
        });

        return taskEntity.save()
            .then((savedTask) => {
                if (!savedTask) {
                    throw new errors.CreateFailedError('Task did not create.');
                }

                return savedTask;
            });
    };

    const updateStatus = (task) => {
        return Task.findOne({
                id: task.id
            }).exec()
            .then((taskEntity) => {
                if (!taskEntity) {
                    throw new errors.NotExistsError(`Task with id ${task.is} not found.`);
                }

                taskEntity.isDone = task.isDone;

                return taskEntity.save()
                    .then((savedTask) => {
                        if (!savedTask) {
                            throw new errors.UpdateFailedError('Task did not updated.');
                        }

                        return savedTask;
                    });;
            });
    };

    const findById = (taskId) => {
        return Task.findOne({
                id: taskId
            }).exec()
            .then((taskEntity) => {
                if (!taskEntity) {
                    throw new errors.NotExistsError(`Task with id ${taskId} did not found.`);
                }

                return taskEntity;
            });
    };

    const remove = (taskId) => {
        return findById(taskId)
            .then(taskEntity => taskEntity.remove().exec());
    }

    const publicInterface = {
        findAll,
        create,
        updateStatus,
        findById,
        remove
    };

    return publicInterface;
}

module.exports = taskService;