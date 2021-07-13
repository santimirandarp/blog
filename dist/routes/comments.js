import {Comment} from "../db/models.js";
import multiparty from "multiparty";
import express from "express";
const router = express.Router();

/** Middleware for parsing multipart forms*/
const parseForm = (req,res,next)=>{
try {
  const hdr = req.headers["content-type"]
  if(hdr && hdr.split(';')[0]==="multipart/form-data"){
    let form  = new multiparty.Form();
    form.parse(req, (err,fields,files) => { req.body=fields; next()})
  } 
} catch(e){ console.log(e); next(createError(500)) }
}

const saveComment = (comment, done) => Comment.create(comment, done);
const getComments = (skip, limit, done) => { Comment.find({}).skip(parseInt(skip)).limit(parseInt(limit)).exec(done);}


router.post('/', parseForm, (req,res,next)=>{
    try{ 
if(req.body){
    console.log(req.body)
    const {name,email,message}=req.body;
    let comment = { name:name[0], email:email[0], msg:message[0] };
    saveComment(comment, (err,doc)=>{ 
        if(err) {console.log(err); next(createError(500))}
        console.log(doc);
        res.json(doc)
        })
    }
} catch(e) { next(createError(500))}
})

router.get('/:skip/:limit', (req,res)=>{
    const {skip, limit} = req.params
    getComments(skip,limit, (err,docs)=>{
        if(err) next(createError(500))
        console.log(docs);
        res.json(docs);
        })
    })

export default router
