const configureAuthentication = require('./authentication');
const configureBodyParser = require('./body-parser');
const configureHandler = require('./handler');
// const configureSwagger = require('./swagger');
const configureRoutes = require('./routes');

module.exports = {
    configureAuthentication,
    configureBodyParser,
    configureHandler,
    // configureSwagger,
    configureRoutes
}