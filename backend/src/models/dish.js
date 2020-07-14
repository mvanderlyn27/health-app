const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const Dish = db.define('Dish', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min:0
    },
    ingredients: {
        type: Sequelize.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('value'));
        },
        set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
        }
    },
    //measured in g
    nutrients: {
        type: Sequelize.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('value'));
        },
        set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
        },
    },
    //measured in g
    macros: {
        type: Sequelize.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('value'));
        },
        set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
        },
    },
    dietaryRestrictions: {
        type: Sequelize.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('value'));
        },
        set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
        },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    },{
        hooks:{
        }
    });
module.exports = Dish;