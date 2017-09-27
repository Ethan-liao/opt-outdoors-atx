const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', function(req, res, next) {
  if (req.session.id) {
    knex('events')
    .orderBy('date', 'asc')
    .then(events => res.send({"code": 200, "events": events}))
    .catch(err => next(err))
  } else {
    // console.log('no session id');
    res.send({"code": 204, "success": "No session id exists."});
  }
});

router.get('/attending', function(req, res, next) {
  if (req.session.id) {
    knex('events')
    .join('events_users', 'events_users.event_id', 'events.id')
    .where('events_users.user_id', req.session.id)
    .whereNot('events.organizer', req.session.id)
    .then(events => res.send({"code": 200, "events": events}))
    .catch(err => next(err))
  } else {
    // console.log('no session id');
    res.send({"code": 204, "success": "No session id exists."});
  }
});

router.get('/organized', function(req, res, next) {
  if (req.session.id) {
    knex('events')
    .where('organizer', req.session.id)
    .then(events => res.send({"code": 200, "events": events}))
    .catch(err => next(err))
  } else {
    // console.log('no session id');
    res.send({"code": 204, "success": "No session id exists."});
  }
});

module.exports = router;
