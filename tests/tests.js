const tape = require('tape');
const supertest = require('supertest');
const server = require('../server.js');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const flush = require('./flush_database.js');
require('dotenv').config();

let id;
axios
  .post(`${process.env.URI}/places`, { en: { name: 'guesthouse mario' } })
  .then(res => {
    id = res.data._id;
  });

tape('home route test: GET request to /', t => {
  supertest(server)
    .get('/')
    .end((err, res) => {
      t.error(err, '/ home route does not return an error');
      t.equal(res.status, 200, 'should return status code 200');
      t.ok(res.text.includes('<div id="list-page-content">'));
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

  supertest(server)
    .post('/add-event')
    .send(data)
    .end((err, res) => {
      t.error(err, 'posting an event did not error');
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
    placeId: id
  };

  supertest(server)
    .post('/add-event')
    .send(data)
    .end((err, res) => {
      t.error(err, 'posting an event did not error');
      t.end();
    });
});

tape('Test the authentication middleware', t => {
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
  try {
    const eventResponse = await axios.get(`${process.env.URI}/events`);
    const parsedBody = eventResponse.data;
    const lastIndex = parsedBody.length - 1;
    const htmlSample = `<h1 class="event-name-details">${
      parsedBody[lastIndex].en.name
    }</h1>`;
    supertest(server)
      .get('/en/events/' + parsedBody[lastIndex]._id)
      .end((err, res) => {
        t.error(err, 'event details /:lang/events/:id did not return an error');
        t.ok(res.text.includes(htmlSample), 'It found the right event');
      });
    supertest(server)
      .get('/en/events/someid')
      .end((err, res) => {
        t.error(err, 'Event details with a random id did not error');
        t.ok(res.text.includes('<title>Not Found</title>'));
        // flushing database here
        flush();
        t.end();
      });
  } catch (err) {
    t.fail('This test has hit catch');
    t.end();
  }
});
