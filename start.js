const server = require('./server.js');
const http = require('http');

http.createServer(server).listen(server.get ('port'), function (){
  console.log('Server listening on port ', server.get('port'));
});
