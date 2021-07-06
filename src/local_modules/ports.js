//exports.foo = 'foo';
//module.exports.bar = 'bar';
// default, use module.exports

module.exports = SERVER => {
  try{
    const server = SERVER.toUpperCase();
    server==='LOCAL'?  { porSecure: '8443', port: '8080' } :
      server==='REMOTE'?  { porSecure: '443', port: '80' }:
      throw 'SERVER is neither LOCAL nor REMOTE, or is not defined';
  } catch(err){ console.error(err) }
}
