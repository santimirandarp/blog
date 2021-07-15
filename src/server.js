
const {NODE_ENV,SERVER,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE} = process.env;

import https from "https";
import http from "http";
import app from "./app.js";

//return path to the TLS certificate and private key
import httpsOpts from "./local_modules/https.js";
import portOpts from "./local_modules/ports.js";
const options = httpsOpts(NODE_ENV,KEYLOCAL,CERTLOCAL,KEYREMOTE,CERTREMOTE);
const {portSecure, port} = portOpts(SERVER);

https.createServer(options,app)
  .listen(portSecure, function(){
      console.log("https at port "+portSecure);
      });

http.createServer(app)
  .listen(port, function(){
      console.log("http at port "+port);
      });


