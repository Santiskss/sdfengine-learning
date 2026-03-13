const User = require('../../../domain/user/User.model.js');

class UserMapper {
  /**
   * Maps a Sequelize record to a domain User entity.
   * @param {{ id: number, name: string, email: string }} record
   * @returns {User}
   */
  static toEntity(record) {
    return new User({ id: record.id, name: record.name, email: record.email });
  }

  /**
   * Maps a domain User entity to a plain object suitable for database insertion.
   * @param {User} user
   * @returns {{ name: string, email: string }}
   */
  static toDatabase(user) {
    return { name: user.name, email: user.email };
  }
}

module.exports = UserMapper;
