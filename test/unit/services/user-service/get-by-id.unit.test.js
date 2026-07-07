import { jest } from '@jest/globals';

const { UserService } = await import('#services/user.service');

describe('UserService.getById', () => {
  it('returns the user when found', async () => {
    const user = { id: 1, name: 'Ada', email: 'ada@example.com' };
    const userRepository = { getOne: jest.fn().mockResolvedValue(user) };
    const service = Object.create(UserService.prototype);
    service.userRepository = userRepository;

    const result = await service.getById(1);

    expect(userRepository.getOne).toHaveBeenCalledWith({ id: 1 });
    expect(result).toBe(user);
  });

  it('throws NotFoundError when the user is missing', async () => {
    const userRepository = { getOne: jest.fn().mockResolvedValue(null) };
    const service = Object.create(UserService.prototype);
    service.userRepository = userRepository;

    await expect(service.getById(999)).rejects.toThrow('User not found');
  });
});
