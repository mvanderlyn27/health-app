const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const User = db.define('User', {
    //ie breakfast, lunch/dinner/custom meal
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //ml, ui can transfer units
    amountOfWater: {
        type: DataTypes.INTEGER,
        min:1
    },
    //date meal will/did take place
    date: {
        type:DataTypes.DATE,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    },{
        hooks:{
        }
    });
module.exports = User;