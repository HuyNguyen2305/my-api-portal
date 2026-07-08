import '#configs/env';
import { QueryTypes } from 'sequelize';
import { sequelize } from '#configs/database';

const email = process.argv[2];

if (!email) {
  console.error('Usage: node src/db/promote-admin.js <email>');
  process.exit(1);
}

const rows = await sequelize.query('UPDATE users SET role = :role WHERE email = :email RETURNING id, email, role', {
  replacements: { role: 'admin', email },
  type: QueryTypes.SELECT
});

const [affected] = rows;

if (!affected) {
  console.error(`No user found with email ${email}`);
  await sequelize.close();
  process.exit(1);
}

console.log(`Promoted to admin: ${affected.email} (id ${affected.id})`);
await sequelize.close();
