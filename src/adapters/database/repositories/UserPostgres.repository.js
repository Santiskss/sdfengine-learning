const UserRepositoryInterface = require('../../../repositories/UserRepository.interface.js');
const UserMapper = require('../mappers/User.mapper.js');
const { User: UserModel } = require('../models/index.js');

class UserPostgresRepository extends UserRepositoryInterface {
    async create(user) {
        const userData = UserMapper.toDatabase(user);
        const createdUser = await UserModel.create(userData);
        return UserMapper.toEntity(createdUser);
    }

    async findAll() {
        const users = await UserModel.findAll();
        return users.map(user => UserMapper.toEntity(user));
    }
}

module.exports = UserPostgresRepository;