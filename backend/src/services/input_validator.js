const {ValidationError} = require('../middleware/errorHandling');

module.exports = class InputValidator {
//takes in json user_info object, and signup bool, if true then function
//validates object for signup function in the user service
  static validateUserSignupAndLoginInput(user_info,signup) {
    let validationErrorMessages = [];

    if (!user_info.username) {
      validationErrorMessages.push("Username is missing");
    }

    if (!user_info.password) {
      validationErrorMessages.push('Missing a password');
    }

    if (!user_info.email && signup===true) {
      validationErrorMessages.push('Missing email');
    }

    if(validationErrorMessages.length > 0){
      throw new ValidationError('The signup info you submitted is not valid', validationErrorMessages);
    }
  }
  static validateUserAuth(auth){
    if(!auth){
        throw new ValidationError('No JWT sent with request',[]);
    }
  }
  static validateDishCreation(dish_info){
    let validationErrorMessages = [];
    if(!dish_info.name){
      validationErrorMessages.push("Missing dish name");
    }
    if(!dish_info.calories){
      validationErrorMessages.push("Missing dish's calories");
    }
    if(!dish_info.macros){
      validationErrorMessages.push("Missing dish's macros");
    }
    if(dish_info.nutrients){
      if(!(dish_update.constructor===({}).constructor)) {
        validationErrorMessages.push('Need JSON object as input for nutrients', []); 
      }
    }
    if(dish_info.dietary_restrictions){
      if(!(dish_update.constructor===({}).constructor)) {
        validationErrorMessages.push('Need JSON object as input for dietary restrictions', []); 
      }
    }
    if(validationErrorMessages.length > 0){
      throw new ValidationError('The dish info you submitted is not valid: ', validationErrorMessages);
    }
  }
  //not sure if we need to validate correct keys here, or in database
  static validateDishUpdate(dish_update){
    if(!(dish_update.constructor===({}).constructor)) {
      throw new ValidationError('Need JSON object as input for updates', []); 
    }
  }
  static validateExerciseCreation(exercise_info){
    let validationErrorMessages = [];
    if(!exercise_info.name){
      validationErrorMessages.push("Need name for exercise")
    }
    if(!exercise_info.type){
      validationErrorMessages.push("Need type for exercise")
    }
    if(!exercise_info.bodyPartWorked){
      validationErrorMessages.push("Need a body part worked");
    }
    if(!(exercise_info.exercise_info.constructor === ({}).constructor)){
      validationErrorMessages.push("exercise info must be a json");
    }
    if(validationErrorMessages.length > 0){
      throw new ValidationError('The exercise info you submitted is not valid: ', validationErrorMessages);
    }
  }
  static validateExerciseSearch(body_parts){
    if(!Array.isArray(body_parts)){
      throw new ValidationError("body parts needs to be an array", []);
    }
  }
}
