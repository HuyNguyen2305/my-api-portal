const fp = require('fastify-plugin');
const { fastifyAwilixPlugin, diContainer } = require('@fastify/awilix');
const { asValue, asFunction } = require('awilix');

const knex = require('../db/knex');
const userService = require('../services/userService');
const productService = require('../services/productService');

module.exports = fp(async function awilixPlugin(fastify) {
  await fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true
  });

  diContainer.register({
    knex: asValue(knex),
    userService: asFunction(userService).scoped(),
    productService: asFunction(productService).scoped()
  });

  fastify.addHook('onClose', async () => {
    await knex.destroy();
  });
});
