require('dotenv').config();

/**
 * Knex configuration.
 * Connection details come from environment variables (see .env.example).
 */
const baseConnection = {
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE
};

module.exports = {
  development: {
    client: 'pg',
    connection: baseConnection,
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    },
    pool: { min: 2, max: 10 }
  },

  production: {
    client: 'pg',
    connection: baseConnection,
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    },
    pool: { min: 2, max: 10 }
  }
};
