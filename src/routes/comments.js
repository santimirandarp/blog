import {Comment} from "../db/models.js";
import express from "express";
import { body } from 'express-validator';

const router = express.Router();
const ISE = 'Internal Server Error. Please try again later.'

/** Save comment to database using mongoose model, create method @param comment,  done. */
const saveComment = (comment, done) => Comment.create(comment, done);
const getComments = (skip, limit, done) => { Comment.find({})
    .sort({date:-1})
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .exec(done);
}


app.use(express.json())
router.post('/', 
  body('email').isEmail().normalizeEmail(),
  body('name').not().isEmpty().trim().escape(),
  body('msg').not().isEmpty().trim().escape(),
  (req,res,next)=>{
    try{ 
    saveComment(req.body, (err,doc) => { 
        if(err) {
        next(createError(500, "Couldn't save the document. Try again."));
        }
        res.json(doc) 
        })
    } catch(e) { 
    next(createError(500, ISE))
    }
    })

router.get('/:skip/:limit', (req,res)=>{
    const {skip, limit} = req.params
    getComments(skip,limit, (err,docs)=>{
        if(err) next(createError(500, ISE))
        res.json(docs);
        })
    })

/** error handling for this route, error handlers always take 4 params */
const dbError = (err,req,res,next) => {
console.error(err)
res.status(err.status).send(err.msg) 
}
router.use(dbError)
export default router
