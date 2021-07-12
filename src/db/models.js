import {CommentSch} from "./Schemas.js";
import mongoose from "mongoose";

const Comment = mongoose.model("comment", CommentSch);

export {Comment};
