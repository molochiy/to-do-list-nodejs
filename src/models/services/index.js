const authenticationServiceModule = require('./authentication-service');
const accountServiceModule = require('./account-service');
const cryptoServiceModule = require('./crypto-service');
const taskServiceModule = require('./task-service');

const services = (db) => {
    const authenticationService = authenticationServiceModule();
    const cryptoService = cryptoServiceModule();
    const accountService = accountServiceModule(db, cryptoService, authenticationService);
    const taskService = taskServiceModule(db);

    const publicInterface = {
        authenticationService,
        accountService,
        taskService
    };

    return publicInterface;
}

module.exports = services;