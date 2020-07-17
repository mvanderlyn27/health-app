const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const strength_info = ["sets","reps","weight","rest"];
const endurance_info = ["time","distance","level","incline"];
const Exercise = db.define('Exercise', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [['Endurance', 'Strength','Flexibility','Balance']]
    },
    body_part_worked: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [['Chest','Back','Quads', 'Hamstrings','Biceps','Triceps', 'Shoulders', 'Glutes', 'Abdominals']]
    },
    //contains info related to exercise. For strength:
    // sets, reps, weight, rest
    // for endurance: time, distance, level, incline etc
    excercise_info: {
        type: Sequelize.JSONB,
        validate: {
            is_exercise_info(value){
                Object.keys(value).forEach(function(key){
                    let check = (key==="Strength")?strength_info:endurance_info;
                    Object.keys(value.key).forEach(function(key2){
                        if(!check.includes(key2)){
                            throw new Error("Value not accepted"+key2);
                        }
                        if(!isNaN(key2)){
                            throw new Error("Value must be a number");
                        }
                        if(value.key <0){
                            throw new Error("Value must be greater than 0");
                        }
                    }); 
                });
            }
        }
    },
    comments: DataTypes.STRING,
    },{
        hooks:{
        }
    });
module.exports = Exercise;