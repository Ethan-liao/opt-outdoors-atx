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

router.post('/add', (req, res, next) => {
  console.log('body:', req.body);
  console.log('session:', req.session);

  knex('events')
    .returning('id')
    .insert({
      activity: req.body.activity,
      title: req.body.title,
      description: req.body.description,
      organizer: req.session.id,
      image_url: req.body.image_url,
      date: req.body.date,
      location: req.body.location,
    })
    .then(id => knex('events_users')
    .insert({
      user_id: req.session.id,
      event_id: parseInt(id)
    }))
    .then(() => {
      console.log('event addded');
      res.send({
       "code": 200,
       "success": "event added to db"
     })
    })
    .catch((err) => {
      console.log('error, event not added', err);
      res.send({
        "code": 204,
        "success": "Event not added."
      });
      // next(err);
    });
});

module.exports = router;
