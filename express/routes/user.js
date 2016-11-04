const express = require('express');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const ejwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let app = module.exports = express.Router();

function createToken(user) {
  console.log(user);
  delete user.password;
  console.log(user);


  return jwt.sign(_.omit(user, ['password']), config.get('SECRET'));
}

let jwtCheck = ejwt({
  secret: config.get('SECRET')
});

app.use('/api/user', jwtCheck);

app.post('/api/sessions/create-user', createUser);
app.get('/api/sessions/current', jwtCheck, getCurrent);
app.post('/api/sessions/create', createSession);

// app.get('/api/sessions/facebook',
//   passport.authenticate('facebook', { scope: 'email' })
// );
// app.get('/api/sessions/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })
// );

app.get('/api/sessions/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

app.get('/api/sessions/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://localhost:3001/login?id_token=' + createToken(req.user));
  });

app.put('/api/user/password', changePassword);

function getCurrent(req, res) {
  Users.findById(req.user._id).lean().exec((error, user) => {
    res.json({ error, user });
  });
}

function createSession(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.json({ error: 'email and password are required' });
  }
  Users.findOne({
    email: new RegExp('^' + email + '$', 'i')
  }).select('+password').exec((err, user) => {
    if (!user) {
      return res.json({ error: 'user not found' });
    }
    if (!user.isPasswordValid(password)) {
      return res.json({ error: 'wrong password' });
    }
    res.status(201).send({
      id_token: createToken(user)
    });
  });
}

// passport.use(new FacebookStrategy({
//   clientID: config.get('FACEBOOK_APP_ID'),
//   clientSecret: config.get('FACEBOOK_APP_SECRET'),
//   callbackURL: config.get('FACEBOOK_CALLBACK')
// }, function (accessToken, refreshToken, profile, done) {
//   console.log(profile);
//   done(null, {});
//   // User.findOrCreate(..., function(err, user) {
//   //   if (err) { return done(err); }
//   //   done(null, user);
//   // });
// }));

passport.use(new GoogleStrategy({
  clientID: config.get('GOOGLE_CLIENT_ID'),
  clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
  callbackURL: config.get('GOOGLE_CALLBACK')
}, function (accessToken, refreshToken, profile, done) {
  if (profile && profile.emails.length) {
    let email = profile.emails[0].value;
    Users.findOne({
      email: new RegExp('^' + email + '$', 'i')
    }).exec((err, user) => {
      if (!err && user) {
        return done(err, user)
      }
      if (!err && !user) {
        let newUser = new Users({
          email,
          password: accessToken,
          name: profile.name.givenName + ' ' + profile.name.familyName
        });
        newUser.save((err, data) => {
          delete data.password;
          done(err, data);
        })
      }
    });
  }
}));

function createUser(req, res) {
  let salt = bcrypt.genSaltSync(10);
  let data = req.body;
  data.password = bcrypt.hashSync(data.password, salt);
  Users.count({ email: new RegExp('^' + data.email + '$', 'i') }).exec((err, count) => {
    if (count > 0) {
      return res.json({ error: 'User already exists.' });
    }
    let user = new Users(data);
    user.save((err, newUser) => {
      delete newUser.password;
      res.json({ error: err, user: newUser, id_token: createToken(newUser) });
    })
  })
}

function changePassword(req, res) {
  let salt = bcrypt.genSaltSync(10);
  let newPass = bcrypt.hashSync(req.body.password, salt);
  Users.update({ _id: req.user._id }, { $set: { password: newPass } }).exec(error => {
    res.json({ error });
  });
}
