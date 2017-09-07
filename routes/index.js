const router = require('express').Router();

const homePage = require('./home.js');
const detailsPage = require('./event_details.js');
const addEventPage = require('./add-event.js');
const getPlaces = require('./add_places_get.js');

router.get('/', homePage);
router.get('/events/:id', detailsPage);
router.post('/add-event', addEventPage);
router.get('/add-event', getPlaces);

module.exports = router;
