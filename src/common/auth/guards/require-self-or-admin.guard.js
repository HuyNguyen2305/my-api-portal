import { getIdentity } from '#src/common/auth/auth-context';
import { ForbiddenError } from '#configs/error';

export async function requireSelfOrAdmin(request) {
  const identity = getIdentity(request);
  if (identity.role === 'admin') return;

  if (Number(request.params.id) !== identity.id) {
    throw new ForbiddenError('You can only access your own account');
  }
}
