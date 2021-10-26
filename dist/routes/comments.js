import {Comment} from "../db/models.js";
import express from "express";
import createError from "http-errors";
/** Express validator to perform very simple validation on user input */
import { body, validationResult } from "express-validator";

const router = express.Router();
const ISE = "Internal Server Error. Please try again later.";

/** Save comment to database using mongoose model, create method @param comment,  done. */
const saveComment = (comment, done) => Comment.create(comment, done);
const getComments = (skip, limit, done) => { Comment.find({isPublic:true})
  .sort({date:-1})
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .exec(done);
};

router.use(express.json());
router.post("/", 
    body("email").isEmail().normalizeEmail().optional({nullable:true}),
    body("name").trim().escape().optional({nullable:true}),
    body("msg").not().isEmpty().trim().escape(),
    (req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())  { return res.status(422).json({ errors: errors.array() }); }

    //eslint-disable-next-line no-unused-vars
    try{ saveComment(req.body, (err,doc) => { 
        if(err)  throw new Error(err);
        res.json({msg:"Success"}); 
        });
    } catch(e) { console.error(e);
    next(createError(500, ISE)); 
    }
    });

router.get("/:skip/:limit", async(req,res,next) => {
    const {skip, limit} = req.params;
    await getComments(skip,limit, (err,docs) => {
        if(err) next(createError(500, ISE));
        res.json(docs);
        });
    });

/** error handling for this route, error handlers always take 4 params */
//eslint-disable-next-line no-unused-vars
const dbError = (err,req,res,next) => res.status(err.status).json(err);
router.use(dbError);

export default router;
