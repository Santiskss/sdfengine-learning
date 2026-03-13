class CreateUserDto {
  /**
   * @param {object} params
   * @param {string} params.name
   * @param {string} params.email
   */
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }

  /**
   * Validates the input data before it reaches the domain.
   * @throws {Error} If name is missing or email format is invalid.
   */
  validate() {
    if (!this.name?.trim()) {
      throw new Error('name is required');
    }

    if (!this.email?.trim() || !this.email.includes('@')) {
      throw new Error('a valid email is required');
    }
  }
}

module.exports = CreateUserDto;
