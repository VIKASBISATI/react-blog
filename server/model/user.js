const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    const token = jwt.sign(this._id.toJSON(), 'secret');
    this.token = token;
    this.save((err,user)=> {
        if(err) return cb(err);
        return cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    jwt.verify(token, 'secret', (err,decode)=>{
        if(err) return cb(err);
        this.findOne({"_id": decode, "token": token}, (err,user)=> {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model("User", userSchema);
module.exports = { User };
