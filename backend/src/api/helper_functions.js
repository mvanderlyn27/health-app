const user_service = require ('../services/user_service');
export const protectRoute = (req,res,next)=>{
    console.log("authorizing");
        let user = UserService.authenticateJWT(req.headers.authorization);
        if(user){
            req.user = user;
            next();
        }
    else{
        res.status(401).send({ message: "Error: Not logged in, please login again" });
    }
}
