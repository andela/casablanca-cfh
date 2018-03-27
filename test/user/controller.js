import request from 'supertest';
import { expect } from 'chai';
import User from '../../app/models/user';
import app from '../../server.js';

// const should = chai.should();
process.env.NODE_ENV = 'test';

describe('User controller', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done();
    });
  });
  it('should return a 201 when a user is saved', () => {
    request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Onyekachi',
        email: 'kachi@kachi.com',
        password: 'password',
        username: 'username'
      })
      .then((res) => {
        expect(res.status).to.equal(201);
      });
  });
  it('should return a 409 when the user to be saved already exists', () => {
    request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Onyekachi',
        email: 'kachi@kachi.com',
        password: 'password',
        username: 'username'
      })
      .then((err) => {
        expect(err.status).to.equal(409);
      });
  });
  it('should return a 400 if the fields are empty', () => {
    request(app)
      .post('/api/auth/signupJWT')
      .send({})
      .then((err) => {
        expect(err.status).to.equal(400);
      });
  });
});
