const eventsList = require('../sample_data/events');

exports.seed = function (knex) {
  return knex('events')
    .del()
    .then(() => knex('events').insert(eventsList));
};
