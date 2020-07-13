const bcrypt = require('bcrypt');
const { Sequelize, DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    },{
        hooks:{
            beforeCreate: hashPass,
            beforeUpdate: hashPass         
        }
    });
    User.prototype.authPassword = async function(pword){
            return await bcrypt.compare(pword, this.password);
    }
async function hashPass(user){
    if (!user.changed('password')) return;
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
module.exports = User;