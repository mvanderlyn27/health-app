const bcrypt = require('bcrypt');
const sequalize = require('sequalize');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pword: {
        type: DataTypes.STRING,
        allowNull: false
    }

});
/*const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type:String,
        unique: true,
        required: true,
        trim: true
    },
    password:{ 
        type: String,
        required: true
    }
});
userSchema.methods.authenticate = async function (pword) {
    const match = await bcrypt.compare(pword, this.password);
    return match;
}

//hashes users pword before saving
userSchema.pre('save', async function (next){
    var user = this;
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash;
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;*/