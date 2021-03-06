const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const User = db.define('User', {
    path: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    bodyPosition: {
        type: DataTypes.STRING,
    },
    },{
        hooks:{
        }
    });
module.exports = User;