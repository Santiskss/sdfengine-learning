const CreateUserUseCase = require('./src/application/useCases/CreateUser.useCase');
const UserMemoryRepository = require('./src/infrastructure/adapters/UserMemory.repository');

console.log('='.repeat(60));
console.log('🚀 SDFEngine Learning - Arquitectura Hexagonal');
console.log('='.repeat(60));
console.log('');

const main = async () => {
  console.log('📦 Inicializando repositorio en memoria...');
  const userRepository = new UserMemoryRepository();

  console.log('🔧 Creando caso de uso...');
  const createUserUseCase = new CreateUserUseCase(userRepository);

  console.log('');
  console.log('--- Caso de Uso 1: Crear usuario válido ---');
  try {
    const user1 = await createUserUseCase.execute({
      name: 'Juan Pérez',
      email: 'juan@example.com'
    });
    console.log('Resultado:', user1.toJSON());
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('');
  console.log('--- Caso de Uso 2: Crear usuario inválido ---');
  try {
    const user2 = await createUserUseCase.execute({
      name: 'María García',
      email: 'email-invalido'
    });
    console.log('Resultado:', user2.toJSON());
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('');
  console.log('--- Listar todos los usuarios ---');
  const allUsers = await userRepository.findAll();
  console.log(`Total de usuarios: ${allUsers.length}`);
  allUsers.forEach(user => {
    console.log(` - ${user.getDisplayName()}`);
  });

  console.log('');
  console.log('='.repeat(60));
  console.log('✅ Demostración completada');
  console.log('='.repeat(60));
};

main().catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});