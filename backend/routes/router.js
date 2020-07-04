const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require("../models/user");


/* REST Endpoints */
router.post('/login', asyncHandler(async function(req,res,next){
    console.log('login req');
    User.findOne({username:req.body.uname}, function(err,user){
        if(err){
            throw(err);
        }
        else if(!user){
            let error = new Error("wrong username");
            error.status = 401;
            next(error);
        }
        else{
            user.authenticate(req.body.pword, function(err, isMatch){
                if(err){
                    throw(err);
                }
                if(isMatch){
                    console.log('successful login', isMatch);
                    req.sessionId = user._id;
                    res.send(user);
                }
                else{
                    next('wrong user/pass');
                }
            });
        }
    });
}));

router.post('/signup', asyncHandler(async function(req,res){
    console.log('signing up');
    const new_user = new User({username:req.body.uname,email:req.body.email,password:req.body.pword});
    const ret = await new_user.save();
    req.session.userId = new_user._id;
    res.json(ret);
}));

router.get('/logout', asyncHandler(async function (req,res,next){
    if(req.session){
        await req.session.destroy();
        return res.redirect('/');
    }
}));
module.exports = router;