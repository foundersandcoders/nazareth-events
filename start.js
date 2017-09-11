const server = require('./server.js');

server.listen(server.get('port'), function () {
  console.log('Server listening on port', server.get('port'));
});
