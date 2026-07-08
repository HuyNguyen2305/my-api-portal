import { jest } from '@jest/globals';

const { requireSelfOrAdmin } = await import('#src/common/auth/guards/require-self-or-admin.guard');

function buildRequest(paramsId, identity) {
  return {
    params: { id: paramsId },
    requestContext: { get: jest.fn().mockReturnValue(identity) }
  };
}

describe('requireSelfOrAdmin', () => {
  it('resolves when identity.id matches params.id', async () => {
    const request = buildRequest('5', { id: 5, role: 'user' });

    await expect(requireSelfOrAdmin(request)).resolves.toBeUndefined();
  });

  it('throws ForbiddenError when identity.id does not match params.id and identity is not admin', async () => {
    const request = buildRequest('5', { id: 6, role: 'user' });

    await expect(requireSelfOrAdmin(request)).rejects.toThrow('You can only access your own account');
  });

  it('resolves when identity.role is admin, regardless of params.id', async () => {
    const request = buildRequest('5', { id: 6, role: 'admin' });

    await expect(requireSelfOrAdmin(request)).resolves.toBeUndefined();
  });
});
