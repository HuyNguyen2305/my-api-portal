import 'dotenv/config';
import { Sequelize } from 'sequelize';

const database = process.env.NODE_ENV === 'test' ? process.env.PGDATABASE_TEST : process.env.PGDATABASE;

export const sequelize = new Sequelize(
  database,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT) || 5432,
    dialect: 'postgres',
    logging: false,
    pool: { min: 2, max: 10 }
  }
);
