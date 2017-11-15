module.exports = () => {
  const mongoose = require('mongoose');

  mongoose.Promise = global.Promise;

  const dbURI = 'mongodb://localhost/open-platform-dev';

  mongoose.connect(dbURI, {
    useMongoClient: true
  });

  mongoose.connection.on('open', () => {
    mongoose.connection.db.dropDatabase(function (err, res) {
      console.log('ehehhee', err);
      console.log(res);
      process.exit(0);
    });
  });
};
