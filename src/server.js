
const {SERVER,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE} = process.env;

import fs from 'fs'; //read filesystem
import https from 'https';
import http from 'http';
import express from 'express';
import app from './app.js';

//return path to the TLS certificate and private key
import httpsOpts from './local_modules/https.js'
const options = httpsOpts(SERVER,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE)

//return port 443, 80 or 8443 and 8080 for Server or Local set
import portOpts from './local_modules/ports.js'
const {portSecure, port} = portOpts(SERVER)

const httpsServer = https.createServer(options,app)
  .listen(portSecure, function(){
      console.log("https at port"+portSecure);
      });

const httpServer = http.createServer(app)
  .listen(port, function(){
      console.log('http at port'+port)
      })


