const http = require('http');
const { handleRequests } = require('./routes');

const server = http.createServer(handleRequests);

server.listen(4000, () => {
  console.log('Listening on port 4000');
});
