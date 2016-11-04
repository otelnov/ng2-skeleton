'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

module.exports = () => {
  const UserSchema = new Schema({
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true, select: false },
    name: String,
    isAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  UserSchema.methods.isPasswordValid = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  mongoose.model('Users', UserSchema, 'Users');
};
