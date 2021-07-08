//exports.foo = 'foo';
//module.exports.bar = 'bar';
// default, use module.exports

module.exports = SERVER => {
  try{
    const server = SERVER.toUpperCase();
console.log(server)
    if(server==='LOCAL'){return{ portSecure: '8443', port: '8080' }
} else if (server==='REMOTE') {return  { portSecure: '443', port: '80' } }
else { return "server isnt REMOTE or LOCAL or is not defined"}
      
  } catch(err){ console.error(err) }
}
