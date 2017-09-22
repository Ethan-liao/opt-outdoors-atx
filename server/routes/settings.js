const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', function(req, res, next) {
  // console.log('/events', req.session);
  // if (req.session.id) {
  //   knex('events')
  //   .join('users', 'events.organizer', '=', 'users.id')
  //   .returning('*')
  //   .where('events.id', req.params.id)
  //   .then(event => res.send({"code": 200, "event": event}))
  //   .catch(err => next(err))
  // } else {
  //   console.log('no session id');
  //   res.send({"code": 204, "success": "No session id exists."});
  // }
});
