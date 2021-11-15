const http = require('http');

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
 * - types: button, checkbox, color, date, datetime-local, email, file, hidden, image, month, number, password, radio, range, reset, search, submit, tel, text, time, url, week
 * - name: automatically adds input data to the request and makes it accessible via the assigned name, in this case `message`
 */

const server = http.createServer((req, res) => {
  const url = req.url;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write(helloPage);
  }
  if (url === '/form') {
    res.write(formPage);
  }

  res.end();
});

server.listen(4000);
