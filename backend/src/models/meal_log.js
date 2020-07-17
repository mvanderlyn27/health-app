//just needs to be set as a many-to-many relation from user to meal
const { Sequelize, DataTypes, Model } = require('sequelize');
const { db } = require('../database');
const MealLog = db.define('MealLog', {
    user_id: DataTypes.INTEGER,
    meal_id: DataTypes.INTEGER,
    date: DataTypes.DATE
});
module.exports = MealLog;
