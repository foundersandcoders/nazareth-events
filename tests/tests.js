const tape = require('tape');
const supertest = require('supertest');
const server = require('../server.js');
const request = require('request');

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
  const htmlSample = '<h1 class="text-warning eventName">default</h1>';
  supertest(server)
    .get('/events/59afaf75b0a5e80011beeafa')
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.ok(res.text.includes(htmlSample), 'It found the right event');
      t.end();
    });
});

tape('Tests what renders when you get an error in event details', t => {
  const original = request.get;
  request.get = (url, callback) => {
    process.nextTick(callback, new Error('hushs'));
  };
  supertest(server)
    .get('/events/59afaf75b0a5e80011beeafa')
    .end((err, res) => {
      t.error(err);
      t.ok(res.text.includes('error :('));
      request.get = original;
      t.end();
    });
});
