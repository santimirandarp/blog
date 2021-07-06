const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const app = require('./app');

var options = {
    key: fs.readFileSync('/etc/pki/tls/mykey.pem'),
    cert: fs.readFileSync('/etc/pki/tls/mycert.pem'),
};

var portSecure = '443';
var port = '80';

var httpsServer = https.createServer(options, app).listen(portSecure, function(){
  console.log("https at port" + portSecure);
});

var httpServer = http.createServer(app).listen(port, function(){
console.log('http at port'+port)
})


