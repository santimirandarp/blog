// environmental variables
import dotenv from 'dotenv';
dotenv.config();

const {SERVER,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE} = process.env;

import fs from 'fs'; //read filesystem
import https from 'https';
import http from 'http';
import express from 'express';
import app from './app';

//return path to the TLS certificate and private key
const options = require('./local_modules/https')(SERVER,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE)
//return port 443, 80 or 8443 and 8080 for Server or Local set
const {portSecure, port} = require('./local_modules/ports')(SERVER)

const httpsServer = https.createServer(options,app)
  .listen(portSecure, function(){
      console.log("https at port"+portSecure);
      });

const httpServer = http.createServer(app)
  .listen(port, function(){
      console.log('http at port'+port)
      })


