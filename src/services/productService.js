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
