'use strict';

const logger = require('morgan');
const cors = require('cors');
const express = require('express');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const passport = require('passport');

module.exports = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use((err, req, res, next) => {
    if (err.name === 'StatusError') {
      res.send(err.status, err.message);
    } else {
      next(err);
    }
  });

  app.use(passport.initialize());
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  if (process.env.NODE_ENV === 'development') {
    app.use(express.logger('dev'));
    app.use(errorhandler())
  }

  require('./db')();
};
