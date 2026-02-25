const models = require('../models');

class DatabaseSeeder {
  async seedUsers() {
    console.log('🌱 Seeding users...');
    const users = [
      { name: 'Juan Pérez', email: 'juan@example.com', age: 30, isActive: true },
      { name: 'María García', email: 'maria@example.com', age: 25, isActive: true },
      { name: 'Carlos López', email: 'carlos@example.com', age: 35, isActive: true },
      { name: 'Ana Martínez', email: 'ana@example.com', age: 28, isActive: false },
      { name: 'Pedro Sánchez', email: 'pedro@example.com', age: 42, isActive: true }
    ];

    for (const userData of users) {
      try {
        await models.User.create(userData);
        console.log(` ✅ Created user: ${userData.name}`);
      } catch (error) {
        console.error(` ❌ Error creating user ${userData.name}:`, error.message);
      }
    }
  }

  async seedProducts() {
    console.log('🌱 Seeding products...');
    const products = [
      {
        name: 'Laptop Dell XPS 15',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        stock: 15,
        category: 'electronics',
        isAvailable: true
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Latest Apple smartphone',
        price: 999.00,
        stock: 30,
        category: 'electronics',
        isAvailable: true
      },
      {
        name: 'Nike Air Max',
        description: 'Comfortable running shoes',
        price: 129.99,
        stock: 50,
        category: 'clothing',
        isAvailable: true
      },
      {
        name: 'Clean Code Book',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: 39.99,
        stock: 100,
        category: 'books',
        isAvailable: true
      },
      {
        name: 'Organic Coffee',
        description: 'Premium Colombian coffee beans',
        price: 24.99,
        stock: 0,
        category: 'food',
        isAvailable: false
      }
    ];

    for (const productData of products) {
      try {
        await models.Product.create(productData);
        console.log(` ✅ Created product: ${productData.name}`);
      } catch (error) {
        console.error(` ❌ Error creating product ${productData.name}:`, error.message);
      }
    }
  }

  async run() {
    console.log('');
    console.log('🌱 Starting database seeding...');
    console.log('');
    await this.seedUsers();
    console.log('');
    await this.seedProducts();
    console.log('');
    console.log('✅ Database seeding completed');
    console.log('');
  }
}

module.exports = DatabaseSeeder;