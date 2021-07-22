import {CommentSch, BlogSch} from "./Schemas.js";
import mongoose from "mongoose";

const Comment = mongoose.model("comment", CommentSch);
const Post = mongoose.model("post", BlogSch);

export {Comment, Post};
