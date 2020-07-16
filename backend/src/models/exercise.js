const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
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
    bodyPartWorked: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [['Chest','Back','Quads', 'Hamstrings','Biceps','Triceps', 'Shoulders', 'Glutes', 'Abdominals']]
    },
    //contains info related to exercise. For strength:
    // sets, reps, weight, rest
    // for endurance: time, distance, level, incline etc
    excerciseInfo: {
        type: Sequelize.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('value'));
        },
        set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
        }
    },
    comments: DataTypes.STRING,
    },{
        hooks:{
        }
    });
module.exports = Exercise;