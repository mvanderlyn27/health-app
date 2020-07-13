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
}
