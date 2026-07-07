import { jest } from '@jest/globals';

const { ProductService } = await import('#services/product.service');

describe('ProductService.getById', () => {
  it('returns the product when found', async () => {
    const product = { id: 1, name: 'Widget', sku: 'WID-1' };
    const productRepository = { getOne: jest.fn().mockResolvedValue(product) };
    const service = Object.create(ProductService.prototype);
    service.productRepository = productRepository;

    const result = await service.getById(1);

    expect(productRepository.getOne).toHaveBeenCalledWith({ id: 1 });
    expect(result).toBe(product);
  });

  it('throws NotFoundError when the product is missing', async () => {
    const productRepository = { getOne: jest.fn().mockResolvedValue(null) };
    const service = Object.create(ProductService.prototype);
    service.productRepository = productRepository;

    await expect(service.getById(999)).rejects.toThrow('Product not found');
  });
});
