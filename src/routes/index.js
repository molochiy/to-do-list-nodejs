const accountRouter = require('./account-router');
const taskRouter = require('./task-router');

module.exports = (services) => ({
    accountRouter: accountRouter(services.accountService),
    taskRouter: taskRouter(services.taskService)
})