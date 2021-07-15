import mongoose from "mongoose";
const CommentSch = new mongoose.Schema({
name: {type:String, default:"Anonymous"},
email:{type:String, default:""}, 
msg:String, 
date:{type:Date, default:new Date() },
isPublic:{type:Boolean, default:false}
});

export {CommentSch};
