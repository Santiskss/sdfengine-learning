const User = require('../../domain/entities/User.entity');

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

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

    const createdUser = await this.userRepository.create(user);
    console.log(`✅ User created: ${createdUser.getDisplayName()}`);
    return createdUser;
  }
}

module.exports = CreateUserUseCase;