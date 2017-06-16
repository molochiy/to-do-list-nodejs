const errors = require('root/src/models/errors');

const handleRequest = (authenticationService) =>
    (req, res, next) => {
        var token = req.body.token || req.query.token || req.headers['authorization'];

        if (token) {
            authenticationService.verifyToken(token)
            .then(decodedUser => {
                req.user = decodedUser;
                next();
            })
            .catch(next);
        } else {
            next(new errors.UnauthorizedError('Authorization failed. Token not found.'));
        }
    };

const configureAuthentication = (app, sl) => {
    app.use('/api/', sl.routes.accountRouter);
    app.use('/api/', handleRequest(sl.services.authenticationService))
}

module.exports = configureAuthentication;