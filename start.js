const server = require('./server.js');
const http = require('http');

server.listen(server.get('port'), function (){
  console.log('Server listening on port', server.get('port'));
})
