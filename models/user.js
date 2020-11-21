 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    firstname: String,
    lastname: String,
    email: {type:String, useCreateIndex: true},
    password: String,
    dateofbirth: Number

 })

 module.exports = mongoose.model('User', userSchema);
