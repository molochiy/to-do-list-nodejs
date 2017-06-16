const sl = {};

const root = require('app-root-path').path;
sl.configProvider = require('root/src/models/config-provider')(`${root}/configs`);

const dbConfig = sl.configProvider.getConfig('db-config');
sl.db = require('root/src/models/db/db-builder')(dbConfig);

sl.globalErrorHandler = require('root/src/handlers/global-error-handler')();

const services = require('root/src/models/services')(sl.db);

sl.services = services;

const routes = require('root/src/routes')(sl.services);

sl.routes = routes;

module.exports = sl;