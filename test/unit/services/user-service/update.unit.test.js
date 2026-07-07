import { jest } from '@jest/globals';

const { UserService } = await import('#services/user.service');

describe('UserService.update', () => {
  it('updates an existing user', async () => {
    const existing = { id: 1, name: 'Ada', email: 'ada@example.com' };
    const updated = { ...existing, name: 'Ada Lovelace' };
    const userRepository = {
      getOne: jest.fn().mockResolvedValue(existing),
      update: jest.fn().mockResolvedValue(updated)
    };
    const service = Object.create(UserService.prototype);
    service.userRepository = userRepository;

    const result = await service.update(1, { name: 'Ada Lovelace' });

    expect(userRepository.update).toHaveBeenCalledWith({ id: 1 }, { name: 'Ada Lovelace' });
    expect(result).toBe(updated);
  });

  it('throws NotFoundError when the user does not exist', async () => {
    const userRepository = {
      getOne: jest.fn().mockResolvedValue(null),
      update: jest.fn()
    };
    const service = Object.create(UserService.prototype);
    service.userRepository = userRepository;

    await expect(service.update(999, { name: 'Nobody' })).rejects.toThrow('User not found');
    expect(userRepository.update).not.toHaveBeenCalled();
  });
});
