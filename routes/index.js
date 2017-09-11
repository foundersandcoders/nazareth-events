const router = require('express').Router();

const homePage = require('./home.js');
const detailsPage = require('./event_details.js');

router.get('/', homePage);
router.get('/events/:id', detailsPage);

module.exports = router;
