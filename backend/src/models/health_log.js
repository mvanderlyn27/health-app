const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const HealthLog= db.define('HealthLog', {
    weight: {
        type: DataTypes.Integer,
        min:1
    },
    averageHeartRate: {
        type: DataTypes.Integer,
        min:1
    },
    muscleMass: {
        type: DataTypes.Integer,
        min:1
    },
    bodyFatPercent: {
        type: DataTypes.Integer,
        min:1
    },
    systolicBloodPressure: {
        type: DataTypes.Integer,
        min:1
    },
    diastolicBloodPressure: {
        type: DataTypes.Integer,
        min:1
    },
    },{
        hooks:{
        }
    });
module.exports = HealthLog;