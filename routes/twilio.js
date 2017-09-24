var express = require('express');
var router = express.Router();

router.get('/task', function(req, res, next) {
  res.json({
    confirmation: 'success',
    message: 'It worked',
  });
});

router.post('/task', function(req, res, next) {
  console.log('TWILIO: ' + JSON.stringify(req.body));
  res.send('Hello!');
});

module.exports = router;
