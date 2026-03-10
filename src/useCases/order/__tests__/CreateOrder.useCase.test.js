// 1. Definimos el objeto mock con el prefijo correcto
const mockOrderRepository = {
    createWithItems: jest.fn(),
  };
  
  // 2. Registramos el mock en Jest
  jest.mock('../../../repositories', () => ({
    orderRepository: mockOrderRepository,
  }));
  
  // 3. AHORA importamos el Use Case
  const CreateOrderUseCase = require('../CreateOrder.useCase');
  
  const logAdapterStub = {
    getInstance: () => ({
      log: jest.fn(),
      error: jest.fn(),
    }),
  };
  
  describe('CreateOrderUseCase', () => {
    let useCase;
  
    beforeEach(() => {
      jest.clearAllMocks();
      useCase = new CreateOrderUseCase({ logAdapter: logAdapterStub });
    });
  
    it('creates order successfully', async () => {
      mockOrderRepository.createWithItems.mockResolvedValue({
        id: 1,
        customerId: 1,
        totalAmount: 21,
        status: 'pending',
        items: [{ id: 1, productId: 1, quantity: 2, unitPrice: 10.5 }],
      });
  
      const result = await useCase.invoke({
        customerId: 1,
        items: [{ productId: 1, quantity: 2, unitPrice: 10.5 }],
      });
  
      expect(mockOrderRepository.createWithItems).toHaveBeenCalledTimes(1);
      expect(result.id).toBe(1);
    });
  
    it('throws when items array is empty', async () => {
      await expect(
        useCase.invoke({ customerId: 1, items: [] })
      ).rejects.toThrow('Order must have at least one item');
    });
  
    it('throws when an item has quantity 0', async () => {
      await expect(
        useCase.invoke({
          customerId: 1,
          items: [{ productId: 1, quantity: 0, unitPrice: 10 }],
        })
      ).rejects.toThrow();
    });
  });