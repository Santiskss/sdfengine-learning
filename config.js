require('dotenv').config();

class Config {
  static get app() {
    return {
      name: process.env.APP_NAME || 'SDFEngine Learning',
      version: process.env.APP_VERSION || '1.0.0',
      env: process.env.NODE_ENV || 'development',
      port: parseInt(process.env.PORT) || 3000
    };
  }

  static get database() {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_DATABASE || 'sdfengine_learning'
    };
  }

  static get api() {
    return {
      timeout: parseInt(process.env.API_TIMEOUT) || 5000,
      maxRetries: parseInt(process.env.API_MAX_RETRIES) || 3
    };
  }

  static get features() {
    return {
      logging: process.env.ENABLE_LOGGING === 'true',
      debug: process.env.ENABLE_DEBUG === 'true'
    };
  }

  static get external() {
    return {
      apiUrl: process.env.EXTERNAL_API_URL || '',
      apiKey: process.env.EXTERNAL_API_KEY || ''
    };
  }

  static validate() {
    const required = [
      'DB_HOST',
      'DB_PORT',
      'DB_USER',
      'DB_PASSWORD',
      'DB_DATABASE'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    console.log('✅ All required environment variables are set');
  }

  static display() {
    console.log('📋 Current Configuration:');
    console.log('  App Name:', this.app.name);
    console.log('  Version:', this.app.version);
    console.log('  Environment:', this.app.env);
    console.log('  Port:', this.app.port);
    console.log('  Database Host:', this.database.host);
    console.log('  Database Port:', this.database.port);
    console.log('  Database Name:', this.database.database);
    console.log('  API Timeout:', this.api.timeout, 'ms');
    console.log('  API Max Retries:', this.api.maxRetries);
    console.log('  Logging Enabled:', this.features.logging);
    console.log('  Debug Enabled:', this.features.debug);
  }
}

module.exports = Config;