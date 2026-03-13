const User = require("./User.model");

class UserRepository {
  /** @returns {Promise<User[]>} */
  async findAll() {
    throw new Error('Method findAll() must be implemented');
  }

  /**
   * @param {number|string} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  async create(user) {
    throw new Error('Method create() must be implemented');
  }

  /**
   * @param {number|string} id
   * @param {Partial<User>} userData
   * @returns {Promise<User>}
   */
  async update(id, userData) {
    throw new Error('Method update() must be implemented');
  }

  /**
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Method delete() must be implemented');
  }
}

module.exports = UserRepository;
