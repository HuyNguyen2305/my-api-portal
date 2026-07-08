import { jest } from '@jest/globals';

const { setIdentity } = await import('#src/common/auth/auth-context');

describe('setIdentity', () => {
  it('stores the identity on the request context under the "identity" key', () => {
    const request = { requestContext: { set: jest.fn() } };
    const user = { id: 1, name: 'Ada' };

    setIdentity(request, user);

    expect(request.requestContext.set).toHaveBeenCalledWith('identity', user);
  });
});
