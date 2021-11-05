Errors are of 3 kinds

* Synchronous and Asynchronous that we throw from a try block
* From events that we could wrap in an async function or 
call the unchaght event for the whole process:

```
Wrapping in async function the whole app

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}


// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on("uncaughtException", function(err) {
    // handle the error safely
    console.log(err);
});

```


```
mongoose.connect('mongodb://localhost:27017/test').
  catch(error => handleError(error));

// Or:
try {
  await mongoose.connect('mongodb://localhost:27017/test');
} catch (error) {
  handleError(error);
}
```
