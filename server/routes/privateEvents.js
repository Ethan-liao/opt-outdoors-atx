const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', function(req, res, next) {
  if (req.session.id) {
    knex('events')
    .then(events => res.send({"code": 200, "events": events}))
    .catch(err => next(err))
  } else {
    console.log('no session id');
    res.send({"code": 204, "success": "No session id exists."});
  }
});

module.exports = router;
