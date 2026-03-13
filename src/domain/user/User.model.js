class User {
  /**
   * @param {object} params
   * @param {number|null} params.id
   * @param {string} params.name
   * @param {string} params.email
   * @param {Date} [params.createdAt]
   */
  constructor({ id, name, email, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt || new Date();
  }

  /** @returns {boolean} */
  isValid() {
    return (
      this.name &&
      this.email &&
      this.email.includes('@')
    );
  }

  /** @returns {string} */
  getDisplayName() {
    return `${this.name} (${this.email})`;
  }

  /** @returns {{ id: number|null, name: string, email: string, createdAt: Date }} */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
