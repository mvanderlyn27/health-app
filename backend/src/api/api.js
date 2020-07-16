/* IMPORTS */
const UserService = require('../services/user_service');
const DishService = require('../services/dish_service');
const express = require('express');
const {protectRoute} = require('./helper');
const router = express.Router();
/* REST Endpoints */

//user sections
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

//Dish Section
router.post('/dish/create', async function (req,res){
    console.log('creating dish');
    let dish = await DishService.create_dish(req.body);
    return res.json(dish.toJSON());
});
router.post('/dish/update', async function (req,res){
    console.log('updating dish');
    let dishes = await DishService.update_dish(req.body);
    console.log('successful update');
    //might need to turn into JSON not sure yet
    return res.json(dishes);
});
router.get('/dish/find', async function (req,res){
    console.log('getting dishes by ID');
    let dishes = await DishService.find_dishes(req.body);
    //might need to turn into JSON not sure yet
    return res.json(dishes);
});
router.get('/dish/list', async function (req,res){
    console.log('getting all dishes');
    let dishes = await DishService.list_dishes();
    //might need to turn into JSON not sure yet
    return res.json(dishes);
});
router.get('/dish/search', async function (req,res){
    console.log('searching dishes by name');
    let dishes = await DishService.search_dishes(req.body);
    //might need to turn into JSON not sure yet
    return res.json(dishes);
});
router.post('/dish/delete', async function (req,res){
    console.log('deleting dishes by ID');
    await DishService.delete_dishes(req.body);
    return res.send(200);
});

//Exercise section
router.get('/workouts', protectRoute, function(req, res){
    //access user with req.user
    console.log('fetching workouts');
    res.send("auth worked"); 
});

router.get('/',function (req,res){
    res.send("hello world");
})

module.exports = router;