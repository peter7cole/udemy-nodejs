const http = require('http');
const fs = require('fs');

const helloPage =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Home</title></head><body><h1>Hello, world!</h1></body></html>';
const formPage =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Form</title></head><body><h1>Form</h1><form action="/message" method="post"><input type="text" name="message" /><button type="submit">Send</button></form></body></html>';

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(formPage);
  } else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log('NEW CHUNK:', chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write(helloPage);
  }

  res.end();
});

server.listen(4000);
