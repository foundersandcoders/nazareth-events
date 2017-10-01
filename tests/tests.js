const tape = require('tape');
const supertest = require('supertest');
const server = require('../server.js');
const request = require('request');

const postPlace = require('../routes/middleware/post_place.js');

tape('home route test: GET request to /', t => {
  supertest(server)
    .get('/')
    .end((err, res) => {
      t.error(err);
      t.equal(res.status, 200, 'should return status code 200');
      t.ok(res.text.includes('<div id="list-page-content">'), 'should return home page containing test string "<div id="list-page-content">"');
      t.end();
    });
});

tape('Test the event details route', t => {
  const htmlSample = '<h1 class="text-warning eventName">FACN2</h1>';
  let eventId = '';
  request.get('https://nazareth-open-tourism-platform.herokuapp.com/events', (err, res) => {
    if (err) return err;
    const filteredResult = JSON.parse(res.body).filter((event) => event.en.name === 'FACN2');
    eventId = filteredResult[0]._id;
    supertest(server)
      .get('/events/' + eventId)
      .expect(200)
      .end((err, res) => {
        t.error(err);
        t.ok(res.text.includes(htmlSample), 'It found the right event');
        t.end();
      });
  });
});

// Work in progress
// tape('Tests what renders when you get an error in event details', t => {
//   const original = request.get;
//   request.get = (url, callback) => {
//     process.nextTick(callback, new Error('hushs'));
//   };
//   supertest(server)
//     .get('/events/59afaf75b0a5e80011beeafa')
//     .end((err, res) => {
//       t.error(err);
//       t.ok(res.text.includes();
//       request.get = original;
//       t.end();
//     });
// });

tape('Test if it\'s rendering the add event form currectley', t => {
  const htmlSample = '<h3 class="userAddEvent">add event</h3>';
  supertest(server)
    .get('/add-event')
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.ok(res.text.includes(htmlSample));
      t.end();
    });
});

tape('Test if it posts the event to the api', t => {
  const requestBody = {
    name: 'random',
    categories: ['music']
  };
  supertest(server)
    .post('/add-event')
    .send(requestBody)
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});
