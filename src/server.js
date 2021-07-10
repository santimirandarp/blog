
const {NODE_ENV,SERVER,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE} = process.env;

import fs from 'fs'; //read filesystem
import https from 'https';
import http from 'http';
import express from 'express';
import app from './app.js';

//return path to the TLS certificate and private key
import httpsOpts from './local_modules/https.js'
import portOpts from './local_modules/ports.js'
const options = httpsOpts(NODE_ENV,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE) 
const {portSecure, port} = portOpts(SERVER)

//For example, before landing the site, we want NODE_ENV=development SERVER=REMOTE

const httpsServer = https.createServer(options,app)
  .listen(portSecure, function(){
      console.log("https at port "+portSecure);
      });

const httpServer = http.createServer(app)
  .listen(port, function(){
      console.log('http at port '+port)
      })


