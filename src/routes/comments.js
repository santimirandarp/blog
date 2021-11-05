import {Comment} from "../db/models.js";
import express from "express";
import createError from "http-errors";
/** Express validator to perform very simple validation on user input */
import { body, validationResult } from "express-validator";

const router = express.Router();
const ISE = "Internal Server Error. Please try again later.";

// Mongoose async operations, like .save() and queries, return thenables. This means that you can do things like MyModel.findOne({}).then() and await MyModel.findOne({}).exec() if you're using async/await.

/** Save comment to database using mongoose model, create method @param comment,  done. 
Model.create returns a promise.
*/
const saveComment = async(comment, done) => Comment.create(comment, done);
/** Comment.find.exec also returns a promise */
const getComments = async(skip, limit, done) => Comment.find({isPublic:true})
  .sort({date:-1})
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .exec(done);

  router.use(express.json());
  router.post("/", 
      body("email").isEmail().normalizeEmail().optional({nullable:true}),
      body("name").trim().escape().optional({nullable:true}),
      body("msg").not().isEmpty().trim().escape(),
      async (req,res,next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }); }

      //eslint-disable-next-line no-unused-vars
      await saveComment(req.body, (err,doc) => { 
          if(err)  throw err;
          res.json({msg:"Success"}); 
          })
.catch(e => {console.error(e); next(createError(500, ISE));}); 
      });
  

  router.get("/:skip/:limit", async(req,res,next) => {
      const {skip, limit} = req.params;
      await getComments(skip,limit, (err,docs) => { 
        if(err) throw err;
        res.json(docs);})
.catch(e => {console.error(e); next(createError(500,ISE));});
});

/** error handling for this route, error handlers always take 4 params */
//eslint-disable-next-line no-unused-vars
const dbError = (err,req,res,next) => res.status(err.status).json(err);
router.use(dbError);

export default router;
