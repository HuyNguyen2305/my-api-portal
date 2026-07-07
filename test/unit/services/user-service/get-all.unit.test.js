import { jest } from '@jest/globals';

const { UserService } = await import('#services/user.service');

describe('UserService.getAll', () => {
  it('returns all users from the repository', async () => {
    const users = [{ id: 1, name: 'Ada', email: 'ada@example.com' }];
    const userRepository = { get: jest.fn().mockResolvedValue(users) };
    const service = Object.create(UserService.prototype);
    service.userRepository = userRepository;

    const result = await service.getAll();

    expect(userRepository.get).toHaveBeenCalledWith();
    expect(result).toBe(users);
  });
});
