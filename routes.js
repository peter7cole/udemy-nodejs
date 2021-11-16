const fs = require('fs');
const { formPage, helloPage } = require('./pages');

const handleRequests = (req, res) => {
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
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write(helloPage);
  res.end();
};

module.exports = { handleRequests };
