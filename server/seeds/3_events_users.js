const eventsUsersList = require('../sample_data/events_users');

exports.seed = function (knex) {
  return knex('events_users')
    .del()
    .then(() => knex('events_users').insert(eventsUsersList));
};
