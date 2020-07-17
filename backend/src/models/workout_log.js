//when user starts a workout, create a new workout object (copy of scheduled one)
//insert it into this table too, and just update object as user does workout
//just needs to be set as a many-to-many relation from user to meal
const { Sequelize, DataTypes, Model } = require('sequelize');
const { db } = require('../database');
const WorkoutLog = db.define('MealLog', {
    user_id: DataTypes.INTEGER,
    workout_id: DataTypes.INTEGER,
    date: DataTypes.DATE
});
module.exports = WorkoutLog;