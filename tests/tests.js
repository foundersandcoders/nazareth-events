const tape = require('tape');
const supertest = require('supertest');
const server = require('../server.js');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const postPlace = require('../routes/middleware/post_place.js');

tape('home route test: GET request to /', t => {
  supertest(server)
    .get('/')
    .end((err, res) => {
      t.error(err);
      t.equal(res.status, 200, 'should return status code 200');
      t.ok(res.text.includes('<div id="list-page-content">'));
      t.end();
    });
});

tape('Test the event details route', async t => {
  let eventId = '';
  try {
    const eventResponse = await axios.get(
      'https://nazareth-open-tourism-platform.herokuapp.com/api/v1/events'
    );
    const parsedBody = eventResponse.data;
    const lastIndex = parsedBody.length - 1;
    const htmlSample = `<h1 class="event-name-details">${
      parsedBody[lastIndex].en.name
    }</h1>`;
    eventId = parsedBody[lastIndex]._id;
    supertest(server)
      .get('/en/events/' + eventId)
      .end((err, res) => {
        t.error(err);
        t.ok(res.text.includes(htmlSample), 'It found the right event');
      });
    supertest(server)
      .get('/en/events/someid')
      .end((err, res) => {
        t.error(err);
        t.ok(res.text.includes('<title>Not Found</title>'));
        t.end();
      });
  } catch (err) {
    console.log(err);
  }
});
//
// tape('Test get all places middleware', async t => {
//   s
// })

tape('Test the authentication middleware', t => {
  const token = jwt.sign('somthing', process.env.JWT_SECRET);
  supertest(server)
    .get('/add-event')
    .set('Cookie', [`token=${token}`])
    .end((err, res) => {
      t.error(err);
      t.ok(
        res.text.includes(
          '<form class="add-event-form" action="/add-event" method="post">'
        )
      );
      supertest(server)
        .get('/add-event')
        .end((err, res) => {
          t.error(err);
          t.equal(res.status, 302, 'Should redirect to the OTP api login');
        });
    });

  supertest(server)
    .get('/add-event')
    .set('Cookie', ['token=testcookie'])
    .end((err, res) => {
      t.error(err);
      t.equal(res.status, 302, 'Should redirect to the OTP api login');
      t.end();
    });
});
