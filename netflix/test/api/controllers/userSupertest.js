const { should } = require('chai');
const chai = require('chai');
var request = require('supertest');
var { app } = require('../../../app');

describe('user', function() {
  it('User registration should return Account created', async function() {
    const response = await request(app)
    .post('/user')
    .set('Content-type', 'application/json')
    .send({
      "username": "asd",
      "password": "123"
    })
    .expect(200,done)
        

      });

      it('User login should return with the sessionID', async function() {
        request(app)
        .post('/user/login')
        .send({
            "username": "asd",
            "password": "123"
          })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            should.not.exist(err);
            res.body.should.eql('todo');

          });

      });

  });