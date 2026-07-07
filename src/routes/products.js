const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  listProductsSchema,
  deleteProductSchema
} = require('../schemas/productSchema');

async function productRoutes(fastify) {
  fastify.get('/products', { schema: listProductsSchema }, async (req) => {
    const { productService } = req.diScope.cradle;
    return productService.getAll();
  });

  fastify.get('/products/:id', { schema: getProductSchema }, async (req, reply) => {
    const { productService } = req.diScope.cradle;
    const product = await productService.getById(req.params.id);
    if (!product) return reply.code(404).send({ message: 'Product not found' });
    return product;
  });

  fastify.post('/products', { schema: createProductSchema }, async (req, reply) => {
    const { productService } = req.diScope.cradle;
    const [created] = await productService.create(req.body);
    return reply.code(201).send(created);
  });

  fastify.put('/products/:id', { schema: updateProductSchema }, async (req, reply) => {
    const { productService } = req.diScope.cradle;
    const [updated] = await productService.update(req.params.id, req.body);
    if (!updated) return reply.code(404).send({ message: 'Product not found' });
    return updated;
  });

  fastify.delete('/products/:id', { schema: deleteProductSchema }, async (req, reply) => {
    const { productService } = req.diScope.cradle;
    const deletedCount = await productService.remove(req.params.id);
    if (!deletedCount) return reply.code(404).send({ message: 'Product not found' });
    return reply.code(204).send();
  });
}

module.exports = productRoutes;
