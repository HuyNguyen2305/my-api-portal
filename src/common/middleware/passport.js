import fp from 'fastify-plugin';
import passport from '@fastify/passport';
import { AccessTokenStrategy } from '#src/common/auth/strategies/access-token.strategy';

passport.use('access-token', new AccessTokenStrategy());

export const passportPlugin = passport;

export default fp(async function registerPassport(fastify) {
  await fastify.register(passport.initialize());
});
