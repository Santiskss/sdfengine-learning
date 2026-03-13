require('dotenv').config();
require('dotenv').config({ path: '.env.project' });

const HttpServer = require('./src/adapters/http/server');
const OrderController = require('./src/adapters/http/controllers/Order.controller');
const UserController = require('./src/adapters/http/controllers/User.controller');
const CreateOrderUseCase = require('./src/useCases/order/CreateOrder.useCase');
const GetOrderUseCase = require('./src/usecases/order/GetOrder.useCase');
const CreateUserUseCase = require('./src/useCases/user/CreateUser.useCase');
const { userRepository } = require('./src/repositories');
const { logAdapter } = require('./src/adapters/logs');

const createOrderUseCase = new CreateOrderUseCase({ logAdapter });
const getOrderUseCase = new GetOrderUseCase({ logAdapter });

const createUserUseCase = new CreateUserUseCase(userRepository);

const orderController = new OrderController({
  createOrderUseCase,
  getOrderUseCase,
  logAdapter,
});

const userController = new UserController({
  createUserUseCase,
});

const server = new HttpServer({ orderController, userController });

// 4. Arrancamos el servidor
const port = process.env.PORT || 3000;
server.listen(port);