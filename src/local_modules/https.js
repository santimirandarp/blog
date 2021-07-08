//exports.foo = 'foo';
//module.exports.bar = 'bar';
// default, use module.exports
module.exports = SERVER => {
  try{
    const server = SERVER.toUpperCase()
      console.log(server)
      if(server==='LOCAL') {return { 
key: fs.readFileSync(KEYLOCAL),
       cert: fs.readFileSync(CERTLOCAL)
      }} else if(server==='REMOTE') {
return { 
key: fs.readFileSync(KEYREMOTE),
     cert: fs.readFileSync(CERTREMOTE)
        }} else {
throw 'SERVER isnt REMOTE or LOCAL or is not defined'
}}
       catch(err){ console.error(err) }}
