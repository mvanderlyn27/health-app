require('dotenv').config()
const asyncHandler = require('express-async-handler');
var express =require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+process.env.USERDB, {useNewUrlParser: true, useUnifiedTopology: true});
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  pword: String
});
const User = mongoose.model('User', userSchema);
User.find(function (err, users){
    if(err) return console.lerror(err);
    console.log(users);
})



var upload = multer();
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.get('/', function(req,res){
    res.send('hello world');
});
app.post('/login', asyncHandler(async function(req,res){
//password hashed on user side, lookup name/hash
    console.log('login req');
    const user = await mongoose.model('User').find({email:req.body.email, pword: req.body.pword});
    res.json(user);
}));

app.post('/signup', asyncHandler(async function(req,res){
    console.log('signing up');
    const new_user = new User({fname:req.body.fname,lname:req.body.lname,email:req.body.email,pword:req.body.pword});
    const ret = await new_user.save();
    res.json(ret);
}));

app.listen(process.env.PORT, ()=>{
    console.log('Example app listening on port '+process.env.PORT)
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
    });
});