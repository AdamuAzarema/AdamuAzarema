var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');



router.use(bodyParser.json());

/* GET users listing. */


router.get('/', function (req, res, next) {
  User.find({})
    .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
});
router.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        if (req.body.firstname)
          user.firstname = req.body.firstname;
        if (req.body.lastname)
          user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
});


router.post('/login', passport.authenticate('local'), (req, res) => {

    // if (err) {
    //   return next(err);
    // }
    // if (!user) {
    //   return res.status(401).json({
    //     err: info
    //   });
    // }
    // req.logIn(user, function (err) {
    //   if (err) {
    //     return res.status(500).json({
    //       err: 'Could not log in user'
    //     });
    //   }
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, token: token, status: 'Login Successful!'});
    });

// Login alternative route

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   var token = authenticate.getToken({ _id: req.user._id });
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.json({ success: true, status: 'You are successfully logged in!', token: token });
// });

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'Logged out!'
  });
});


module.exports = router;
