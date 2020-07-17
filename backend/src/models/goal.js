const moment = require ('moment');
const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const goal_type = ["body_fat_goal", "weight_goal", "muscle_gain_goal","strength_gain_goal","endurance_goal","health_improvement"];
const strength_goal = ["goal_lift","goal_lift_weight","goal_sets","goal_reps"];
const endurance_goal = ["goal_distance","goal_time","goal_incline","goal_level"];
const Goal = db.define('Goal', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    intensity: {
        type: DataTypes.STRING,
        notNull: false,
        isIn: [['easy', 'medium','hard']]
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notInPast(value){
                if(moment(value).diff(moment(), 'days')<0){
                    throw new Error('Start date cant be before today')
                }
            }
        }
    },
    //would you ever have a goal that is same day?
    //value should be auto calculated as well
    expectedEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            customValidator(value){
                if(moment(value).diff(moment(),'days')<=0){
                    throw new Error('End date needs to be after start date')
                }
            }
        }
    },
    //contains goal type/value person is trying to reach
    goalInfo: {
        type: Sequelize.JSONB,
        allowNull: false,
        validate:{
            isGoalInfo(value){
                Object.keys(value).forEach(function(key){
                    if(!goal_type.includes(key)){
                        throw new Error("goal type not recognized");
                    }
                    if(key==="strength_gain_goal"){
                        Object.keys(value.key).forEach(function(key2){
                            if(!strength_goal.includes(key2)){
                                throw new Error("strength goal key type not recognized");
                            }
                        })
                    }
                    else if(key==="endurance_increase_goal"){
                        Object.keys(value.key).forEach(function(key2){
                            if(!endurance_goal.includes(key2)){
                                throw new Error("endurance goal key type not recognized");
                            }
                        })
                    }
                });
            }
        }
    }
    },{
        hooks:{
        }
    });
module.exports = Goal;