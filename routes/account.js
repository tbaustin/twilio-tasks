var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var controllers = require('../controllers');

router.get('/:action', function(req, res, next) {
  var action = req.params.action;
  if (action == 'currentuser') {
    if (req.session == null) {
      res.json({
        confirmation: 'success',
        user: null,
      });
      return;
    }

    if (req.session.token === undefined) {
      res.json({
        confirmation: 'success',
        user: null,
      });
      return;
    }

    jwt.verify(req.session.token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: 'Access Denied',
        });
        return;
      }

      controllers.profile
        .getById(decoded.id, false)
        .then(result => {
          res.json({
            confirmation: 'success',
            user: result,
          });
        })
        .catch(error => {
          res.json({
            confirmation: 'fail',
            message: error,
          });
        });
    });
  }

  if (action == 'logout') {
    req.session.reset();
    res.json({
      confirmation: 'success',
      user: null,
      message: 'User logged out',
    });
  }
});

router.post('/:action', function(req, res, next) {
  var action = req.params.action;
  if (action == 'register') {
    controllers.profile
      .post(req.body, false)
      .then(result => {
        var token = jwt.sign({ id: result.id }, process.env.TOKEN_SECRET, {
          expiresIn: 4000,
        });

        req.session.token = token;

        res.json({
          confirmation: 'success',
          user: result,
          token: token,
        });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err,
        });
      });
  }
  if (action == 'login') {
    controllers.profile
      .get({ email: req.body.email }, true)
      .then(results => {
        if (results.length === 0) {
          throw new Error('User not found.');
        }

        var profile = results[0];
        // check password
        var isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          profile.password,
        );
        if (isPasswordCorrect === false) {
          throw new Error('Wrong Password');
        }

        var token = jwt.sign({ id: profile._id }, process.env.TOKEN_SECRET, {
          expiresIn: 4000,
        });

        req.session.token = token;

        res.json({
          confirmation: 'success',
          user: profile.summary(),
        });
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err.message,
        });
      });
  }
});

module.exports = router;
