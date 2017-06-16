const errors = require('root/src/models/errors');
const dto = require('root/src/models/dto/');

const accountService = (db, cryptoService, authenticationService) => {
    const User = db.model('User');

    const create = (user) => {
        const paswordData = cryptoService.hashPassword(user.password);

        const userEntity = new User({
            username: user.username,
            password: paswordData.passwordHash,
            email: user.email,
            salt: paswordData.salt
        });

        return userEntity.save()
            .then((savedUser) => {
                if (!savedUser) {
                    throw new errors.CreateFailedError('User did not create.');
                }

                return savedUser;
            });
    };

    const findAll = () => {
        return User.find({}).exec();
    };

    const getByEmail = (email) => {
        return User.findOne({
                email
            }).exec()
            .then((user) => {
                if (!user) {
                    throw new errors.NotExistsError(`User with email ${email} did not found.`);
                }

                return user;
            });
    };

    const validate = (user) => {
        return getByEmail(user.email)
            .then(userEntity => {
                if (!cryptoService.checkPassword(user.password, userEntity.salt, userEntity.password)) {
                    throw new errors.BadRequestError('User\'s credentials is wrong.');
                }

                return userEntity;
            });
    };

    const login = user => {
        return validate(user)
            .then(userEntity => authenticationService.createToken(new dto.User(userEntity)));
    };

    const publicInterface = {
        create,
        validate,
        findAll,
        getByEmail,
        login
    };
    
    return publicInterface;
}

module.exports = accountService;