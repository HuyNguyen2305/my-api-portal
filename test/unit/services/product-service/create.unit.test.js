import { jest } from '@jest/globals';

const { ProductService } = await import('#services/product.service');

describe('ProductService.create', () => {
  it('creates a product via the repository', async () => {
    const payload = { name: 'Gadget', price: 19.99, sku: 'GAD-1', stock: 3 };
    const created = { id: 1, ...payload };
    const productRepository = { create: jest.fn().mockResolvedValue(created) };
    const service = Object.create(ProductService.prototype);
    service.productRepository = productRepository;

    const result = await service.create(payload);

    expect(productRepository.create).toHaveBeenCalledWith(payload);
    expect(result).toBe(created);
  });
});
