const tape = require('tape');
const request = require('supertest');
const server = require('../server.js');

tape('home route test: GET request to /', t => {
  request(server)
    .get('/')
    .end((err, res) => {
      if (err) throw err;
      t.equal(res.status, 200, 'should return status code 200');
      t.ok(res.text.includes('<div id="list-page-content">'), 'should return home page containing test string "<div id="list-page-content">"');
      t.end();
    });
});
