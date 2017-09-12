module.exports = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);

// const env = 'development';
// const config = require('./knexfile.js')[env];
// const knex = require('knex')(config);
