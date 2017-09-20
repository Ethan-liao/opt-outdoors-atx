const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/:id', function(req, res, next) {
  console.log('/events', req.session);
  if (req.session.id) {
    knex('events')
    .join('users', 'events.organizer', '=', 'users.id')
    .returning('*')
    .where('events.id', req.params.id)
    .then(event => res.send({"code": 200, "event": event}))
    .catch(err => next(err))
  } else {
    console.log('no session id');
    res.send({"code": 204, "success": "No session id exists."});
  }
});

router.get('/:id/attendees', function(req, res, next) {
  if (req.session.id) {
    console.log(req.params.id);
    knex('events_users')
    .join('users', 'events_users.user_id', '=', 'users.id')
    .returning('*')
    .where('events_users.event_id', req.params.id)
    .then(attendees => res.send({"code": 200, "attendees": attendees}))
    .catch(err => next(err))
  } else {
    console.log('no session id');
    res.send({"code": 204, "success": "No session id exists."});
  }
});

router.post('/add', (req, res, next) => {
  console.log('body:', req.body);
  console.log('session:', req.session);

  knex('events').returning('id').insert({
    activity: req.body.activity,
    title: req.body.title,
    description: req.body.description,
    organizer: Number.parseInt(req.session.id),
    image_url: req.body.image_url,
    date: req.body.date,
    location: req.body.location
  }).then(id => knex('events_users').insert({
    user_id: Number.parseInt(req.session.id),
    event_id: Number.parseInt(id)
  })).then(() => {
    console.log('event addded');
    res.send({"code": 200, "success": "event added to db"})
  }).catch((err) => {
    console.log('error, event not added', err);
    res.send({"code": 204, "success": "Event not added."});
    // next(err);
  });
});

module.exports = router;
