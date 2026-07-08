import { jest } from '@jest/globals';

const { UserService } = await import('#services/user.service');

describe('UserService.create', () => {
  it('creates a user via the repository', async () => {
    const payload = { name: 'Grace', email: 'grace@example.com' };
    const created = { id: 1, ...payload };
    const userRepository = { create: jest.fn().mockResolvedValue(created) };
    const service = Object.create(UserService.prototype);
    service.userRepository = userRepository;

    const result = await service.create(payload);

    expect(userRepository.create).toHaveBeenCalledWith({
      ...payload,
      token: expect.any(String)
    });
    expect(result).toBe(created);
  });
});
