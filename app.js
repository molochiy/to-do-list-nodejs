const app = require('express')();
const server = require('http').createServer(app);
const middleware = require('root/src/middleware');
const sl = require('root/src/service-locator');

const appConfig = sl.configProvider.getConfig('app-config');

middleware.configureBodyParser(app);
middleware.configureAuthentication(app, sl);
middleware.configureRoutes(app, sl);
middleware.configureHandler(app, sl);

server.listen(appConfig.server.port, () => {
    console.log(`ToDo app listening on port ${appConfig.server.port}!`);
});