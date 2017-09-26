var express = require('express');
var router = express.Router();
const knex = require('../db');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

router.get('/user', function(req, res, next) {
  if (req.session.id) {
    knex('users')
    .returning('*')
    .where('users.id', req.session.id)
    .then(user => res.send({"code": 200, "user": user}))
    .catch(err => next(err))
  } else {
    console.log('no session id');
    res.send({"code": 403, "success": "No session id exists."});
  }
});

router.patch('/user', (req, res, next) => {
  if (req.session.id === req.body.id) {
    knex('users').where('id', req.body.id)
    .then((user) => {
      if (!user) {
        return next();
      }
      return knex('users').where('id', req.body.id).update({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email
      }).returning('*')
      .then((user) => {
        console.log('event data has been pulled from db');
        res.send({"code": 200, "message": "user data has been updated in db"})
      })
      .catch((err) => {
        console.log('error, user data not updated', err);
        res.send({"code": 204, "message": "error, user data not updated"});
      });
    });
  } else {
    //not authorized
    console.log('error, user data not updated', err);
    req.session = null;
    res.send({"status": 403, "message": "not authorized to submit changes"});
  }
});

router.get('/check', function(req, res, next) {
  if (req.session.id) {
    knex('users')
    .where('users.id', req.session.id)
    .returning('users.id')
    .then(user => res.send({"code": 200, "user": "User has session.id"}))
    .catch(err => next(err))
  } else {
    console.log('no session id');
    res.send({"code": 403, "success": "No session id exists."});
  }
});

module.exports = router;
