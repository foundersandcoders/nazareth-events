const tape = require('tape');
const supertest = require('supertest');
const server = require('../server.js');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const nock = require('nock');
const flush = require('./flush_database.js');
require('dotenv').config();

tape('Test home route', t => {
  const currentDate = new Date().toISOString().slice(0, 10);

  nock(process.env.URI)
    .get(`/events?date_from=${currentDate}`)
    .reply(200, [
      {
        en: { name: 'king go home' },
        place: { en: 'somehwere' },
        categories: ['miscellaneous', 'sport']
      }
    ]);

  nock(process.env.URI)
    .get(`/events?date_from=${currentDate}`)
    .reply(200, [
      {
        en: { name: 'king go home' },
        place: { en: 'somehwere' },
        categories: ['music']
      }
    ]);

  nock(process.env.URI)
    .get(`/events?date_from=${currentDate}`)
    .reply(200, [
      {
        en: { name: 'king go home' },
        place: { en: 'somehwere' },
        categories: ['music']
      }
    ]);

  nock(process.env.URI)
    .get(`/events?date_from=${currentDate}&date_to=2024-1-1`)
    .reply(200, [
      {
        en: { name: 'king go home' },
        place: { en: 'somehwere' },
        categories: ['music']
      }
    ]);

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
      t.ok(
        res.text.includes(
          '<section id="events-section" class="events-section">'
        )
      );
    });

  supertest(server)
    .get(`/?date_from=${currentDate}&date_to=2024-1-1`)
    .end((err, res) => {
      t.error(err, 'Filter by date did not error');
    });

  supertest(server)
    .get('/?category=sport')
    .end((err, res) => {
      t.error(err, 'Filter by categories did not error');
      t.end();
    });
});

tape('Test the event details route', async t => {
  nock(process.env.PRODUCTION_API)
    .get('/events/1')
    .reply(200, {
      en: { name: 'FAC' },
      place: {
        en: { name: 'somewhere', address: 'Nazareth' },
        website: 'facebook.com'
      }
    });

  nock('https://maps.googleapis.com/maps/api/geocode/json')
    .get(`?address=Nazareth&region=il&key=${process.env.GEOCODE_KEY}`)
    .reply(200, {
      results: [{ geometry: { location: { lng: 32.223, lat: 32.12312 } } }]
    });

  const htmlSample = `<h1 class="event-name-details">FAC</h1>`;
  supertest(server)
    .get('/en/events/1')
    .end((err, res) => {
      t.error(err, 'event details /:lang/events/:id did not return an error');
      t.ok(res.text.includes(htmlSample), 'It found the right event');
    });

  nock(process.env.PRODUCTION_API)
    .get('/events/someid')
    .reply(404);

  supertest(server)
    .get('/en/events/someid')
    .end((err, res) => {
      t.error(err, 'event details /:lang/events/:id did not return an error');
    });

  nock(process.env.PRODUCTION_API)
    .get('/events/2')
    .reply(200, {
      en: { name: 'FAC' },
      place: { en: { name: 'somewhere' }, location: [32.2323, 33.23232] }
    });

  supertest(server)
    .get('/en/events/2')
    .end((err, res) => {
      t.error(err, 'It rendered the event details with a map from api coords');
      t.end();
    });
});
