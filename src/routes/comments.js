import {Comment} from "../db/models.js";
import express from "express";
const router = express.Router();

const saveComment = (comment, done) => Comment.create(comment, done);
const getComments = (skip, limit, done) => { Comment.find({}).skip(parseInt(skip)).limit(parseInt(limit)).exec(done);}

router.post('/',(req,res)=>{
    if(res.locals.comment){
    const {name,email,message}=res.locals.comment;
    let comment = { name:name[0], email:email[0], msg:message[0] };
    saveComment(comment, (err,doc)=>{ 
        if(err) { res.status(500); res.send('server error'); console.log(err) };
        console.log(doc);
        res.json(doc)
        })
    }})

router.get('/:skip/:limit', (req,res)=>{
    const {skip, limit} = req.params
    getComments(skip,limit, (err,docs)=>{
        if(err) { res.status(500); res.send('server error'); console.log(err) };
        console.log(docs);
        res.json(docs);
        })
    })

export default router
