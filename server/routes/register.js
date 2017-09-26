const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const router = express.Router();
const knex = require('../db')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then((hashed_password) => {
    let newUser = {
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: hashed_password,
      admin: 'False'
    }
    knex('users')
    .where('email', req.body.email)
    .first()
    .returning('id')
    .then((exists) => {
      if (!exists) {
        console.log('email does not exist');
        knex('users')
        .insert(newUser)
        .returning('id')
        .then((id) => {
          console.log('new id', id);
          res.sendStatus(200);
        });
      } else {
        console.log('email already exists in db');
        res.sendStatus(400);
      }
    })
  })
  .catch((err) => {
    console.log('error!');
    next(err);
  });
});

module.exports = router;
