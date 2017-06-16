const express = require('express');
const errors = require('root/src/models/errors');
const Task = require('root/src/models/dto/').Task;

const taskRouter = (taskService) => {
    const router = express.Router({
        mergeParams: true
    });

    router.route('/tasks')
        .get((req, res, next) => {
            taskService
                .findAll(req.user.id)
                .then(tasks => res.status(200).json(tasks.map(t => new Task(t))))
                .catch(err => next(err));
        });

    router.route('/tasks/:taskId')
        .get((req, res, next) => {
            const taskId = req.params.taskId;

            taskService.findById(taskId)
                .then(taskEntity => res.status(200).json(new Task(taskEntity)))
                .catch(err => next(err));
        })
        .patch((req, res, next) => {
            const taskId = req.params.taskId;
            const task = req.body.task;
            task.userId = req.user.id;
            task.id = taskId;

            taskService
                .updateStatus(task)
                .then(taskEntity => res.status(200).json(new Task(taskEntity)))
                .catch(err => next(err));
        })
        .delete((req, res, next) => {
            const taskId = req.params.taskId;

            taskService
                .remove(taskId)
                .then(() => res.status(204).end())
                .catch(err => next(err));
        });

    router.route('/task')
        .post((req, res, next) => {
            const task = req.body.task;
            task.userId = req.user.id;

            taskService
                .create(task)
                .then(taskEntity => res.status(201).json(new Task(taskEntity)))
                .catch(err => next(err));
        })

    return router;
}

module.exports = taskRouter;