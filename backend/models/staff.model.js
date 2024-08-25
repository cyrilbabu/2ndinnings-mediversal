import mongoose from "mongoose";

const staffSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    username:{
        type:String,
        required:true,
        unique:true
        
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Front Desk","Care Manager","Home Care Staff","Accessor"],
        required:true

    }

})