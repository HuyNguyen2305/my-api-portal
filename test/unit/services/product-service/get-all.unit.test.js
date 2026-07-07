import { jest } from '@jest/globals';

const { ProductService } = await import('#services/product.service');

describe('ProductService.getAll', () => {
  it('returns all products from the repository', async () => {
    const products = [{ id: 1, name: 'Widget', sku: 'WID-1' }];
    const productRepository = { get: jest.fn().mockResolvedValue(products) };
    const service = Object.create(ProductService.prototype);
    service.productRepository = productRepository;

    const result = await service.getAll();

    expect(productRepository.get).toHaveBeenCalledWith();
    expect(result).toBe(products);
  });
});
