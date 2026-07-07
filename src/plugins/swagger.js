const fp = require('fastify-plugin');

module.exports = fp(async function swaggerPlugin(fastify) {
  await fastify.register(require('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'My API Portal',
        description: 'API portal built with Fastify, Knex, and Postgres',
        version: '1.0.0'
      }
    }
  });

  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs'
  });
});
