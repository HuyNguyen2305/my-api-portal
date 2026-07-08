import { jest } from '@jest/globals';

const userRepositoryMock = { getOne: jest.fn() };
class MockUserRepository {
  constructor() {
    return userRepositoryMock;
  }
}
jest.unstable_mockModule('#repositories/user.repository', () => ({ UserRepository: MockUserRepository }));

const { AccessTokenStrategy } = await import('#src/common/auth/strategies/access-token.strategy');

function buildRequest(headers = {}) {
  return {
    headers,
    requestContext: { set: jest.fn(), get: jest.fn() }
  };
}

describe('AccessTokenStrategy.authenticate', () => {
  it('throws AuthError when no Authorization header is provided', async () => {
    const strategy = new AccessTokenStrategy();
    strategy.success = jest.fn();
    const request = buildRequest();

    await expect(strategy.authenticate(request)).rejects.toThrow('Missing access token');
    expect(strategy.success).not.toHaveBeenCalled();
  });

  it('throws AuthError when the token does not match any user', async () => {
    userRepositoryMock.getOne.mockResolvedValue(null);
    const strategy = new AccessTokenStrategy();
    strategy.success = jest.fn();
    const request = buildRequest({ authorization: 'Bearer bad-token' });

    await expect(strategy.authenticate(request)).rejects.toThrow('Invalid access token');
    expect(userRepositoryMock.getOne).toHaveBeenCalledWith({ token: 'bad-token' });
  });

  it('sets the identity and calls success when the token matches a user', async () => {
    const user = { id: 1, name: 'Ada', token: 'good-token' };
    userRepositoryMock.getOne.mockResolvedValue(user);
    const strategy = new AccessTokenStrategy();
    strategy.success = jest.fn();
    const request = buildRequest({ authorization: 'Bearer good-token' });

    await strategy.authenticate(request);

    expect(request.requestContext.set).toHaveBeenCalledWith('identity', user);
    expect(strategy.success).toHaveBeenCalledWith(user);
  });
});
