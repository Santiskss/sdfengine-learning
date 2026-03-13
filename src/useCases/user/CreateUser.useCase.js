const User = require('../../domain/user/User.model');
const UserRepository = require('../../domain/user/User.repository');
const { create } = require('../../infrastructure/adapters/postgre/models/order/Order.database.model');

class CreateUserUseCase {

  /**
   * 
   * @param {UserRepository} userRepository 
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }


  /**
   * 
   * @param {string} name
   * @param  {string} email
   * @returns {User}
   */
  async execute({ name, email }) {
     const user = new User({
      id: null,
      name,
      email,
      createdAt: new Date()
    });

    if (!user.isValid()) {
      throw new Error('Invalid user data: name and valid email are required');
    }

    return this.userRepository.create(user);
  }
}

module.exports = CreateUserUseCase;