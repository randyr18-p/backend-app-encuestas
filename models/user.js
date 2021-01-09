const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UserSchema = Schema({
    first_name: String,
    last_name: String,
    UserName: String,
    email: String,
    password: String,
    is_active: Boolean
});

module.exports = mongoose.model('User', UserSchema);