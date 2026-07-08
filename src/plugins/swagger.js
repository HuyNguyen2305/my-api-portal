import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default fp(async function swaggerPlugin(fastify) {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'My API Portal',
        description: 'API portal built with Fastify, Sequelize, and Postgres',
        version: '1.0.0'
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            description: 'Token returned once by POST /users. Send as: Authorization: Bearer <token>'
          }
        }
      }
    }
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/docs'
  });
});
