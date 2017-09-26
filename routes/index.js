const router = require('express').Router();

const homePage = require('./home.js');
const detailsPage = require('./event_details.js');
const getPlaces = require('./add_places_get.js');
const addEvent = require('./add-event.js');
const addPlace = require('./add_places_post.js');

router.get('/', homePage);
router.get('/events/:id', detailsPage);
router.get('/add-event', getPlaces);
router.post('/add-event', addPlace, addEvent);

module.exports = router;
