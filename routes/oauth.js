const qs = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.query.state !== process.env.STATE) {
    res.redirect(`${process.env.OAUTH_URI}/authorize`);
  } else {
    const tokenQueries = qs.stringify({
      code: req.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    try {
      const tokenRes = await axios({
        method: 'post',
        url: `${process.env.OAUTH_URI}/token`,
        data: tokenQueries,
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      });
      const token = jwt.sign(tokenRes.access_token, process.env.JWT_SECRET);
      res.cookie('token', token, { maxAge: 604800000 });
      res.redirect('/add-event');
    } catch (err) {
      res.render('error', {
        errorMessage: 'There was a problem logging you in, please try again'
      });
    }
  }
};
