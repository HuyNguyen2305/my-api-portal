const fastify = require('fastify');

function buildApp(opts = {}) {
  const app = fastify({
    logger: true,
    ...opts
  });

  app.register(require('@fastify/cors'));
  app.register(require('./plugins/swagger'));
  app.register(require('./plugins/awilix'));

  app.register(require('./routes/users'));
  app.register(require('./routes/products'));

  return app;
}

module.exports = buildApp;
