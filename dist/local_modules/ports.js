//exports.foo = "foo";
//module.exports.bar = "bar";
// default, use module.exports

export default (SERVER) => {
    const server = SERVER.toUpperCase();
    if(server=="LOCAL") return { portSecure: "8443", port: "8080" };
    if(server=="REMOTE") return { portSecure: "443", port: "80" };
    throw new Error("SERVER != LOCAL or REMOTE");
};
