const { rejects } = require('assert');
const mongoose = require('mongoose');
const { resolve } = require('path');
const { REPL_MODE_STRICT } = require('repl');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    name: String,
    lname: String,
    email: {type:String, useCreateIndex: true},
    Add: String,
    'dob-day': Number,
    'dob-month': Number,
    'dob-year': Number,
    "admin": {type: Boolean, default: false}

});
 

  
let Users

module.exports.start = function(){

         const url = 'mongodb+srv://dbUser:Jesus@2015@senecaweb.4tsdj.mongodb.net/Assignment?retryWrites=true&w=majority'

         mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true });
         const db = mongoose.connection
         db.once('open', () => {
         Users = db.model("Users", userSchema);
         console.log('Database connected:', url)
                 
 });
}

module.exports.saveUser = function(usr) {
   
    console.log(usr);
    const c = new Users(usr)
    return c.save();
   
}

module.exports.validateUser = function(usr){

    return new Promise((resolve, reject) =>{
        if(usr){
            Users.findOne({name: usr.uname}).exec()
            .then((foundUser) =>{
                                
                    if(foundUser){
                        // console.log(`Validated user: ${foundUser}`);
                        resolve(foundUser);
                    } else {
                        reject("Passwords do not match!");
                        return;
                    }
               
            }).catch((err)=>{
                console.log(`Validation error: ${err}`);
                reject(err);
                return;
            });
        }
    });

}



