/*
// Named exports
export var Count = 5;
export function Multiply(a, b) {
  return a * b;
}

// Default export
export default {
  // Some data...
};
*/

import fs from "fs";
export default ({
NODE_ENV:env,
KEYLOCAL:kl,
CERTLOCAL:cl,
KEYREMOTE:kr,
CERTREMOTE:cr
}) => {
  if(env=="development") return { key: fs.readFileSync(kl), cert: fs.readFileSync(cl) };
  else if(env=="production") return { key: fs.readFileSync(kr), cert: fs.readFileSync(cr) };
  //will be catch by express (sync function).
  else{throw new Error("NODE_ENV != development or production");}
};
