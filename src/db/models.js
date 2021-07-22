import {CommentSch, PostSch} from "./Schemas.js";
import mongoose from "mongoose";

const Comment = mongoose.model("comment", CommentSch);
const Post = mongoose.model("post", PostSch);

export {Comment, Post};
