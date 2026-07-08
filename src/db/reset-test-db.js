import '#configs/env';
import { sequelize } from '#configs/database';

if (process.env.NODE_ENV !== 'test') {
  console.error('Refusing to run: NODE_ENV must be "test" (use `npm run test:db:reset`).');
  process.exit(1);
}

await sequelize.query('TRUNCATE TABLE "users", "products" RESTART IDENTITY CASCADE');
console.log(`Test database reset: users and products truncated (${process.env.PGDATABASE}).`);

await sequelize.close();
