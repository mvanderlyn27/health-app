/* IMPORTS */
const express = require('express');
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const key = 'health is a gift';


/* HELPER FUNCTIONS */
const authenticateJWT = (req,res,next)=>{
    console.log("authorizing");
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,key,function(err,user){
            if(err || !user){
                 res.status(400).send({
                    message: "Error: Failed authorizing, please login again"
                });
            }
            else{
            req.user = user;
            next();
            }
        });
    }
    else{
        res.status(401).send({
            message: "Error: Not logged in, please login again"
        });
    }

}

/* REST Endpoints */
router.post('/login', async function(req,res,next){
    console.log('login req');
    let user = await User.findOne({username:req.body.uname});
    if(!user){
        return res.status(400).send({
            message: "Error: Username incorrect"
        });
    }
    var result = await user.authenticate(req.body.pword, next);
    if(!result){
        return res.status(400).send({
            message: "Error: Username/Password incorrect"
        });
    }
    console.log();
    let token = jwt.sign(user.toJSON(),key,{ expiresIn: '1h' });
    return res.json(token);
});

router.post('/signup', async function(req,res){
    console.log('signing up');
    if(!req.body || !req.body.uname || !req.body.email || !req.body.pword){
        return res.status(400).send({
            message: "Error: Need to fill out all required fields"
        });
    }
    const user_data = new User({username:req.body.uname,email:req.body.email,password:req.body.pword});
    const new_user = await user_data.save();
    let token = jwt.sign(new_user.toJSON(),key,{ expiresIn: '1h' });
    return res.json(token);
});
router.get('/workouts', authenticateJWT, function(req, res){
    //access user with req.user
    console.log('fetching workouts');
    res.send("auth worked"); 
});
router.get('/',function (req,res){
    res.send("hello world");
})

/*
// logout needs to be handled on front end, remove token from local storage
router.get('/logout', asyncHandler(async function (req,res,next){
    if(req.session){
        await req.session.destroy();
        return res.redirect('/');
    }
}));
*/
module.exports = router;