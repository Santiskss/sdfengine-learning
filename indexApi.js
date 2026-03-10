require('dotenv').config();
require('dotenv').config({ path: '.env.project' });

const HttpServer = require('./src/adapters/http/server');
const OrderController = require('./src/adapters/http/controllers/Order.controller');
const CreateOrderUseCase = require('./src/useCases/order/CreateOrder.useCase');
const GetOrderUseCase = require('./src/usecases/order/GetOrder.useCase');
const { logAdapter } = require('./src/adapters/logs');

// 1. Instanciamos los Casos de Uso
const createOrderUseCase = new CreateOrderUseCase({ logAdapter });
const getOrderUseCase = new GetOrderUseCase({ logAdapter });

// 2. Instanciamos el Controlador inyectando los Casos de Uso
const orderController = new OrderController({
  createOrderUseCase,
  getOrderUseCase,
  logAdapter,
});

// 3. Instanciamos el Servidor inyectando el Controlador
const server = new HttpServer({ orderController });

// 4. Arrancamos el servidor
const port = process.env.PORT || 3000;
server.listen(port);