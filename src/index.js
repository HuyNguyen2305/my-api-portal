import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import autoload from '@fastify/autoload';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import fastifyRequestContext from '@fastify/request-context';
import secureSession from '@fastify/secure-session';
import swaggerPlugin from '#src/plugins/swagger';
import passportMiddleware from '#src/common/middleware/passport';
import { registerContainer } from '#src/container';
import { setErrorHandler } from '#configs/error';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function buildApp(opts = {}) {
  const app = Fastify({ logger: true, ...opts });

  await app.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true
  });
  await registerContainer();

  await app.register(cors);
  await app.register(fastifyRequestContext);
  await app.register(secureSession, { key: crypto.randomBytes(32) });
  await app.register(passportMiddleware);
  await app.register(swaggerPlugin);

  await app.register(autoload, {
    dir: path.join(__dirname, 'routers'),
    matchFilter: (filePath) => filePath.endsWith('.router.js')
  });

  app.addHook('preSerialization', async (request, reply, payload) => {
    if (request.routeOptions?.config?.responseFormat !== 'standard') return payload;
    if (payload === undefined || payload === null) return payload;
    return { success: true, message: [], data: payload };
  });

  setErrorHandler(app);

  return app;
}
