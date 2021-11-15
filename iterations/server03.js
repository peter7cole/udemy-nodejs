const http = require('http');
const fs = require('fs');
const { formPage, helloPage } = require('./pages');

/*
 * iteration server03 is refactored server02 with no great change in functionality
 * - pages are now imported
 * - the `end` event listener is now returned to keep the synchronous code working
 * - otherwise, headers would be attempting to be re-set after the conditionals
 */

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(formPage);

    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('parsedBody:', parsedBody);

      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);

      res.statusCode = 302;
      res.setHeader('Location', '/');

      return res.end();
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write(helloPage);
  res.end();
});

server.listen(4000);
