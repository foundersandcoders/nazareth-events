const router = require('express').Router();

const homePage = require('./home.js');
const detailsPage = require('./event_details.js');
const addEventForm = require('./render_add_form.js');
const addEvent = require('./add_event.js');
const addPlace = require('./middleware/post_place.js');
const getAllPlaces = require('./middleware/get_places.js');

router.get('/', homePage);
router.get('/events/:id', detailsPage);
router.get('/add-event', getAllPlaces, addEventForm);
router.post('/add-event', addPlace, addEvent);

module.exports = router;
