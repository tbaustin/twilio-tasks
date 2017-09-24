var express = require('express');
var router = express.Router();

router.get('/task', function(req, res, next) {
  res.json({
    confirmation: 'success',
    message: 'It worked',
  });
});

router.post('/task', function(req, res, next) {
  res.send('Hello!');
});

module.exports = router;
