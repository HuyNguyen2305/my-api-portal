import { diContainer } from '@fastify/awilix';
import { CONTROLLER_KEYS } from '#constants/singleton';
import {
  listProductsSchema,
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema
} from '#schemas/product.schema';

class ProductRouter {
  constructor(fastify) {
    this.fastify = fastify;
    this.productController = diContainer.resolve(CONTROLLER_KEYS.PRODUCT);
  }

  register() {
    this.fastify.get('/products', {
      config: { responseFormat: 'standard' },
      schema: listProductsSchema,
      handler: (request, reply) => this.productController.list(request, reply)
    });

    this.fastify.get('/products/:id', {
      config: { responseFormat: 'standard' },
      schema: getProductSchema,
      handler: (request, reply) => this.productController.getById(request, reply)
    });

    this.fastify.post('/products', {
      config: { responseFormat: 'standard' },
      schema: createProductSchema,
      handler: (request, reply) => this.productController.create(request, reply)
    });

    this.fastify.put('/products/:id', {
      config: { responseFormat: 'standard' },
      schema: updateProductSchema,
      handler: (request, reply) => this.productController.update(request, reply)
    });

    this.fastify.delete('/products/:id', {
      config: { responseFormat: 'standard' },
      schema: deleteProductSchema,
      handler: (request, reply) => this.productController.remove(request, reply)
    });
  }
}

export default async function productRouter(fastify) {
  new ProductRouter(fastify).register();
}
