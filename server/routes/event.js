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

router.post('/:id/rsvp', (req, res, next) => {
  knex('events_users')
  .returning('user_id')
  .where('user_id', Number.parseInt(req.session.id))
  .andWhere('event_id', Number.parseInt(req.params.id))
  .then((exists) => {
    // console.log('exists:', exists[0]);
    if (!exists[0]) {
      // console.log('user not registered yet');
      knex('events_users')
      .returning('*')
      .insert({
        user_id: Number.parseInt(req.session.id),
        event_id: Number.parseInt(req.params.id)
      })
      .then((result) => {
        // console.log('user registered for event');
        res.send({
          "code": 200,
          "attendee": result,
          "admin": req.session.admin,
          "email": req.session.email,
          "first": req.session.first,
          "last": req.session.last,
        })
      }).catch((err) => {
        console.log('error, attendee not added', err);
        res.send({"code": 204, "message": "error adding attendee to db"});
        // next(err);
      });
    } else {
      res.send({"code": 204, "message": "attendee already registered"});
    }
  })
  .catch(err => next(err))
});

router.delete('/:id/leave', (req, res, next) => {
  knex('events_users')
  .where('user_id', Number.parseInt(req.session.id))
  .andWhere('event_id', Number.parseInt(req.params.id))
  .del()
  .then(() => {
    console.log('attendee removed from event');
    res.send({
      "code": 200,
      "message": "attendee removed from event"
    })
  }).catch((err) => {
    console.log('error, attendee not removed', err);
    res.send({"code": 204, "message": "error removing attendee from db"});
  });
});

module.exports = router;
