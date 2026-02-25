class User {
    constructor({ id, name, email, createdAt }) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.createdAt = createdAt || new Date();
    }
  
    isValid() {
      return (
        this.name && 
        this.email && 
        this.email.includes('@')
      );
    }
  
    getDisplayName() {
      return `${this.name} (${this.email})`;
    }
  
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