const fp = require('fastify-plugin');
const { fastifyAwilixPlugin, diContainer } = require('@fastify/awilix');
const { asValue, asFunction } = require('awilix');

const knex = require('../db/knex');
const userService = require('../services/userService');
const productService = require('../services/productService');

/**
 * Registers Awilix with Fastify.
 * - disposeOnClose: tears down the container when Fastify closes
 * - disposeOnResponse: creates a fresh scoped container per request
 *
 * Register new services here as the app grows (productService, orderService, etc.)
 */
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
