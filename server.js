var express = require('express');
var rooms = require('./public/JS/listing')
var app     = express();
var path    = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var ClientSessions = require('client-sessions');
const exphbs = require('express-handlebars');
const multer = require("multer");
app.engine('.hbs', exphbs());
app.set('view engine', 'hbs');
var router = express.Router();
var bcrypt = require('bcrypt');
const salt=10;
const User = require('./models/user')
app.use(bodyParser.urlencoded({ extended: true }));
User.start();

app.use(ClientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "Web322_Assignment_Secret", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));


/*-Multer-Storage -*/

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    // we write the filename as the current date down to the millisecond
    // in a large web service this would possibly cause a problem if two people
    // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

/*-Session Checkers -*/

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("lgn");
  } else {
    next();
  }
}

function ensureAdm(req, res, next) {
  if (!req.session.user || !req.session.user.admin) {
          res.redirect("lgn");
      } else {
          next();
      }
  }

app.use(express.static("./public"));

/*-Get Routes-*/

app.get('/', function(req,res){

res.render('hom',{
  user: req.session.user,
  layout:false
});

});

app.get('/lst', function (req, res) {

 
  User.getRoom().then((data) =>{
    console.log(req.session.user);
    res.render("lst", {
            roomData: (data.length!=0 ? data : undefined),
               layout:false,
               user: req.session.user
    })
}).catch((err)=>{
    console.log(`Error retrieving rooms data ${err}`);
})

});


app.get('/lgn', function (req, res) {
  
  res.render('lgn',{
    user: req.session.user,
    layout:false
  });

});


app.get('/book',  ensureLogin, function (req, res) {
  
  res.render('checkout',{
    user: req.session.user,
    layout:false
  });

});


app.post('/book', function (req, res) {
  
  const pri = req.body.pr;
  const stdt = new Date(req.body.checkin);
  const endt = new Date(req.body.checkout);
  const days = (endt.getTime() - stdt.getTime());
  const dayCal = (Math.ceil(days / (1000 * 3600 * 24)));
  console.log(dayCal);
  const total = pri * dayCal;

  console.log(total);
  
  res.render('checkout',{
    user: req.session.user,
    layout:false,
    start: req.body.checkin,
    end: req.body.checkout,
    price: pri,
    tot: total
  });

});


app.get('/roomDesc/:_id', function (req, res) {
  
  console.log(req.params);
  User.getRoomByID(req.params._id).then((data) =>{ 
    console.log(data);
    res.render("roomDesc", {
        
      roomData: (data.length!=0 ? data : undefined),
      layout:false,
      user: req.session.user,
      cityReq:true,
      ctData: data 
  })
}).catch((err)=>{
  console.log(`Error retrieving rooms data ${err}`);
});

});



app.get('/nregh', function (req, res) {
  
  res.render('nregh',{
    user: req.session.user,
    layout:false
  });

});


app.get('/admdash', ensureAdm, function (req, res) {
  
  //res.render('admdash',{
  //  user:req.session.user,
  //  layout:false,
  //  validity:true
  //});

  User.getRoom(req.body).then((data) =>{
  
   
    res.render("admdash", {
        roomData: (data.length!=0 ? data : undefined),
               layout:false,
               user: req.session.user,
               rmData: data 
    })
}).catch((err)=>{
    console.log(`Error retrieving rooms data ${err}`);
})

});

app.get('/dash', ensureLogin, function (req, res) {
  
  res.render('dash',{
    user: req.session.user,
    layout:false,
    validity:true
  });

});


app.get('/newlistings', ensureLogin, function (req, res) {
  
  res.render('newlistings',{
    user: req.session.user,
    layout:false,
    validity:true
  });

});

app.get("/lgo", (req,res)=>{

  req.session.reset();
  res.redirect("/lgn");

});



/*-Post Routes-*/


app.post('/dashboard', (req, res) => {
  
  User.saveUser(
    req.body)
  .then(result => {
    res.redirect("dash")
  })
  .catch(error => console.error(error))
  
});

app.post('/addRoom', upload.single("photo"), (req, res) => {
  
  req.body.image = req.file.filename;
  User.saveRoom(req.body).then(()=>{
      res.redirect("admdash");
  }).catch((err)=>{
      console.log(`Error adding Room!: ${err}`);
  });
  
});



app.post('/updRoom', (req, res) => {
  
  console.log(req.body.rnewName);
  User.editRoom(req.body).then(result=> {

    res.redirect("admdash");

  }).catch((err)=>{

    console.log(`Error updating room: ${err}`);

  });

});


app.post('/delRoom', (req, res) => {
  
  console.log(req.body.rName);
  User.deleteRoom(req.body).then(result=> {

    res.redirect("admdash");

  }).catch((err)=>{

    console.log(`Error Deleting room: ${err}`);

  });

});


app.post('/getCity', function (req, res) {
   
    User.getRoomByCity(req.body).then((data) =>{ 
      console.log(data);
      res.render("lst", {
          roomData: (data.length!=0 ? data : undefined),
                layout:false,
                user: req.session.user,
                cityReq:true,
                ctData: data 
    })
  }).catch((err)=>{
    console.log(`Error retrieving rooms data ${err}`);
  })
});



app.post('/login', (req, res) => {
  
  
  User.validateUser(
    req.body)
  .then((inData) => {
    req.session.user = inData;
    if (inData.admin){
      
      res.redirect("admdash")

    } else {
          res.redirect("dash")
      
    }
    
  })
  .catch(function(error){
    
    console.log(error);
    res.render('lgn', {validity:true, layout:false} );

  });
  
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ',  port);
