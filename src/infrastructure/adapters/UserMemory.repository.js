const UserRepositoryInterface = require('../../domain/repositories/UserRepository.interface');
const User = require('../../domain/entities/User.entity');

class UserMemoryRepository extends UserRepositoryInterface {
  constructor() {
    super();
    this.users = [];
    this.currentId = 1;
  }

  async findAll() {
    return this.users.map(u => new User(u));
  }

  async findById(id) {
    const userData = this.users.find(u => u.id === id);
    return userData ? new User(userData) : null;
  }

  async create(user) {
    const userData = {
      ...user.toJSON(),
      id: this.currentId++
    };
    this.users.push(userData);
    return new User(userData);
  }

  async update(id, userData) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    this.users[index] = { ...this.users[index], ...userData };
    return new User(this.users[index]);
  }

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