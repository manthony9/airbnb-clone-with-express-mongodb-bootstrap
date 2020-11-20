var express = require('express');
var app     = express();
var path    = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user')
app.use(bodyParser.urlencoded({ extended: true }));

/* set static directories
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+ '/html/test.html'))

});
app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname+ '/html/listing.html'))

});
        
app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname+ '/html/register.html'))

});
        
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname+ '/html/login.html'))

});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ',  port);

*/

app.use(express.static("./public"));

app.get('/', function (req, res) {
  
    res.sendFile(path.join(__dirname, "/public/nhtml/ntest.html"))

});

app.get('/nlisting', function (req, res) {
  
    res.sendFile(path.join(__dirname, "/public/nhtml/nlisting.html"))

});


app.get('/nlogin', function (req, res) {
  
    res.sendFile(path.join(__dirname, "/public/nhtml/nlogin.html"))

});


app.get('/nreg', function (req, res) {
  
    res.sendFile(path.join(__dirname, "/public/nhtml/nreg.html"))

});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ',  port);


function saveUser (usr) {
  const c = new User(usr)
  return c.save()
}

const url = 'mongodb+srv://dbUser:Jesus@2015@senecaweb.4tsdj.mongodb.net/Assignment?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true });
const db = mongoose.connection
db.once('open', _ => {
  
console.log('Database connected:', url)


app.post('/dashboard', (req, res) => {
  saveUser(req.body)
  .then(result => {
      res.redirect('/')
  })
  .catch(error => console.error(error))
});




})

// router.post("/register", function (req,res){

//   db.addUser(req.body);

//  });



/*

mongoose.connect("mongodb://localhost/web322_assign2");

// define the company schema
var userSchema = new Schema({
  "firstName":  String,
  "lastName": String,
  "email": String,
  "password": String,
  "dob": Number
});
// register the Company model using the companySchema
// use the web322_companies collection in the db to store documents
var User = mongoose.model("web322_assign2", userSchema);

// create a new user
var user1 = new User({
  firstName: "Fname",
  lastName: "Lname",
  email: "email@email.com",
  password: "password",
  dob: 0
});

// save the company
user1.save((err) => {
  if(err) {
    console.log("There was an error saving user1");
  } else {
    console.log("User1 was saved to the web322_assign2 collection");
  }
  // exit the program after saving
  process.exit();
});

user1.save((err) => {
  if(err) {
    console.log("There was an error saving User1");
  } else {
      console.log("User1 was saved to the web322_companies collection");
      Company.findOne({ firstName: "Fname" })
      .exec()
      .then((company) => {
          if(!company) {
              console.log("No User could be found");
          } else {
              console.log(company);
          }
          // exit the program after saving and finding
          process.exit();
      })
      .catch((err) => {
          console.log(`There was an error: ${err}`);
      });
  }   
});
*/