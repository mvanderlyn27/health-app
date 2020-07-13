/* IMPORTS */
require('dotenv').config()
require('express-async-errors');
const express =require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const helmet = require('helmet');
const {db, test_connection} = require('./database');
const routes = require ('./api/api');
const { userAuthErrorHandler, inputValidationErrorHandler,
        databaseErrorHandler, userExistingErrorHandler,
        notFoundErrorHandler, defaultErrorHandler,
        } = require('./middleware/middleware');
/* Sets up express middleware */
var upload = multer();
var app = express();
app.use(userAuthErrorHandler);
app.use(inputValidationErrorHandler);
app.use(databaseErrorHandler);
app.use(userExistingErrorHandler);
app.use(notFoundErrorHandler);
app.use(defaultErrorHandler);
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(helmet());
app.use('/', routes);
app.listen(process.env.REST_PORT, async function(){
  console.log('running rest api at: '+process.env.REST_PORT);
});