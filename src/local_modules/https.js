//exports.foo = 'foo';
//module.exports.bar = 'bar';
// default, use module.exports
module.exports = SERVER => {
  try{
    const server = SERVER.toUpperCase()
      server==='LOCAL'? { 
key: fs.readFileSync(KEYLOCAL),
       cert: fs.readFileSync(CERTLOCAL) 
      }: server==='REMOTE'?  {
key: fs.readFileSync(KEYREMOTE),
       cert: fs.readFileSync(CERTREMOTE)
      }: throw 'SERVER not defined, or not equal to LOCAL or REMOTE' 
} catch(err){ console.error(err) }}
