const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', function(req, res, next) {
  knex('events')
  .orderBy('date', 'asc')
  .then(events => res.send({
    "code": 200,
    "events": events
  }))
  .catch(err => next(err))
});

module.exports = router;
