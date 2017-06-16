const path = require('path');
const appRoot = require('app-root-path');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const errors = require('root/src/models/errors');

const cerParh = path.join(appRoot.path, './configs/certificates/private.key');

const authenticationService = () => {

    const cer = fs.readFileSync(cerParh);

    const createToken = (user) => {
        const token = jwt.sign(user, cer, {
            expiresIn: 24 * 60 * 60
        });

        return token;
    }

    const verifyToken = (token) =>
        new Promise((resolve, reject) => {
            jwt.verify(token, cer, (err, decoded) => {
                if (err) {
                    reject(new errors.UnauthorizedError(err));
                } else {
                    resolve(decoded);
                }
            })
        });

    const publicInterface = {
        createToken,
        verifyToken
    }

    return publicInterface;
}

module.exports = authenticationService;