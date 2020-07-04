/* IMPORTS */
require('dotenv').config()
const express =require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require ('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+process.env.USERDB, {useNewUrlParser: true, useUnifiedTopology: true});
const routes = require ('./routes/router');
/* Sets up express middleware */
var upload = multer();
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(session({
    secret: 'health is key',
    resave: true,
    saveUninitialized: false
}));
app.use('/', routes);
app.listen(process.env.PORT, ()=>{
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('Example app listening on port '+process.env.PORT)
    });
});