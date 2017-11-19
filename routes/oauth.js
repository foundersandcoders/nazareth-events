const qs = require('querystring');
const request = require('request');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res) => {
  if (req.query.state !== process.env.STATE) {
    res.send('Access not allowed');
  } else {
    const tokenQueries = qs.stringify({
      code: req.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const tokenRequestOptions = {
      method: 'POST',
      uri: `${process.env.OAUTH_URI}/token`,
      body: tokenQueries,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

    request(tokenRequestOptions, (err, response, body) => {
      if (err) {
        return res.send('Something went wrong, please try again');
      } else {
        const parsedBody = JSON.parse(body);
        const token = jwt.sign(parsedBody.access_token, process.env.JWT_SECRET);

        res.cookie('token', token, { maxAge: 604800000 });
        res.redirect('/add-event');
      }
    });
  }
};
