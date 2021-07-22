import mongoose from "mongoose";
const CommentSch = new mongoose.Schema({
name: {type:String, default:"Anonymous"},
email:{type:String, default:""}, 
msg:String, 
date:{type:Date, default:new Date() },
isPublic:{type:Boolean, default:false}
});

const PostSch = new mongoose.Schema({
title: {type:String,required:true},
brief:{type:String, default:""}, 
date:{type:Date, default:new Date() },
location:{type:String}
});

export {CommentSch, PostSch};
