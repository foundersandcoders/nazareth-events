const router = require('express').Router();

const homePage = require('./home.js');
const detailsPage = require('./event_details.js');

router.get('/:lang?', homePage);
router.get('/:lang/events/:id', detailsPage);

module.exports = router;
