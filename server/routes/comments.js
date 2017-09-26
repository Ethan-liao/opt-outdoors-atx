const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/:id', function(req, res, next) {
  knex('events_comments')
  .join('users', 'users.id', 'events_comments.user_id')
  .where('events_comments.event_id', req.params.id)
  .returning('comment_id')
  .then(comments => res.send({"code": 200, "comments": comments}))
  .catch(err => next(err))
});

router.post('/:id', function(req, res, next) {
  knex('events_comments')
  .returning('*')
  .insert({
    content: req.body.content,
    event_id: Number.parseInt(req.params.id),
    user_id: Number.parseInt(req.session.id)
  })
  .then(result => res.send({
    "code": 200,
    "comment": result,
    "admin": req.session.admin,
    "email": req.session.email,
    "first": req.session.first,
    "last": req.session.last,
  }))
  .catch(err => next(err))
});

module.exports = router;
