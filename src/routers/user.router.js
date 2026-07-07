import { diContainer } from '@fastify/awilix';
import { CONTROLLER_KEYS } from '#constants/singleton';
import {
  listUsersSchema,
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema
} from '#schemas/user.schema';

class UserRouter {
  constructor(fastify) {
    this.fastify = fastify;
    this.userController = diContainer.resolve(CONTROLLER_KEYS.USER);
  }

  register() {
    this.fastify.get('/users', {
      config: { responseFormat: 'standard' },
      schema: listUsersSchema,
      handler: (request, reply) => this.userController.list(request, reply)
    });

    this.fastify.get('/users/:id', {
      config: { responseFormat: 'standard' },
      schema: getUserSchema,
      handler: (request, reply) => this.userController.getById(request, reply)
    });

    this.fastify.post('/users', {
      config: { responseFormat: 'standard' },
      schema: createUserSchema,
      handler: (request, reply) => this.userController.create(request, reply)
    });

    this.fastify.put('/users/:id', {
      config: { responseFormat: 'standard' },
      schema: updateUserSchema,
      handler: (request, reply) => this.userController.update(request, reply)
    });

    this.fastify.delete('/users/:id', {
      config: { responseFormat: 'standard' },
      schema: deleteUserSchema,
      handler: (request, reply) => this.userController.remove(request, reply)
    });
  }
}

export default async function userRouter(fastify) {
  new UserRouter(fastify).register();
}
