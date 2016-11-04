'use strict';
const express = require('express');
const path = require('path');

module.exports = (app) => {
  app.use((req, res, next) => {
    console.log(req.method + ': ', req.url);
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });
  app.use('/', express.static(path.resolve('../dist/')));

  app.use(require('./guests'));
  app.use(require('./admin'));
  app.use(require('./user'));

  app.all('/*', (req, res) => {
    res.sendfile(path.resolve('../dist/index.html'));
  });
};
