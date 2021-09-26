'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:String,
  water: Array,
  sleep: Array,
  exercise: Array,
});

const UserModel = mongoose.model('user', userSchema);

let seeduser = () => {
  let newuser = new UserModel({
  });
  newuser.save();
};

module.exports = {userSchema,UserModel,seeduser};
