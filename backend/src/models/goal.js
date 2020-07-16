const moment = require ('moment');
const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const Goal = db.define('Goal', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    intensity: {
        type: DataTypes.STRING,
        isIn: [['easy', 'medium','hard']]
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        notInPast(value){
            if(moment(value).diff(moment(), 'days')<0){
                throw new Error('Start date cant be before today')
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
        type: Sequelize.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('value'));
        },
        set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
        },
    },
    },{
        hooks:{
        }
    });
module.exports = Goal;