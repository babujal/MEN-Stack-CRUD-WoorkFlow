const { boolean } = require('webidl-conversions');
const mongoose = require('./connection');

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    alias: String,
    isAdmin: {type: Boolean, default: false}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;