 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    firstname: String,
    lastname: String,
    email: {type:String, useCreateIndex: true},
    password: String,
    dateofbirth: Number

 })
let User;
User = mongoose.model('User', userSchema);
module.exports = User;

