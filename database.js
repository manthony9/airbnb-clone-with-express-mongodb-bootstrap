/*var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
var Schema = mongoose.Schema;

var userSchema = new Schema({
  "firstName":  String,
  "lastName":  String,
  "emailId": String,
  "psw": String,
  "userCount": {
    "type": Number,
    "default": 0
  },
  "dob": Number
});
var User = mongoose.model("web322_users", userSchema);

module.exports.initialize = function(){
    return new Promise((resolve, reject)=>{
        let db1 = mongoose.createConnection(`mongodb+srv://dbUser:<Jesus@2015>@senecaweb.4tsdj.mongodb.net/<dbname>?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
        db1.on('error', (err) =>{
            reject(err);
        });
        db1.once('open', ()=>{
            User = monDB.model("users", userSchema);
            resolve();
        });
    });
}

module.exports.addUser = function(data){ // create route - users
    console.log(data); // debug
    return new Promise((resolve, reject) =>{
        for(var formEntry in data){
            if(data[formEntry] == "")
            data[formEntry] = null;
        }
        bcrypt.genSalt(10)
            .then(salt=>bcrypt.hash(data.password,salt))
            .then(hash=>{
                let newUser = new User(data);
                newUser.psw = hash;
                newUser.save((err)=>{
                    if(err){
                        console.log(`Error ocurred during new user creation: ${err}`);
                        reject(err);
                    } else {
                        console.log(`New user: \n Name: ${data.firstName} \n Email: ${data.emailID} \n Added successfully!\n`);
                        resolve();
                    }
                });
            })
            .catch(err=>{
                console.log(err);
                reject("Hashing Error");
            });
    });
}
*/