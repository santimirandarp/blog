import mongoose from "mongoose";
const CommentSch = new mongoose.Schema({
name:{type:String, default:"Anonymous"},
email:{type:String, default:""}, 
msg:String, 
date:{type:Date, default:new Date()},
isPublic:{type:Boolean, default:false},
commentOn:{type:String, default:"/"}
});

const PostSch = new mongoose.Schema({
title:{type:String,required:true},
tags:{type:[String]},
brief:{type:String, default:""}, 
date:{type:Date, default:new Date() },
path:{type:String}
});

export {CommentSch, PostSch};
