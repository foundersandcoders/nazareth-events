const router = require('express').Router();

const homePage = require('./home.js');
const detailsPage = require('./event_details.js');
const addEventForm = require('./render_add_form.js');
const addEvent = require('./add_event.js');
const handleOauth = require('./oauth.js');
const addPlace = require('./middleware/post_place.js');
const getAllPlaces = require('./middleware/get_places.js');
const authenticate = require('./middleware/authenticate');

router.get('/:lang?', homePage);
router.get('/add-event', authenticate, getAllPlaces, addEventForm);
router.post('/add-event', addPlace, addEvent);
router.get('/token', handleOauth);
router.get('/:lang/events/:id', detailsPage);

module.exports = router;
