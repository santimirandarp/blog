import mongoose from "mongoose";
const CommentSch = new mongoose.Schema({ name: String, email:String, msg:String, date:{type:Date, default:new Date() }});

export {CommentSch};
