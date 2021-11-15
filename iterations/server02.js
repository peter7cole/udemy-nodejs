const http = require('http');
// the ‘fs’ module of Node.js implements the File I/O operation
const fs = require('fs');

const helloPage =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Home</title></head><body><h1>Hello, world!</h1></body></html>';
const formPage =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Form</title></head><body><h1>Form</h1><form action="/message" method="post"><input type="text" name="message" /><button type="submit">Send</button></form></body></html>';

/*
 * Forms
 * - action: url the request should be sent to
 * - method: the http method, post for most user forms (in this case, it will send a post request to /message)
 * - post method forms will look into the form for any related input, select, etc elements and
 *
 * Inputs
 * - types: button, checkbox, color, date, datetime-local, email, file, hidden, image,
 *          month, number, password, radio, range, reset, search, submit, tel, text, time, url, week
 * - name: automatically adds input data to the request and makes it accessible via the assigned name, in this case `message`
 */

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(formPage);
  } else if (url === '/message' && method === 'POST') {
    // if there is a post request to the form's submission url:
    // set up body array
    const body = [];
    // create event listener for the data event, when a new chunk is ready to be read
    // callback receives the chunk and does work on it
    req.on('data', (chunk) => {
      console.log('NEW CHUNK:', chunk);
      body.push(chunk);
    });
    // add another event listener for when parsing the incoming request data is finished
    req.on('end', () => {
      // Buffer object is global from Node.js, in this case creating a new Buffer with all the chunks in the body added to it
      // toString() is a utility method offered by Node.js to do work on Buffered chunks
      // in this case we're assuming the body will all be text
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // use the filesystem module to write a file named `message.txt` to the root project folder containing dummy text
      // the fs.writeFileSync() is a synchronous method that creates a new file if the specified file does not exist
      fs.writeFileSync('message.txt', message);
    });

    // set status code to redirected
    res.statusCode = 302;
    // set header to default `Location` of `/`
    res.setHeader('Location', '/');
  } else {
    // base case for any other url
    res.setHeader('Content-Type', 'text/html');
    res.write(helloPage);
  }

  res.end();
});

server.listen(4000);
