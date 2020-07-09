const User = require("../models/user");
const db = require('../database');
const jwt = require("jsonwebtoken");
const key = 'health is a gift';
/* HELPER FUNCTIONS */


export default class UserService{
    authenticateJWT = (authHeader)=>{
        if(authHeader){
            const token = authHeader.split(' ')[1];
            jwt.verify(token,key,function(err,user){
                if(err || !user){
                    return null;
                } 
                else{
                return user;
                }
            });
        }
        else{
            return null;
        }
    }
    //NEED TO CONVERT TO SEQUALIZE/POSTGRES//checks to make sure user doesn't exist, creates new user in user table
    //generates a jwt to be returned to the user to keep track of them being logged in
    async Signup(user_info){
        /* 
        //hash password before saving to sql
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        const user_data = new User({username:req.body.uname,email:req.body.email,password:req.body.pword});
        const new_user = await user_data.save();
        let token = jwt.sign(new_user.toJSON(),key,{ expiresIn: '1h' });
        */
       return null
    }
    //takes in user object, authenticates, returns JWT if authentication works
    async Login(user_info){
        /*let user = await User.findOne({username:req.body.uname});
        if(!user){
            return res.status(400).send({
                message: "Error: Username incorrect"
            });
        }
        */
        //might have to encrypt password before comparing them, check into bcrypt.compare first
       //lookup user with matching email, compare the pword with argument pword
       // const match = await bcrypt.compare(user_info.pword, result.password);
       /*
        var result = await user.authenticate(req.body.pword, next);
        if(!result){
            return res.status(400).send({
                message: "Error: Username/Password incorrect"
            });
        }
        console.log();
        let token = jwt.sign(user.toJSON(),key,{ expiresIn: '1h' });
        */
       return null;
    }
}