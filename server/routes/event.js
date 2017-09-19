const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/:id', function(req, res, next) {
  console.log('/events', req.session);
  knex('events')
  .where('id', req.params.id)
  .then(event => res.send({
    "code": 200,
    "event": event
  }))
  .catch(err => next(err))
});

module.exports = router;
