export class ProductController {
  constructor({ productService }) {
    this.productService = productService;
  }

  list() {
    return this.productService.getAll();
  }

  getById(request) {
    return this.productService.getById(request.params.id);
  }

  async create(request, reply) {
    const product = await this.productService.create(request.body);
    reply.code(201);
    return product;
  }

  update(request) {
    return this.productService.update(request.params.id, request.body);
  }

  async remove(request, reply) {
    await this.productService.remove(request.params.id);
    reply.code(204);
  }
}
