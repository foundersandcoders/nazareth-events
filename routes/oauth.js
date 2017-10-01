const qs = require('querystring');
const request = require('request');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res) => {
  if (req.query.state !== process.env.STATE) {
    res.send('Access not allowed');
  } else {
    const tokenQueries = {
      code: req.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    };

    const tokenRequestOptions = {
      method: 'POST',
      uri: 'https://nazareth-open-tourism-platform.herokuapp.com/oauth/token',
      body: qs.stringify(tokenQueries),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

    request(tokenRequestOptions, (err, response, body) => {
      if (err) {
        return res.send('Something went wrong, please try again');
      } else {
        const parsedBody = JSON.parse(body);
        const token = jwt.sign(parsedBody.access_token, 'jackisweird');

        res.cookie('token', token);
        res.redirect('/add-event');
      }
    });
  }
};
