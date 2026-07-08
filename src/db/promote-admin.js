import { pathToFileURL } from 'node:url';
import { QueryTypes } from 'sequelize';
import { sequelize } from '#configs/database';

export async function promoteAdmin(email) {
  const rows = await sequelize.query('UPDATE users SET role = :role WHERE email = :email RETURNING id, email, role', {
    replacements: { role: 'admin', email },
    type: QueryTypes.SELECT
  });

  return rows[0] ?? null;
}

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node src/db/promote-admin.js <email>');
    process.exit(1);
  }

  const affected = await promoteAdmin(email);
  if (!affected) {
    console.error(`No user found with email ${email}`);
    await sequelize.close();
    process.exit(1);
  }

  console.log(`Promoted to admin: ${affected.email} (id ${affected.id})`);
  await sequelize.close();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
