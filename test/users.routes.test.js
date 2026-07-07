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

test('GET /users returns seeded users', async () => {
  diContainer.register({
    knex: asValue(createFakeKnex([{ id: 1, name: 'Ada', email: 'ada@example.com' }]))
  });

  const res = await app.inject({ method: 'GET', url: '/users' });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.json().length, 1);
  assert.strictEqual(res.json()[0].name, 'Ada');
});

test('GET /users/:id returns a user when found', async () => {
  diContainer.register({
    knex: asValue(createFakeKnex([{ id: 1, name: 'Ada', email: 'ada@example.com' }]))
  });

  const res = await app.inject({ method: 'GET', url: '/users/1' });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.json().email, 'ada@example.com');
});

test('GET /users/:id returns 404 when missing', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({ method: 'GET', url: '/users/999' });

  assert.strictEqual(res.statusCode, 404);
});

test('POST /users creates a user and returns 201', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({
    method: 'POST',
    url: '/users',
    payload: { name: 'Grace', email: 'grace@example.com' }
  });

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.json().name, 'Grace');
});

test('POST /users rejects a body missing the required email', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({
    method: 'POST',
    url: '/users',
    payload: { name: 'Grace' }
  });

  assert.strictEqual(res.statusCode, 400);
});

test('PUT /users/:id updates an existing user', async () => {
  diContainer.register({
    knex: asValue(createFakeKnex([{ id: 1, name: 'Ada', email: 'ada@example.com' }]))
  });

  const res = await app.inject({
    method: 'PUT',
    url: '/users/1',
    payload: { name: 'Ada Lovelace' }
  });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.json().name, 'Ada Lovelace');
});

test('PUT /users/:id returns 404 when missing', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({
    method: 'PUT',
    url: '/users/999',
    payload: { name: 'Nobody' }
  });

  assert.strictEqual(res.statusCode, 404);
});

test('DELETE /users/:id removes an existing user', async () => {
  diContainer.register({
    knex: asValue(createFakeKnex([{ id: 1, name: 'Ada', email: 'ada@example.com' }]))
  });

  const res = await app.inject({ method: 'DELETE', url: '/users/1' });

  assert.strictEqual(res.statusCode, 204);
});

test('DELETE /users/:id returns 404 when missing', async () => {
  diContainer.register({ knex: asValue(createFakeKnex([])) });

  const res = await app.inject({ method: 'DELETE', url: '/users/999' });

  assert.strictEqual(res.statusCode, 404);
});
