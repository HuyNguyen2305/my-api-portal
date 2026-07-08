import crypto from 'node:crypto';
import { NotFoundError } from '#configs/error';

export class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  getAll() {
    return this.userRepository.get();
  }

  async getById(id) {
    const user = await this.userRepository.getOne({ id });
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  create(data) {
    const token = crypto.randomBytes(32).toString('hex');
    return this.userRepository.create({ ...data, token });
  }

  async update(id, data) {
    await this.getById(id);
    return this.userRepository.update({ id }, data);
  }

  async remove(id) {
    await this.getById(id);
    return this.userRepository.delete({ id });
  }
}
