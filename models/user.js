const { rejects } = require('assert');
const mongoose = require('mongoose');
const { resolve } = require('path');

const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const roomSchema = new Schema({
    
    rName: String,
    rPrice: Number,
    rDesc: String,
    City: String,
    image: String

});


const userSchema = new Schema({
    
    name: String,
    lname: String,
    email: {type:String, useCreateIndex: true},
    Add: String,
    dob: Date,
    "admin": {type: Boolean, default: false}

});
 

  
let Users;
let Rooms;
let db;

module.exports.start = function(){

         const url = 'mongodb+srv://dbUser:Jesus@2015@senecaweb.4tsdj.mongodb.net/Assignment?retryWrites=true&w=majority'

         mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true });
         db = mongoose.connection;
         db.once('open', () => {
         Users = db.model("Users", userSchema);
         //module.exports.Rooms = db.model("Rooms", roomSchema);
         Rooms = db.model("Rooms", roomSchema);

         console.log('Database connected:', url);
         
        }); 

}



module.exports.saveUser = function(usr) {
   
    
    bcrypt.hash(usr.Add, 10, function(err, hash) {
        usr.Add = hash;
      });
    const c = new Users(usr);
    return c.save();
   
}




module.exports.saveRoom = function(room) {
     
    console.log(room);
    const a = new Rooms(room);
    return a.save();
   
}


module.exports.getRoom = function(){

    return new Promise((resolve, reject) => {
        Rooms.find({})
        .exec()
        .then((foundRooms) => {
            
            resolve(foundRooms.map(item=>item.toObject()));
        }).catch((err) => {
            console.log(`Error retrieving Rooms`);
            reject(err);
        })
    })
    
}


module.exports.getRoomByCity = function(data){

    console.log(data);
    return new Promise((resolve, reject) => {
        Rooms.find({City: data.City})
        .exec()
        .then((foundRooms) => {
            
            resolve(foundRooms.map(item=>item.toObject()));
        }).catch((err) => {
            console.log(`Error retrieving Rooms`);
            reject(err);
        })
    })
    
}


module.exports.getRoomByID = function(data){

    console.log(data);
    return new Promise((resolve, reject) => {
        Rooms.find({_id: data})
        .exec()
        .then((foundRooms) => {
            
            resolve(foundRooms.map(item=>item.toObject()));
        }).catch((err) => {
            console.log(`Error retrieving Rooms`);
            reject(err);
        })
    })
    
}

module.exports.editRoom = function(room){

    console.log(room.rnewName);
    return new Promise((resolve, reject) =>{
        Rooms.updateOne(
            {rName: room.rName},
            {$set: {
                rName: room.rnewName,
                rPrice: room.rnewPrice,
                rDesc: room.rnewDesc
                }
            }).exec()
            .then(()=>{
                console.log(`${room.rName} has been updated!`);
                resolve();
            }).catch((err)=>{
                console.log(`Error updating. ${err}`);
                reject(err);
            });
        }).catch(() =>{
            reject(`error updating meal`);
    });
    
}


module.exports.deleteRoom = function(room){

    console.log(room);
    return new Promise((resolve, reject)=>{
        Rooms.deleteOne({rName: room.rName})
        .exec()
        .then(()=>{
            resolve();
        })
        .catch(()=>{
            reject();
        });
    });

}


module.exports.validateUser = function(usr){
   
    return new Promise((resolve, reject) =>{
        if(usr){
            Users.findOne({Add: usr.psw}).exec()
            .then((foundUser) =>{
                                
                    if(foundUser){
                         console.log(`Validated user: ${foundUser}`);
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



