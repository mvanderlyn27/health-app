const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const nutrients_types = ["saturated_fat","trans_fat","cholesterol","sodium","dietary_fiber","sugar","calcium","iron","potassium","vitamin_a","vitamin_b","vitamin_c","vitamin_d"];
const dietary_restriction_types = ["vegan_friendly","vegetarian_friendly","pescetarian_friendly","low_fat","low_carb","contains_nuts","contains_dairy","contains_eggs"];
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
    //measured in g
    fats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min:0
    },
    //measured in g
    carbohydrates: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min:0
    },
    //measured in g
    proteins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min:0
    },
    //later might be an array of ids, linking to ingredients ids, or other dish id's
    ingredients: {
        type: DataTypes.STRING,
    },
    dietary_restrictions: {
        type: DataTypes.JSONB,
        validate:{
            isNutrient(value){
                Object.keys(value).forEach(function(key){
                    if(!dietary_restriction_types.includes(key)){
                        throw new Error('not recognized dietary restriction type:'+key);
                    }
                    if(!(typeof value.key === "boolean")){
                        throw new Error('fields need to be booleans:'+value.key);
                    }
                });
            }
        }
    },
    //measured in g
    nutrients: {
        type: DataTypes.JSONB,
        validate:{
            isNutrient(value){
                Object.keys(value).forEach(function(key){
                    if(!nutrients_types.includes(key)){
                        throw new Error('not recognized nutrient type:'+key);
                    }
                    if(isNaN(value.key)){
                        throw new Error('fields need to be numbers:'+value.key);
                    }
                    if(value.key <0){
                        throw new Error('values must be greater than 0: '+key+' -> '+value.key);
                    }
                });
            }
        }
    },
    },{
        hooks:{
        }
    });
module.exports = Dish;