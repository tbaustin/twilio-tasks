var express = require('express');
var router = express.Router();

var controllers = require('../controllers');

router.get('/task', function(req, res, next) {
  res.json({
    confirmation: 'success',
    message: 'It worked',
  });
});

router.post('/task', function(req, res, next) {
  console.log('TWILIO: ' + JSON.stringify(req.body));
  // TWILIO: {"ToCountry":"US","ToState":"IN","SmsMessageSid":"SM34ee8634ea26579
  // 94a736b0bca9ccb05","NumMedia":"0","ToCity":"NEW HARMONY","FromZip":"47713","SmsSid":"SM34ee8634ea2657994a736b0bca9ccb05"
  // ,"FromState":"IN","SmsStatus":"received","FromCity":"EVANSVILLE","Body":"This is my first task","FromCountry":"US","To":
  // "+18122704165","ToZip":"47631","NumSegments":"1","MessageSid":"SM34ee8634ea2657994a736b0bca9ccb05","AccountSid":"ACdfd3b
  // f617c99bcda156053ee2078ce98","From":"+18123194206","ApiVersion":"2010-04-01"}

  var message = req.body['Body'];
  var task = {
    title: 'Twilio Task',
    category: 'delivery',
    description: message,
  };

  var from = req.body['From']; // phone # of sender

  controllers.task
    .post(task, false)
    .then(result => {
      console.log('SUCCESS: ' + JSON.stringify(result));
      res.send('Hello');
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err,
      });
    });

  res.send('Hello!');
});

module.exports = router;
