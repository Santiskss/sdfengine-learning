const { Sequelize } = require('sequelize');
const Config = require('../config');

class DatabaseConnection {
  constructor() {
    const dbConfig = Config.database;
    this.sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.user,
      dbConfig.password,
      {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'postgres',
        logging: Config.features.debug ? console.log : false,
        define: {
          timestamps: true,
          underscored: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        },
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Database connection established successfully');
      return true;
    } catch (error) {
      console.error('❌ Unable to connect to database:', error.message);
      return false;
    }
  }

  async sync(options = {}) {
    try {
      await this.sequelize.sync(options);
      const action = options.force ? 'recreated' : options.alter ? 'altered' : 'synchronized';
      console.log(`✅ Database ${action} successfully`);
    } catch (error) {
      console.error('❌ Error synchronizing database:', error.message);
      throw error;
    }
  }

  async close() {
    try {
      await this.sequelize.close();
      console.log('✅ Database connection closed');
    } catch (error) {
      console.error('❌ Error closing database connection:', error.message);
    }
  }

  getSequelize() {
    return this.sequelize;
  }
}

const databaseConnection = new DatabaseConnection();
module.exports = databaseConnection;