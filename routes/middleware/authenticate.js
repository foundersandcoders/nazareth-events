const qs = require('querystring');
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.cookies.token) {
    return next();
  } else {
    const queries = qs.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      state: process.env.STATE
    });

    res.redirect(`https://nazareth-open-tourism-platform.herokuapp.com/oauth/authorize?${queries}`);
  }
};
