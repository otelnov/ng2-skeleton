const express = require('express');
const jwt = require('express-jwt');
const config = require('config');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const bcrypt = require('bcryptjs');

let app = module.exports = express.Router();

let jwtCheck = jwt({
  secret: config.get('SECRET')
});

let isAdmin = (req, res, next) => {
  if (req.user.isAdmin !== true) {
    return res.sendStatus(401);
  }
  next();
};

app.use('/api/protected', jwtCheck, isAdmin);

app.put('/api/protected/edit-user', editUser);
app.delete('/api/protected/delete-user/:id', deleteUser);
app.get('/api/protected/users', getUsers);

function getUsers(req, res) {
  Users.find().lean().exec((err, users) => res.json({ error: err, users }));
}

function editUser(req, res) {
  let data = req.body;
  Users.update({ _id: data._id }, { $set: data }).exec(error => {
    res.json({ error });
  });
}

function deleteUser(req, res) {
  let _id = req.params.id;
  Users.find({ _id }).remove().exec(error => {
    res.json({ error });
  });
}
