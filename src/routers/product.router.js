import { diContainer } from '@fastify/awilix';
import { CONTROLLER_KEYS } from '#constants/singleton';
import { passportPlugin } from '#src/common/middleware/passport';
import {
  listProductsSchema,
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema
} from '#schemas/product.schema';

const authenticate = passportPlugin.authenticate('access-token', { session: false, authInfo: false });

class ProductRouter {
  constructor(fastify) {
    this.fastify = fastify;
    this.productController = diContainer.resolve(CONTROLLER_KEYS.PRODUCT);
  }

  register() {
    this.fastify.get('/products', {
      config: { responseFormat: 'standard' },
      schema: listProductsSchema,
      preValidation: [authenticate],
      handler: (request, reply) => this.productController.list(request, reply)
    });

    this.fastify.get('/products/:id', {
      config: { responseFormat: 'standard' },
      schema: getProductSchema,
      preValidation: [authenticate],
      handler: (request, reply) => this.productController.getById(request, reply)
    });

    this.fastify.post('/products', {
      config: { responseFormat: 'standard' },
      schema: createProductSchema,
      preValidation: [authenticate],
      handler: (request, reply) => this.productController.create(request, reply)
    });

    this.fastify.put('/products/:id', {
      config: { responseFormat: 'standard' },
      schema: updateProductSchema,
      preValidation: [authenticate],
      handler: (request, reply) => this.productController.update(request, reply)
    });

    this.fastify.delete('/products/:id', {
      config: { responseFormat: 'standard' },
      schema: deleteProductSchema,
      preValidation: [authenticate],
      handler: (request, reply) => this.productController.remove(request, reply)
    });
  }
}

export default async function productRouter(fastify) {
  new ProductRouter(fastify).register();
}
