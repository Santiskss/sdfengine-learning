const User = require('../../../domain/user/User.model');
const UserRepository = require('../../../domain/user/User.repository');
const CreateUserDto = require('./dto/CreateUser.dto');

class CreateUserUseCase {
  /**
   * @param {UserRepository} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Validates input via DTO and creates a new user in the repository.
   * @param {CreateUserDto} dto
   * @returns {Promise<User>}
   * @throws {Error} If the DTO validation fails.
   */
  async execute(dto) {
    dto.validate();

    const user = new User({
      id: null,
      name: dto.name,
      email: dto.email,
      createdAt: new Date(),
    });

    return this.userRepository.create(user);
  }
}

module.exports = CreateUserUseCase;
