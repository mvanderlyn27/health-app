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
        databaseErrorHandler, alreadyExistingErrorHandler,
        notFoundErrorHandler, defaultErrorHandler,
        } = require('./middleware/errorHandling');
/* Sets up express middleware */
var upload = multer();
var app = express();
app.use(userAuthErrorHandler);
app.use(inputValidationErrorHandler);
app.use(databaseErrorHandler);
app.use(alreadyExistingErrorHandler);
app.use(notFoundErrorHandler);
app.use(defaultErrorHandler);
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(helmet());
app.use('/', routes);
app.listen(process.env.REST_PORT, async function(){
  console.log('running rest api at: '+process.env.REST_PORT);
  await db.sync();
  console.log('db synced');
  //if you change files later use migrations/turn off sync
});