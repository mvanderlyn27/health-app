const MealLog = require("../models/meal_log");
const InputValidator = require('./input_validator');
const {UserValidationError, DatabaseError, NotFoundError, UserExistingError} = require ('../middleware/errorHandling');
class MealLogService{
   //need to think about what I need in here vs. what is available through association 
}
module.exports = MealLogService;