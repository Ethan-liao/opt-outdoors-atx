const express = require('express');
const router = express.Router();
const knex = require('../db')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  console.log('req:', req.body);
  knex('users')
    .where({email: req.body.email})
    .returning('*')
    .first()
    .then(user => res.json(user))
    // .catch(err => next(err))
    .catch(function(error) {
      console.error(error);
    })
});

module.exports = router;
