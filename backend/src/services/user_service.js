const User = require("../models/user");
const jwt = require("jsonwebtoken");
const InputValidator = require('./input_validator');
const {UserValidationError, DatabaseError, NotFoundError, AlreadyExistingError} = require ('../middleware/errorHandling');
const key = 'health is a gift';
class UserService{
    static authenticateJWT(authHeader){
        InputValidator.validateUserAuth(authHeader);
        const token = authHeader.split(' ')[1];
        try{
            let user = jwt.verify(token, key);
            return user;
        }catch(e){
            throw new UserValidationError('User not authorized, please sign back in');
        }
    }

    //generates a jwt to be returned to the user to keep track of them being logged in
    static async signup(user_info){
        InputValidator.validateUserSignupAndLoginInput(user_info,true);
        let new_user = await User.create(user_info);
        if(!new_user){
            throw new AlreadyExistingError("User already exists, please change username");
        }
        let token = jwt.sign(new_user.toJSON(),key,{expiresIn:'1h'});
        return token;
   }
   
    //takes in user object, authenticates, returns JWT if authentication works
    static async login(user_info){
        InputValidator.validateUserSignupAndLoginInput(user_info,false);
        let user = await User.findOne({where:{username:user_info.username}});
        if(!user){
            throw new NotFoundError("User does not exist");
        }
        if(!(await user.authPassword(user_info.password))){
            throw new UserValidationError('Wrong Password, please try again');
        }
        let token = jwt.sign(user.toJSON(),key,{ expiresIn: '1h' });
        return token;
   }
   //test function
   static async load_users(){
        let users = await User.findAll({raw:true});
        if(!users){
            throw new NotFoundError("No users found");
        }
        return users;
   }
   static async delete_users(){

   }
}
module.exports = UserService;