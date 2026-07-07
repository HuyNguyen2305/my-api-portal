const knexLib = require('knex');
const knexConfig = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const knex = knexLib(config);

module.exports = knex;
