/* IMPORTS */
require('dotenv').config()
const express =require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const helmet = require('helmet');
import {db, test_connection} from './database';
//const mongoose = require('mongoose');
/*mongoose.connect('mongodb://mongo:27017/'+process.env.USERDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('Example app listening on port '+process.env.PORT)
});*/
const routes = require ('./api/router');
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
app.use(helmet());
app.use('/', routes);
app.listen(process.env.REST_PORT, ()=>{
  test_connection();
});