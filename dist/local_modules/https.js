//exports.foo = "foo";
//module.exports.bar = "bar";
// default, use module.exports
import fs from "fs";
export default (NODE_ENV, KEYLOCAL, CERTLOCAL, KEYREMOTE,CERTREMOTE) => {
      if(NODE_ENV==="development") return { 
       key: fs.readFileSync(KEYLOCAL),
       cert: fs.readFileSync(CERTLOCAL)
      };
      if (NODE_ENV==="production") return { 
       key: fs.readFileSync(KEYREMOTE),
       cert: fs.readFileSync(CERTREMOTE)
        };
      throw new Error("NODE_ENV != development or production");
};
       
