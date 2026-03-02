// 1. Importamos la conexión a la DB (Infraestructura)
const db = require('./src/infrastructure/database/models/index.js'); 

// 2. Importamos el Repositorio de Postgres (Adaptador de Infraestructura)
const UserPostgresRepository = require('./src/infrastructure/database/repositories/UserPostgres.repository.js');

// 3. Importamos el Caso de Uso (Aplicación)
const CreateUserUseCase = require('./src/application/useCases/CreateUser.useCase.js');

async function comprobarFuncionamiento() {
  try {
    // PASO A: Autenticar con PostgreSQL (Docker debe estar levantado)
    await db.sequelize.authenticate();
    console.log('✅ Conexión con PostgreSQL: OK');

    // PASO B: Instanciar el repositorio
    const userRepository = new UserPostgresRepository();

    // PASO C: Instanciar el caso de uso inyectando el repositorio
    const createUserUseCase = new CreateUserUseCase(userRepository);

    // PASO D: Ejecutar el flujo
    console.log('⏳ Intentando guardar un usuario...');
    const datosEntrada = { name: "Santiago Test", email: "santiago@test.com" };
    
    const usuarioCreado = await createUserUseCase.execute(datosEntrada);

    // PASO E: Verificar el resultado
    console.log('🚀 ¡Éxito! Usuario devuelto por el sistema:', usuarioCreado);
    console.log('¿Es una entidad pura?:', usuarioCreado.constructor.name === 'User' ? 'SÍ' : 'NO');

  } catch (error) {
    console.error('❌ Error en la comprobación:', error.message);
  }
}

comprobarFuncionamiento();