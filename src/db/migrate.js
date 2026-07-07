import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readdir } from 'node:fs/promises';
import { DataTypes } from 'sequelize';
import { sequelize } from '#configs/database';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, 'migrations');

async function ensureMetaTable(queryInterface) {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('SequelizeMeta')) {
    await queryInterface.createTable('SequelizeMeta', {
      name: { type: DataTypes.STRING, allowNull: false, primaryKey: true }
    });
  }
}

async function getAppliedNames(queryInterface) {
  const rows = await queryInterface.sequelize.query('SELECT name FROM "SequelizeMeta" ORDER BY name ASC', {
    type: queryInterface.sequelize.QueryTypes.SELECT
  });
  return rows.map((row) => row.name);
}

async function loadMigrations() {
  const files = (await readdir(migrationsDir)).filter((file) => file.endsWith('.js')).sort();
  const migrations = [];
  for (const file of files) {
    const migration = await import(pathToFileURL(path.join(migrationsDir, file)).href);
    migrations.push({ name: file, ...migration });
  }
  return migrations;
}

async function up() {
  const queryInterface = sequelize.getQueryInterface();
  await ensureMetaTable(queryInterface);
  const applied = await getAppliedNames(queryInterface);
  const migrations = await loadMigrations();

  for (const migration of migrations) {
    if (applied.includes(migration.name)) continue;
    await migration.up(queryInterface);
    await queryInterface.bulkInsert('SequelizeMeta', [{ name: migration.name }]);
    console.log(`Applied migration: ${migration.name}`);
  }
}

async function down() {
  const queryInterface = sequelize.getQueryInterface();
  await ensureMetaTable(queryInterface);
  const applied = await getAppliedNames(queryInterface);
  if (applied.length === 0) {
    console.log('No migrations to roll back.');
    return;
  }

  const lastName = applied[applied.length - 1];
  const migrations = await loadMigrations();
  const migration = migrations.find((item) => item.name === lastName);

  await migration.down(queryInterface);
  await queryInterface.bulkDelete('SequelizeMeta', { name: lastName });
  console.log(`Rolled back migration: ${lastName}`);
}

const command = process.argv[2] || 'up';
const run = command === 'down' ? down : up;

run()
  .then(() => sequelize.close())
  .catch(async (err) => {
    console.error(err);
    await sequelize.close();
    process.exit(1);
  });
