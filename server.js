const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Hello</h1>');
  res.end();
});

server.listen(4000);
