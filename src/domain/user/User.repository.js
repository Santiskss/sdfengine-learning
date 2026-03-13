const User = require("./User.model");

class UserRepository {
    async findAll() {
      throw new Error('Method findAll() must be implemented');
    }
  
    async findById(id) {
      throw new Error('Method findById() must be implemented');
    }
  
    /**
     * 
     * @param {User} user
     * @return {User}
     */

    async create(user) {
      throw new Error('Method create() must be implemented');
    }
  
    async update(id, userData) {
      throw new Error('Method update() must be implemented');
    }
  
    async delete(id) {
      throw new Error('Method delete() must be implemented');
    }
  }
  
  module.exports = UserRepositoryInterface;