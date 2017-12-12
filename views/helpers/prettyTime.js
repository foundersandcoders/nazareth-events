const dateFormat = require('dateformat');

module.exports = time => dateFormat(time, 'UTC:HH:MM');
