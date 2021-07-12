//exports.foo = "foo";
//module.exports.bar = "bar";
// default, use module.exports
import fs from "fs";
export default (NODE_ENV, KEYLOCAL, CERTLOCAL, KEYREMOTE,CERTREMOTE) => {
  try{
      if(NODE_ENV==="development") {return { 
key: fs.readFileSync(KEYLOCAL),
       cert: fs.readFileSync(CERTLOCAL)
      }} else if(NODE_ENV==="production") {
return { 
key: fs.readFileSync(KEYREMOTE),
     cert: fs.readFileSync(CERTREMOTE)
        }} else {
throw "NODE_ENV != development or production"
}}
       catch(err){ console.error(err) }}
