const UserService = require ('../services/user_service');
const {UnauthorizedUserError} = require('../middleware/errorHandling');
async function protectRoute(req,res,next){
    console.log("authorizing");
        let user = await UserService.authenticateJWT(req.headers.authorization);
        console.log(user);
        if(user){
            req.user = user;
            next();
        }
    else{
        throw new UnauthorizedUserError('Please login/signup');
    }
}
module.exports = {protectRoute};