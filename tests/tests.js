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
  let eventId = '';
  request.get('https://nazareth-open-tourism-platform.herokuapp.com/events', (err, res) => {
    if (err) return err;
    const parsedBody = JSON.parse(res.body);
    const htmlSample = `<h1 class="text-warning eventName">${parsedBody[0].en.name}</h1>`;
    eventId = parsedBody[0]._id;
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
