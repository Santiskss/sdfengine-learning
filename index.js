const Config = require('./config');

console.log('='.repeat(60));
console.log(`🚀 ${Config.app.name} v${Config.app.version}`);
console.log('='.repeat(60));
console.log('');

const main = async () => {
  try {
    console.log('🔍 Validating environment variables...');
    Config.validate();
    console.log('');
    
    Config.display();
    console.log('');

    console.log('--- Ejemplo 1: Usar configuración de app ---');
    console.log(`Running in ${Config.app.env} mode`);
    console.log(`Server would start on port ${Config.app.port}`);
    console.log('');

    console.log('--- Ejemplo 2: Usar configuración de base de datos ---');
    const db = Config.database;
    console.log(`Database connection string: postgresql://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`);
    console.log('');

    console.log('--- Ejemplo 3: Usar feature flags ---');
    if (Config.features.logging) {
      console.log('📝 Logging is ENABLED');
    } else {
      console.log('📝 Logging is DISABLED');
    }

    if (Config.features.debug) {
      console.log('🐛 Debug mode is ENABLED');
      console.log('Debug info: API timeout =', Config.api.timeout, 'ms');
    }
    console.log('');

    console.log('--- Ejemplo 4: Configuración condicional por entorno ---');
    switch (Config.app.env) {
      case 'development':
        console.log('🔧 Development mode: Using local database');
        console.log('🔧 Debug tools enabled');
        break;
      case 'production':
        console.log('🚀 Production mode: Using production database');
        console.log('🚀 Performance optimizations enabled');
        break;
      case 'test':
        console.log('🧪 Test mode: Using test database');
        console.log('🧪 Mocking external services');
        break;
      default:
        console.log('⚠️ Unknown environment');
    }

    console.log('');
    console.log('='.repeat(60));
    console.log('✅ Configuration loaded successfully');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('');
    console.error('❌ Configuration Error:', error.message);
    console.error('');
    console.error('💡 Tip: Make sure you have a .env file with all required variables.');
    console.error('💡 Check .env.example for reference.');
    process.exit(1);
  }
};

main();