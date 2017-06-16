var crypto = require('crypto');

const cryptoService = () => {

    const hashPassword = userpassword => {
        var salt = genRandomString(16);
        var passwordData = sha512(userpassword, salt);

        return passwordData;
    }

    const checkPassword = (plainPassword, salt, encryptedPassword) => {
        return sha512(plainPassword, salt).passwordHash == encryptedPassword;
    }

    const sha512 = function (password, salt) {
        var hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        var value = hash.digest('hex');
        
        return {
            salt: salt,
            passwordHash: value
        };
    };

    const genRandomString = function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    };

    const publicInterface = {
        hashPassword,
        checkPassword
    }

    return publicInterface;
}

module.exports = cryptoService;