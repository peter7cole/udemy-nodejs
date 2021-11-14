// seaches for core module named http, and declares it to a custom constant name, best practice to call it the same thing
const http = require('http');

// since reqListener is in the argument list for createServer, this function's contents will run for every incoming 'request' event
function reqListener(req, res) {
  console.log('req', req);
}

/*
 * the http object which we import from the http module has a createServer method: Returns a new instance of Server, which we declare and set to the const server
 * it takes a requestListener as an argument
 * the requestListener is a function which is automatically added to the 'request' event, executing for every incoming 'request'
 * shorthand: http.createServer((req, res) => {});
 */
const server = http.createServer(reqListener);

/*
 * since createServer returned us a server object that we declared with the const server, we can access methods on that object with it
 * listen is a process where node will keep this running to listen for incoming requests
 * listen takes optional arguments:
 * - port (in production, we take the default port 80, but in development the thousands are pretty /
 * - (defaults to local machine name)
 */
server.listen(4000);
