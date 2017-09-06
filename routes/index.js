const router = require('express').Router();

const homePage = require('./home.js');
const detailsPage = require('./event_details.js');
const addEventPage = require('./add-event.js');

router.get('/', homePage);
router.get('/events/:id', detailsPage);
router.get('/add-event', (req, res) => res.render('add-event', { title: 'add event' }));
router.post('/add-event', addEventPage);

module.exports = router;