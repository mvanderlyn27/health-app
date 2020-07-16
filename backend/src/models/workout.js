const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //seconds
    //date workouts scheduled for
    date: DataTypes.DATE,
    },{
        hooks:{
        }
    });
module.exports = User;