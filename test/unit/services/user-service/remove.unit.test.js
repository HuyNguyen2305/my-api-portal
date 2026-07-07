import { jest } from '@jest/globals';

const { UserService } = await import('#services/user.service');

describe('UserService.remove', () => {
  it('removes an existing user', async () => {
    const existing = { id: 1, name: 'Ada', email: 'ada@example.com' };
    const userRepository = {
      getOne: jest.fn().mockResolvedValue(existing),
      delete: jest.fn().mockResolvedValue(1)
    };
    const service = Object.create(UserService.prototype);
    service.userRepository = userRepository;

    const result = await service.remove(1);

    expect(userRepository.delete).toHaveBeenCalledWith({ id: 1 });
    expect(result).toBe(1);
  });

  it('throws NotFoundError when the user does not exist', async () => {
    const userRepository = {
      getOne: jest.fn().mockResolvedValue(null),
      delete: jest.fn()
    };
    const service = Object.create(UserService.prototype);
    service.userRepository = userRepository;

    await expect(service.remove(999)).rejects.toThrow('User not found');
    expect(userRepository.delete).not.toHaveBeenCalled();
  });
});
