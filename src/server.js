import 'dotenv/config';
import { buildApp } from '#src/index';

const app = await buildApp();

try {
  const port = Number(process.env.PORT) || 3000;
  await app.listen({ port, host: '0.0.0.0' });
  app.log.info(`API portal docs available at http://localhost:${port}/docs`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
