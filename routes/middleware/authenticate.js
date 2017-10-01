const qs = require('querystring');
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.cookies.token) {
    return next();
  } else {
    const queries = {
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      state: process.env.STATE
    };

    const stringfiedQuery = qs.stringify(queries);
    res.redirect('https://nazareth-open-tourism-platform.herokuapp.com/oauth/authorize?' + stringfiedQuery);
  }
};
