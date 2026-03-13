const UserRepository = require('../../domain/user/User.repository.js');
const UserMapper = require('../adapters/postgre/mappers/User.mapper.js');
const { User: UserModel } = require('../adapters/postgre/models/index.js');

class UserPostgresRepository extends UserRepository {
  /**
   * @param {import('../../domain/user/User.model')} user
   * @returns {Promise<import('../../domain/user/User.model')>}
   */
  async create(user) {
    const userData = UserMapper.toDatabase(user);
    const createdUser = await UserModel.create(userData);
    return UserMapper.toEntity(createdUser);
  }

  /** @returns {Promise<import('../../domain/user/User.model')[]>} */
  async findAll() {
    const users = await UserModel.findAll();
    return users.map(user => UserMapper.toEntity(user));
  }
}

module.exports = UserPostgresRepository;
