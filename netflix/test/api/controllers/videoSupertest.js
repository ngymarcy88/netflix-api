/*var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('videos', function() {
  it('should return a json with a video found by the title', async function() {
        request(server)
        .get('/videos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      });

  it('should add a new video', async function(){
        request(server)
        .get('/addVideo')
        .expect(200);
      });

  it('should return a video', async function(){
      request(server)
      .get('/getVideoById')
      .query({id: 1})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    });

  });*/