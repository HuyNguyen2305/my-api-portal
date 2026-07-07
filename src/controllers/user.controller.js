export class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  list() {
    return this.userService.getAll();
  }

  getById(request) {
    return this.userService.getById(request.params.id);
  }

  async create(request, reply) {
    const user = await this.userService.create(request.body);
    reply.code(201);
    return user;
  }

  update(request) {
    return this.userService.update(request.params.id, request.body);
  }

  async remove(request, reply) {
    await this.userService.remove(request.params.id);
    reply.code(204);
  }
}
