const test = require('node:test');
const assert = require('node:assert');
const { createContainer, asValue, asFunction } = require('awilix');
const productService = require('../src/services/productService');

// Example: fake knex query builder that mimics the chainable API
// just enough for productService to work against in tests.
function createFakeKnex(products) {
  const table = (name) => ({
    select: async () => products,
    where: (match) => ({
      first: async () => products.find((p) => p.id === match.id),
      update: async () => {},
      del: async () => 1
    }),
    insert: () => ({
      returning: async () => [{ id: 99, ...products[0] }]
    })
  });
  return table;
}

test('productService.getAll returns products from the injected knex', async () => {
  const fakeProducts = [{ id: 1, name: 'Widget', price: 9.99, sku: 'WID-1', stock: 10 }];
  const fakeKnex = createFakeKnex(fakeProducts);

  const container = createContainer();
  container.register({
    knex: asValue(fakeKnex),
    productService: asFunction(productService).singleton()
  });

  const service = container.resolve('productService');
  const result = await service.getAll();

  assert.deepStrictEqual(result, fakeProducts);
});

test('productService.getById finds a product by id', async () => {
  const fakeProducts = [{ id: 1, name: 'Widget', price: 9.99, sku: 'WID-1', stock: 10 }];
  const fakeKnex = createFakeKnex(fakeProducts);

  const container = createContainer();
  container.register({
    knex: asValue(fakeKnex),
    productService: asFunction(productService).singleton()
  });

  const service = container.resolve('productService');
  const result = await service.getById(1);

  assert.strictEqual(result.name, 'Widget');
});
