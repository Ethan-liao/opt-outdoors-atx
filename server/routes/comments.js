const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/:id', function(req, res, next) {
  console.log('/comments', req.session);
  knex('events_comments')
  .join('users', 'users.id', 'events_comments.user_id')
  .returning('*')
  .where('events_comments.event_id', req.params.id)
  .then(comments => res.send({
    "code": 200,
    "comments": comments
  }))
  .catch(err => next(err))
});

module.exports = router;
