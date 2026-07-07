const test = require('node:test');
const assert = require('node:assert');
const { createContainer, asValue, asFunction } = require('awilix');
const userService = require('../src/services/userService');

function createFakeKnex(users) {
  const table = (name) => ({
    select: async () => users,
    where: (match) => ({
      first: async () => users.find((u) => u.id === match.id),
      update: async () => {},
      del: async () => 1
    }),
    insert: () => ({
      returning: async () => [{ id: 99, ...users[0] }]
    })
  });
  return table;
}

test('userService.getAll returns users from the injected knex', async () => {
  const fakeUsers = [{ id: 1, name: 'Ada', email: 'ada@example.com' }];
  const fakeKnex = createFakeKnex(fakeUsers);

  const container = createContainer();
  container.register({
    knex: asValue(fakeKnex),
    userService: asFunction(userService).singleton()
  });

  const service = container.resolve('userService');
  const result = await service.getAll();

  assert.deepStrictEqual(result, fakeUsers);
});

test('userService.getById finds a user by id', async () => {
  const fakeUsers = [{ id: 1, name: 'Ada', email: 'ada@example.com' }];
  const fakeKnex = createFakeKnex(fakeUsers);

  const container = createContainer();
  container.register({
    knex: asValue(fakeKnex),
    userService: asFunction(userService).singleton()
  });

  const service = container.resolve('userService');
  const result = await service.getById(1);

  assert.strictEqual(result.name, 'Ada');
});
