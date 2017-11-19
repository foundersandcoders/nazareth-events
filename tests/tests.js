const tape = require('tape');
const supertest = require('supertest');
const server = require('../server.js');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const nock = require('nock');
const flush = require('./flush_database.js');
require('dotenv').config();

const sortPlaces = require('../helpers/sort_places.js');

tape('Test home route', t => {
  const currentDate = new Date().toISOString().slice(0, 10);
  nock(process.env.URI)
    .get(`/events?date_from=${currentDate}`)
    .reply(200, [{ en: { name: 'king go home' }, place: { en: 'somehwere' } }]);

  nock(process.env.URI)
    .get(`/events?date_from=${currentDate}`)
    .reply(200, [{ en: { name: 'king go home' }, place: { en: 'somehwere' } }]);

  nock(process.env.URI)
    .get(`/events?date_from=${currentDate}&date_to=2024-1-1`)
    .reply(200, [{ en: { name: 'king go home' }, place: { en: 'somehwere' } }]);

  supertest(server)
    .get('/en')
    .end((err, res) => {
      t.error(err, '/en home route with english lang does not return an error');
      t.equal(res.status, 200, 'should return status code 200');
      t.ok(
        res.text.includes('<div id="list-page-content">'),
        'rendered the home view correctly'
      );
    });

  supertest(server)
    .get('/')
    .end((err, res) => {
      t.error(err, '/ home route does not return an error');
    });

  supertest(server)
    .get(`/?date_from=${currentDate}&date_to=2024-1-1`)
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

tape('Test POST arabic event', t => {
  const data = {
    name_arabic: 'شو عم بصير',
    description_ar: 'واو',
    categories: ['music'],
    accessibilityOptions: ['Disabled toilets'],
    startDate: '2017-11-24',
    startTime: '00:00',
    endTime: '14:00',
    cost: 0,
    place_name_ar: 'واو'
  };

  nock(process.env.URI)
    .post('/events')
    .reply(200, { _id: 1 });

  nock(process.env.URI)
    .post('/places')
    .reply(200, { _id: 1 });

  supertest(server)
    .post('/add-event')
    .send(data)
    .end((err, res) => {
      t.error(err, 'posting an event did not error');
      t.equal(res.statusCode, 302, 'added the event successfully');
      t.end();
    });
});

tape('Test POST english event', t => {
  const data = {
    name_english: 'going to the beach',
    description_en: 'there is a beach',
    categories: ['music'],
    accessibilityOptions: ['Disabled toilets'],
    startDate: '2017-11-24',
    startTime: '00:00',
    endTime: '14:00',
    cost: 0,
    place_name_en: 'over the rainbow'
  };

  nock(process.env.URI)
    .post('/events')
    .reply(200, { _id: 1 });

  nock(process.env.URI)
    .post('/places')
    .reply(200, { _id: 1 });

  supertest(server)
    .post('/add-event')
    .send(data)
    .end((err, res) => {
      t.error(err, 'posting an event did not error');
      t.end();
    });
});

tape('Test POST event with a specific place', t => {
  const data = {
    name_english: 'Finn week off',
    description_en: 'there is a beach, music',
    categories: ['music'],
    accessibilityOptions: ['Disabled toilets'],
    startDate: '2017-11-24',
    startTime: '00:00',
    endTime: '14:00',
    cost: 0,
    placeId: 1
  };

  nock(process.env.URI)
    .post('/events')
    .reply(200, { _id: 1 });

  supertest(server)
    .post('/add-event')
    .send(data)
    .end((err, res) => {
      t.error(err, 'posting an event did not error');
      t.end();
    });
});

tape('Test the authentication middleware', t => {
  nock(process.env.URI)
    .get('/places')
    .reply(200, [{ en: { name: 'home' } }]);

  const token = jwt.sign('somthing', process.env.JWT_SECRET);
  supertest(server)
    .get('/add-event')
    .set('Cookie', [`token=${token}`])
    .end((err, res) => {
      t.error(err, ' /add-event with a valid token did not return an error');
      t.ok(
        res.text.includes(
          '<form class="add-event-form" action="/add-event" method="post">'
        )
      );
    });

  supertest(server)
    .get('/add-event')
    .end((err, res) => {
      t.error(err, '/add-event with no cookie did not return error');
      t.equal(res.status, 302, 'Should redirect to the OTP api login');
    });

  supertest(server)
    .get('/add-event')
    .set('Cookie', ['token=testcookie'])
    .end((err, res) => {
      t.error(err, '/add-event with an invalid token did not return an error');
      t.equal(res.status, 302, 'Should redirect to the OTP api login');
      t.end();
    });
});

tape('Test the event details route', async t => {
  nock(process.env.URI)
    .get('/events/1')
    .reply(200, {
      en: { name: 'FAC' },
      place: { en: { name: 'somehwere' } }
    });

  const htmlSample = `<h1 class="event-name-details">FAC</h1>`;
  supertest(server)
    .get('/en/events/1')
    .end((err, res) => {
      t.error(err, 'event details /:lang/events/:id did not return an error');
      t.ok(res.text.includes(htmlSample), 'It found the right event');
    });

  nock(process.env.URI)
    .get('/en/events/someid')
    .reply(404);

  supertest(server)
    .get('/en/events/someid')
    .end((err, res) => {
      t.error(err, 'event details /:lang/events/:id did not return an error');
      t.end();
    });
});

tape('test sort places function', t => {
  const expected = sortPlaces([
    { ar: { name: 'بقبق' }, _id: 1 },
    { en: { name: 'liwan' }, _id: 2 },
    { en: { name: 'somewhere' }, ar: { name: 'بقبق' }, _id: 3 }
  ]);

  const actual = [
    { name: 'liwan', id: 2 },
    { name: 'somewhere / بقبق', id: 3 },
    { name: 'بقبق', id: 1 }
  ];

  t.deepEqual(actual, expected, 'should get an array with 2 indexes');
  t.end();
});
