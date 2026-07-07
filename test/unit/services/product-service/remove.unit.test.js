import { jest } from '@jest/globals';

const { ProductService } = await import('#services/product.service');

describe('ProductService.remove', () => {
  it('removes an existing product', async () => {
    const existing = { id: 1, name: 'Widget', sku: 'WID-1', stock: 10 };
    const productRepository = {
      getOne: jest.fn().mockResolvedValue(existing),
      delete: jest.fn().mockResolvedValue(1)
    };
    const service = Object.create(ProductService.prototype);
    service.productRepository = productRepository;

    const result = await service.remove(1);

    expect(productRepository.delete).toHaveBeenCalledWith({ id: 1 });
    expect(result).toBe(1);
  });

  it('throws NotFoundError when the product does not exist', async () => {
    const productRepository = {
      getOne: jest.fn().mockResolvedValue(null),
      delete: jest.fn()
    };
    const service = Object.create(ProductService.prototype);
    service.productRepository = productRepository;

    await expect(service.remove(999)).rejects.toThrow('Product not found');
    expect(productRepository.delete).not.toHaveBeenCalled();
  });
});
