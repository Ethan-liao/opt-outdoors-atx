const eventsCommentsList = require('../sample_data/events_comments');

exports.seed = function (knex) {
  return knex('events_comments')
    .del()
    .then(() => knex('events_comments').insert(eventsCommentsList));
};
