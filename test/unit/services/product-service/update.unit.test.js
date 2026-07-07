import { jest } from '@jest/globals';

const { ProductService } = await import('#services/product.service');

describe('ProductService.update', () => {
  it('updates an existing product', async () => {
    const existing = { id: 1, name: 'Widget', sku: 'WID-1', stock: 10 };
    const updated = { ...existing, stock: 25 };
    const productRepository = {
      getOne: jest.fn().mockResolvedValue(existing),
      update: jest.fn().mockResolvedValue(updated)
    };
    const service = Object.create(ProductService.prototype);
    service.productRepository = productRepository;

    const result = await service.update(1, { stock: 25 });

    expect(productRepository.update).toHaveBeenCalledWith({ id: 1 }, { stock: 25 });
    expect(result).toBe(updated);
  });

  it('throws NotFoundError when the product does not exist', async () => {
    const productRepository = {
      getOne: jest.fn().mockResolvedValue(null),
      update: jest.fn()
    };
    const service = Object.create(ProductService.prototype);
    service.productRepository = productRepository;

    await expect(service.update(999, { stock: 1 })).rejects.toThrow('Product not found');
    expect(productRepository.update).not.toHaveBeenCalled();
  });
});
