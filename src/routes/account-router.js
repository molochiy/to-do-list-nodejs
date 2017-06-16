const express = require('express');

const accountRouter = (accountService) => {
    const router = express.Router({
        mergeParams: true
    });

    router.route('/login')
        .post((req, res, next) => {
            const user = req.body.user;

            accountService.login(user)
                .then(token => res.status(200).json({
                    token
                }))
                .catch(next)
        });

    router.route('/register')
        .post((req, res, next) => {
            const user = req.body.user;

            accountService.create(user)
                .then(userEntity => res.status(200).json({
                    userEntity
                }))
                .catch(next)
        });

    return router;
}

module.exports = accountRouter;