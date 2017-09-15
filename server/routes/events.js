const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', function(req, res, next) {
  knex('events')
  .then(events => res.send({
    "code": 200,
    "events": events
  }))
  .catch(err => next(err))
});

module.exports = router;
