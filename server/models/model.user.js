const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel