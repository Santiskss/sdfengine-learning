const User = require('../../../domain/user/User.model.js');

class UserMapper {
    static toEntity(user) {
        return new User({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }

    static toDatabase(user) {
        return {
            name: user.name,
            email: user.email,
        };
    }
}

module.exports = UserMapper;