const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
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
/*userSchema.statics.authenticate = function (email,pword,callback){
    console.log('test');
    User.findOne({email:email}).exec(function(err,user){
        console.log('test2');
        if(!user){
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(pword,user.pword, function(err, result){
            if(result==true){
                return callback(null,user);
            }
            else{
                return callback();
            }
        })
    });
}*/
userSchema.methods.authenticate = function (pword, callback) {
    console.log(pword, this.password);
      bcrypt.compare(pword, this.password, function (err, result) {
          console.log(err);
          if(err) callback(err);
          callback(null,result)
      });
}

//hashes users pword before saving
userSchema.pre('save', function (next){
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        user.password = hash;
        next();
    })
});

const User = mongoose.model('User', userSchema);
module.exports = User;