import https from "https"; 
import http from "http";
import app from "./app.js";
import httpsOpts from "./local_modules/https.js";
const options = httpsOpts(process.env); //TLS cert & key

import portOpts from "./local_modules/ports.js";
const {portSecure, port} = portOpts(process.env.SERVER);

https.createServer(options,app)
  .listen(portSecure, () => {
      console.log("https at port "+portSecure);
      });

http.createServer(app)
  .listen(port, () => {
      console.log("http at port "+port);
      });

