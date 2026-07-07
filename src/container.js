import { asClass } from 'awilix';
import { diContainer } from '@fastify/awilix';

export function registerSingleton(key, Klass) {
  diContainer.register({ [key]: asClass(Klass).singleton() });
}

export function registerContainer() {
  return Promise.all([
    import('#repositories/index'),
    import('#services/index'),
    import('#controllers/index')
  ]);
}
