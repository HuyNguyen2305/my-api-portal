const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  listUsersSchema,
  deleteUserSchema
} = require('../schemas/userSchema');

async function userRoutes(fastify) {
  fastify.get('/users', { schema: listUsersSchema }, async (req) => {
    const { userService } = req.diScope.cradle;
    return userService.getAll();
  });

  fastify.get('/users/:id', { schema: getUserSchema }, async (req, reply) => {
    const { userService } = req.diScope.cradle;
    const user = await userService.getById(req.params.id);
    if (!user) return reply.code(404).send({ message: 'User not found' });
    return user;
  });

  fastify.post('/users', { schema: createUserSchema }, async (req, reply) => {
    const { userService } = req.diScope.cradle;
    const [created] = await userService.create(req.body);
    return reply.code(201).send(created);
  });

  fastify.put('/users/:id', { schema: updateUserSchema }, async (req, reply) => {
    const { userService } = req.diScope.cradle;
    const [updated] = await userService.update(req.params.id, req.body);
    if (!updated) return reply.code(404).send({ message: 'User not found' });
    return updated;
  });

  fastify.delete('/users/:id', { schema: deleteUserSchema }, async (req, reply) => {
    const { userService } = req.diScope.cradle;
    const deletedCount = await userService.remove(req.params.id);
    if (!deletedCount) return reply.code(404).send({ message: 'User not found' });
    return reply.code(204).send();
  });
}

module.exports = userRoutes;
