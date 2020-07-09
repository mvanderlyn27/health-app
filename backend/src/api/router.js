/* IMPORTS */
import UserService from '../services/user_service';
import protectRoute from './helper_functions';
const express = require('express');
const router = express.Router();

/* REST Endpoints */
router.post('/login', async function(req,res,next){
    console.log('login req');
    if(!req.body || !req.body.uname || !req.body.pword){
        return res.status(400).send({
            message: "Error: Need to fill out all required fields"
        });
    }
    let token = UserService.login({uname:req.body.uname, pword:req.body.pword});
    //check if token, if not throw error
    return res.json(token);
});

router.post('/signup', async function(req,res){
    console.log('signing up');
    if(!req.body || !req.body.uname || !req.body.email || !req.body.pword){
        return res.status(400).send({
            message: "Error: Need to fill out all required fields"
        });
    }
    let token = UserService.signup({uname:req.body.uname,email:req.body.email,pword:req.body.pword});
    //check if token, if not throw error
    return res.json(token);
});

router.get('/workouts', protectRoute, function(req, res){
    //access user with req.user
    console.log('fetching workouts');
    res.send("auth worked"); 
});

router.get('/',function (req,res){
    res.send("hello world");
})

module.exports = router;