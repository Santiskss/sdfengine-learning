const UserRepository = require('../../domain/user/User.repository');
const User = require('../../domain/user/User.model');

class UserMemoryRepository extends UserRepository {
  /** Initializes an empty in-memory store. */
  constructor() {
    super();
    this.users = [];
    this.currentId = 1;
  }

  /** @returns {Promise<User[]>} */
  async findAll() {
    return this.users.map(u => new User(u));
  }

  /**
   * @param {number} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    const userData = this.users.find(u => u.id === id);
    return userData ? new User(userData) : null;
  }

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  async create(user) {
    const userData = {
      ...user.toJSON(),
      id: this.currentId++
    };
    this.users.push(userData);
    return new User(userData);
  }

  /**
   * @param {number} id
   * @param {Partial<User>} userData
   * @returns {Promise<User>}
   * @throws {Error} If the user does not exist.
   */
  async update(id, userData) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    this.users[index] = { ...this.users[index], ...userData };
    return new User(this.users[index]);
  }

  /**
   * @param {number} id
   * @returns {Promise<boolean>}
   * @throws {Error} If the user does not exist.
   */
  async delete(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    this.users.splice(index, 1);
    return true;
  }
}

module.exports = UserMemoryRepository;
