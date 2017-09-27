const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/:id', function(req, res, next) {
  if (req.session.id) {
    knex('events')
    .join('users', 'events.organizer', 'users.id')
    .returning('*')
    .where('events.id', req.params.id)
    .then(event => res.send({"code": 200, "event": event}))
    .catch(err => next(err))
  } else {
    // console.log('no session id');
    res.send({"code": 204, "success": "No session id exists."});
  }
});

router.get('/:id/attendees', function(req, res, next) {
  if (req.session.id) {
    knex('events_users')
    .join('users', 'events_users.user_id', '=', 'users.id')
    .returning('*')
    .where('events_users.event_id', req.params.id)
    .then(attendees => res.send({"code": 200, "attendees": attendees}))
    .catch(err => next(err))
  } else {
    // console.log('no session id');
    res.send({"code": 204, "success": "No session id exists."});
  }
});

router.post('/add', (req, res, next) => {
  if (req.session.id) {
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
      // console.log('event addded');
      res.send({"code": 200, "success": "event added to db"})
    }).catch((err) => {
      // console.log('error, event not added', err);
      res.send({"code": 204, "success": "Event not added."});
    });
  } else {
    // console.log('no session id');
    res.send({"code": 403, "success": "No session id exists."});
  }
});

router.post('/:id/rsvp', (req, res, next) => {
  knex('events_users')
  .returning('user_id')
  .where('user_id', Number.parseInt(req.session.id))
  .andWhere('event_id', Number.parseInt(req.params.id))
  .then((exists) => {
    if (!exists[0]) {
      knex('events_users')
      .returning('*')
      .insert({
        user_id: Number.parseInt(req.session.id),
        event_id: Number.parseInt(req.params.id)
      })
      .then((result) => {
        res.send({
          "code": 200,
          "attendee": result,
          "admin": req.session.admin,
          "email": req.session.email,
          "first": req.session.first,
          "last": req.session.last,
        })
      }).catch((err) => {
        // console.log('error, attendee not added', err);
        res.send({"code": 204, "message": "error adding attendee to db"});
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
    // console.log('attendee removed from event');
    res.send({
      "code": 200,
      "message": "attendee removed from event"
    })
  }).catch((err) => {
    // console.log('error, attendee not removed', err);
    res.send({"code": 204, "message": "error removing attendee from db"});
  });
});

router.delete('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  knex('events_comments').where('event_id', id).del().then(() => {
    knex('events_users').where('event_id', id).del().then(() => {
      knex('events').where('id', id).del().then(() => {
        console.log('event has been removed from db');
        res.send({"code": 200, "message": "event has been removed from db"})
      })
    })
  }).catch((err) => {
    console.log('error, event not removed', err);
    res.send({"code": 204, "message": "error removing event from db"});
  });
});

router.get('/edit/:id', (req, res, next) => {
  if (req.session.id !== undefined) {
    let id = Number.parseInt(req.params.id);
    knex('events').where('id', id).returning('*').then((event) => {
      if (req.session.id === event[0].organizer) {
        // console.log('event data has been pulled from db');
        res.send({"code": 200, "event": event, "message": "event data has been pulled from db"})
      } else {
        // user id and event id don't match
        res.status(403)
        res.send({"code": 403, "message": "not authorized"});
      }
    }).catch((error) => {
      // console.log('error, event data not retrieved', error);
      res.send({"code": 204, "message": "event data not retrieved"});
    });
  } else {
    // no session.id -- not authorized
    res.status(403)
    res.send({"code": 403, "message": "not authorized"});
  }
});

router.patch('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id);

  if (req.session.id === req.body.organizer) {
    knex('events').where('id', id)
    .then((event) => {
      if (!event) {
        return next();
      }
      return knex('events').where('id', id).update({
        activity: req.body.activity,
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        date: req.body.date,
        location: req.body.location
      }).returning('*')
      .then((event) => {
        // console.log('event data has been pulled from db');
        res.send({"code": 200, "event": event, "message": "event data has been updated in db"})
      })
      .catch((err) => {
        // console.log('error, event data not updated', err);
        res.send({"code": 204, "message": "error, event data not updated"});
      });
    });
  } else {
    //not authorized
    // console.log('error, event data not updated', err);
    req.session = null;
    res.send({"status": 403, "message": "not authorized to submit changes"});
  }

});

module.exports = router;
