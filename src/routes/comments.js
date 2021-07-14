import {Comment} from "../db/models.js";
import multiparty from "multiparty";
import express from "express";
const router = express.Router();
const ISE = 'Internal Server Error. Please try again later.'

/** Middleware for parsing multipart forms*/
const parseForm = (req,res,next)=>{
  try {
    const hdr = req.headers["content-type"]
      if(hdr && hdr.split(';')[0]==="multipart/form-data"){
        let form  = new multiparty.Form();
        form.parse(req, (err,fields,files) => { req.body=fields; next()})
      } 
  } catch(e){ next(createError(500, ISE )) }
}

/** Save comment to database using mongoose model, create method @param comment,  done. */
const saveComment = (comment, done) => Comment.create(comment, done);
const getComments = (skip, limit, done) => { Comment.find({})
    .sort({date:-1})
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .exec(done);
}


router.post('/', parseForm, (req,res,next)=>{
    try{ 
    const {name,email,message}=req.body;
    let comment = { name:name[0], email:email[0], msg:message[0] };
    saveComment(comment, (err,doc) => { 
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
