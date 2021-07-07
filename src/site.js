// environmental variables
require('dotenv').config();
const {SERVER,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE} = process.env;

const fs = require('fs'); //read filesystem

const https = require('https');
const http = require('http');
const express = require('express');
const app = require('./app');

//return path to the TLS certificate and private key
const options = require('./local_modules/https')(SERVER)
//return port 443, 80 or 8443 and 8080 for Server or Local set
const {portSecure, port} = require('./local-modules/ports')(SERVER)

const httpsServer = https.createServer(options,app)
  .listen(portSecure, function(){
      console.log("https at port"+portSecure);
      });

const httpServer = http.createServer(app)
  .listen(port, function(){
      console.log('http at port'+port)
      })


