const config = require('./knexfile')[process.env.NODE_ENV || 'development'];

module.exports = require('knex')(config);

// const env = 'development';
// const config = require('./knexfile.js')[env];
// const knex = require('knex')(config);
