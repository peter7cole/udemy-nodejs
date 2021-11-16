const http = require('http');
const fs = require('fs');
const { formPage, helloPage } = require('./pages');

/*
 * iteration server03 is refactored server02 with no great change in functionality
 * - pages are now imported
 * - the `end` event listener is now returned to keep the synchronous code working
 * - otherwise, headers would be attempting to be re-set after the conditionals
 * - the writeFileSync method is abandoned for writeFile, explained in comments below
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
      // the dangers of using writeFileSync is that if it's a large file(couple hundred MBs), it will block code execution, the handling of other requests
      // so we swap it out here for writeFile, it does take an optional err argument, but we don't anticipate errors for this particular code
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
        // example of event driven architecture
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write(helloPage);
  res.end();
});

server.listen(4000);
