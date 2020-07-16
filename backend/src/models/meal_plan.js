const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const MealPlan = db.define('MealPlan', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    },{
        hooks:{
        }
    });
module.exports = MealPlan;