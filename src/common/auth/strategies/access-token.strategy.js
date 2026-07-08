import Strategy from 'passport-strategy';
import { UserRepository } from '#repositories/user.repository';
import { setIdentity, parseBearerToken } from '#src/common/auth/auth-context';
import { AuthError } from '#configs/error';

export class AccessTokenStrategy extends Strategy {
  constructor() {
    super();
    this.name = 'access-token';
    this.userRepository = new UserRepository();
  }

  async authenticate(request) {
    const token = parseBearerToken(request);
    if (!token) {
      throw new AuthError('Missing access token');
    }

    const user = await this.userRepository.getOne({ token });
    if (!user) {
      throw new AuthError('Invalid access token');
    }

    setIdentity(request, user);
    this.success(user);
  }
}
