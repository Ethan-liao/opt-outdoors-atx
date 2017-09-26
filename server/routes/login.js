const express = require('express');
const router = express.Router();
const knex = require('../db');
const bcrypt = require('bcrypt-as-promised');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  knex('users')
  .where('email', email)
  .first()
  .returning('*')
  .then((exists) => {
    if (exists) {
      bcrypt.compare(password, exists.password)
      .then((result) => {
        req.session.id = exists.id;
        req.session.first = exists.first;
        req.session.last = exists.last;
        req.session.email = exists.email;
        req.session.admin = exists.admin;
        res.send({
          "code": 200,
          "success": "login successful",
          "user": exists
        })
      })
      .catch(bcrypt.MISMATCH_ERROR, (result) => {
        console.log('mismatch error');
        res.send({
          "code": 204,
          "success": "Email and password do not match."
        });
      })
      .catch((result) => {
        console.log('other errors', result);
        res.send({
          "code": 204,
          "success": "Email and password do not match."
        });
      });
    } else {
      console.log('email does not exist');
      res.send({
        "code":204,
        "success":"Email and password do not match."
      });
    }
  })
});

module.exports = router;
