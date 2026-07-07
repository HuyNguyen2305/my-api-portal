/**
 * userService factory.
 * Awilix calls this function and injects any registered dependency
 * whose name matches a destructured property below (e.g. `knex`).
 */
function userService({ knex }) {
  return {
    getAll: () => knex('users').select('*'),

    getById: (id) => knex('users').where({ id }).first(),

    create: (data) => knex('users').insert(data).returning('*'),

    update: (id, data) =>
      knex('users').where({ id }).update(data).returning('*'),

    remove: (id) => knex('users').where({ id }).del()
  };
}

module.exports = userService;
