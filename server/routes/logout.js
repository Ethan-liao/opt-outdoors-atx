var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session);
  req.session = null;
  res.send({
    "code": 200,
    "success": "Logout successful"
  });
});

module.exports = router;
