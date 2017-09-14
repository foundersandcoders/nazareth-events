const router = require('express').Router();

const homePage = require('./home.js');
const detailsPage = require('./event_details.js');
const getPlaces = require('../controller/add_places_get.js');
const addEvent = require('./add-event.js');

router.get('/', homePage);
router.get('/events/:id', detailsPage);
router.get('/add-event', (req, res) => res.render('add-event', { title: 'add new event' }));
router.get('/add-event', getPlaces);
router.post('/add-event', addEvent);

module.exports = router;
