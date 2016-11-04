const http = require('http');
const express = require('express');
const config = require('config');

let app = express();

require('./config')(app);
require('./models')(app);
require('./routes')(app);

const port = process.env.PORT || config.get('PORT');

http.createServer(app).listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log('listening in http://localhost:' + port);
});

