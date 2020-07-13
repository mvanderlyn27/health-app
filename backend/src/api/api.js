/* IMPORTS */
const UserService = require('../services/user_service');
const express = require('express');
const {protectRoute} = require('./helper');
const router = express.Router();
/* REST Endpoints */
router.post('/login', async function(req,res){
    let token = await UserService.login(req.body);
    return res.send(token);
});

router.post('/signup', async function(req,res){
    console.log('signing up');
    let token = await UserService.signup(req.body);
    console.log(token);
    return res.send(token);
});

router.get('/users', async function (req,res){
    let users = await UserService.load_users();
    console.log(users);
    return res.json(users);
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