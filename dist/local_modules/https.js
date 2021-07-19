import fs from "fs";
export default ({NODE_ENV:env, KEYLOCAL:kl, CERTLOCAL:cl, KEYREMOTE:kr,CERTREMOTE:cr}) => {
  if(env=="development") return { key: fs.readFileSync(kl), cert: fs.readFileSync(cl) };
  if(env=="production") return { key: fs.readFileSync(kr), cert: fs.readFileSync(cr) };
  //will be catch by express (sync function).
  throw new Error("NODE_ENV != development or production");
}
