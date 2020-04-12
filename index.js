import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb+srv://VikasBisati:venkatavikas333#@react-blog-v4gqi.mongodb.net/test?retryWrites=true&w=majority", 
    {useNewUrlParser: true}).then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log("Error connecting to the database");
    });



app.listen(4000);