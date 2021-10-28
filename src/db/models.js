import {CommentSch, PostSch} from "./Schemas.js";
import mongoose from "mongoose";

const Comment = mongoose.model("comment", CommentSch); //db is comments
const Post = mongoose.model("post", PostSch); //db is posts

export {Comment, Post};
