const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const WorkoutPlan = db.define('WorkoutPlan', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: { 
        type: DataTypes.DATE,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    },{
        hooks:{
        }
    });
module.exports = User;