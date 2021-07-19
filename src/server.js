//console.log(process.env);
const {SERVER} = process.env;

import https from "https";
import http from "http";
import app from "./app.js";

//return path to the TLS certificate and private key
import httpsOpts from "./local_modules/https.js";
const options = httpsOpts(process.env);

import portOpts from "./local_modules/ports.js";
const {portSecure, port} = portOpts(SERVER);

https.createServer(options,app)
  .listen(portSecure, function(){
      console.log("https at port "+portSecure);
      });

http.createServer(app)
  .listen(port, function(){
      console.log("http at port "+port);
      });

//https.on("error", e=> console.log(e));
//http.on("error", e=> console.log(e));
