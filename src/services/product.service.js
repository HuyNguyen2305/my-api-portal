import { NotFoundError } from '#configs/error';

export class ProductService {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  getAll() {
    return this.productRepository.get();
  }

  async getById(id) {
    const product = await this.productRepository.getOne({ id });
    if (!product) throw new NotFoundError('Product not found');
    return product;
  }

  create(data) {
    return this.productRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return this.productRepository.update({ id }, data);
  }

  async remove(id) {
    await this.getById(id);
    return this.productRepository.delete({ id });
  }
}
