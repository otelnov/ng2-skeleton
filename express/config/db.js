'use strict';

const mongoose = require('mongoose');
const config = require('config');
const mongoDb = process.env.MONGO_DB || config.get('MONGO_DB');

module.exports = () => {
  console.log('db url: ' + mongoDb);
  let connection = mongoose.connect(mongoDb, {
    server: {
      auto_reconnect: true
    }
  }, function (err) {
    if (err) {
      throw err;
    }
  });

  mongoose.set('debug', config.get('MONGO_DB_DEBUG'));
};
