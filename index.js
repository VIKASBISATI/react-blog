const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config =require('./config/key')
const { User } = require("./model/user");
const app = express();

mongoose.connect(config.mongoURI, 
    {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true}).then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log("Error connecting to the database",err);
    });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/user/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,resData)=>{
        if(err){
            return res.status(400).json({success: false, err});
        }
        return res.status(200).json({success:true, resData});
    })
})

app.listen(4000);