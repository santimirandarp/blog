const fs = require('fs')
const https = require('https')
const http=require('http')
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello HTTPS!')
})

const  pkey= fs.readFileSync(__dirname+'/../server.pkey')
const  cert= fs.readFileSync(__dirname+'/../server.cert')

const credentials = {key: pkey, cert: cert};

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);


