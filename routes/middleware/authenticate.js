const qs = require('querystring');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const tokenCookie = req.cookies.token;
  const queries = qs.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    state: process.env.STATE
  });
  if (tokenCookie) {
    try {
      const encryptedData = await jwt.verify(
        tokenCookie,
        process.env.JWT_SECRET
      );
      return next();
    } catch (err) {
      res.redirect(
        `https://nazareth-open-tourism-platform.herokuapp.com/oauth/authorize?${
          queries
        }`
      );
    }
  } else {
    res.redirect(
      `https://nazareth-open-tourism-platform.herokuapp.com/oauth/authorize?${
        queries
      }`
    );
  }
};
