/**
 * productService factory.
 * Awilix calls this function and injects any registered dependency
 * whose name matches a destructured property below (e.g. `knex`).
 */
function productService({ knex }) {
  return {
    getAll: () => knex('products').select('*'),

    getById: (id) => knex('products').where({ id }).first(),

    create: (data) => knex('products').insert(data).returning('*'),

    update: (id, data) =>
      knex('products').where({ id }).update(data).returning('*'),

    remove: (id) => knex('products').where({ id }).del()
  };
}

module.exports = productService;
