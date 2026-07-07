const assert = require('node:assert');
const { test, before, after } = require('node:test');
const { asValue } = require('awilix');
const { diContainer } = require('@fastify/awilix');
const buildApp = require('../src/app');
const createFakeKnex = require('./helpers/fakeKnex');

let app;

before(async () => {
  app = buildApp({ logger: false });
  await app.ready();
});

after(async () => {
  await app.close();
});

test('GET /products returns seeded products', async () => {
  diContainer.register({
    knex: asValue(createFakeKnex([{ id: 1, name: 'Widget', price: 9.99, sku: 'WID-1', stock: 10 }]))
  });

  const res = await app.inject({ method: 'GET', url: '/products' });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.json().length, 1);
  assert.strictEqual(res.json()[0].sku, 'WID-1');
});

test('GET /products/:id returns a product when found', async () => {
  diContainer.register({
    knex: asValue(createFakeKnex([{ id: 1, name: 'Widget', price: 9.99, sku: 'WID-1', stock: 10 }]))
  });

  const res = await app.inject({ method: 'GET', url: '/products/1' });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.json().name, 'Widget');
});

test('GET /products/:id returns 404 when missing', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({ method: 'GET', url: '/products/999' });

  assert.strictEqual(res.statusCode, 404);
});

test('POST /products creates a product and returns 201', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({
    method: 'POST',
    url: '/products',
    payload: { name: 'Gadget', price: 19.99, sku: 'GAD-1', stock: 3 }
  });

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.json().sku, 'GAD-1');
});

test('POST /products rejects a body missing the required sku', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({
    method: 'POST',
    url: '/products',
    payload: { name: 'Gadget', price: 19.99 }
  });

  assert.strictEqual(res.statusCode, 400);
});

test('POST /products rejects a negative price', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({
    method: 'POST',
    url: '/products',
    payload: { name: 'Gadget', price: -5, sku: 'GAD-2' }
  });

  assert.strictEqual(res.statusCode, 400);
});

test('PUT /products/:id updates an existing product', async () => {
  diContainer.register({
    knex: asValue(createFakeKnex([{ id: 1, name: 'Widget', price: 9.99, sku: 'WID-1', stock: 10 }]))
  });

  const res = await app.inject({
    method: 'PUT',
    url: '/products/1',
    payload: { stock: 25 }
  });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.json().stock, 25);
});

test('PUT /products/:id returns 404 when missing', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({
    method: 'PUT',
    url: '/products/999',
    payload: { stock: 1 }
  });

  assert.strictEqual(res.statusCode, 404);
});

test('DELETE /products/:id removes an existing product', async () => {
  diContainer.register({
    knex: asValue(createFakeKnex([{ id: 1, name: 'Widget', price: 9.99, sku: 'WID-1', stock: 10 }]))
  });

  const res = await app.inject({ method: 'DELETE', url: '/products/1' });

  assert.strictEqual(res.statusCode, 204);
});

test('DELETE /products/:id returns 404 when missing', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({ method: 'DELETE', url: '/products/999' });

  assert.strictEqual(res.statusCode, 404);
});
