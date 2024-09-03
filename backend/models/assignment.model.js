import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
    patient:{
        type:[mongoose.Schema.Types.Mixed]
    },
    staff:{
        type:[mongoose.Schema.Types.Mixed]
    },
    time:{
        type:Date,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Not Completed","Completed"],
        default:"Not Completed"
    }

},{timestamps:true})

const Assignment = mongoose.model("Assignment",assignmentSchema)

export default Assignment;
