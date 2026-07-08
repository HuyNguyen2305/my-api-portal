import { jest } from '@jest/globals';

const { getIdentity } = await import('#src/common/auth/auth-context');

describe('getIdentity', () => {
  it('reads the identity from the request context', () => {
    const user = { id: 1, name: 'Ada' };
    const request = { requestContext: { get: jest.fn().mockReturnValue(user) } };

    const result = getIdentity(request);

    expect(request.requestContext.get).toHaveBeenCalledWith('identity');
    expect(result).toBe(user);
  });
});
