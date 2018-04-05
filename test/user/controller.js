import request from 'supertest';
import { expect } from 'chai';
import User from '../../app/models/user';
import app from '../../server.js';

const user = {
  name: 'Onyekachi',
  email: 'kachi@kachi.com',
  password: 'password',
  username: 'username'
};

describe('User controller', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done();
    });
  });
  describe('Sign up', () => {
    it('should return a 201 when a user is saved', () => {
      request(app)
        .post('/api/auth/signup')
        .send(user)
        .then((res) => {
          expect(res.status).to.equal(201);
        });
    });
    it('should return a 409 when the user to be saved already exists', () => {
      request(app)
        .post('/api/auth/signup')
        .send(user)
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

  describe('Login', () => {
    it('should fail if password is wrong', () => {
      request(app)
        .post('/api/auth/login')
        .send({
          email: user.email,
          password: 'wrongPassword',
        })
        .then((res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Incorrect password');
        });
    });
    it('should fail if user is not registered', () => {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'randomUser@gmail.com',
          password: user.password,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('User not found');
        });
    });
    it('should fail if email is not provided', () => {
      request(app)
        .post('/api/auth/login')
        .send({
          password: user.password,
        })
        .then((res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('should fail if password is not provided', () => {
      request(app)
        .post('/api/auth/login')
        .send({
          email: user.email,
        })
        .then((res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('should login successfully when all fields are provided', () => {
      request(app)
        .post('/api/auth/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Login successful');
          expect(res.body.token).to.be.a('string');
        });
    });
  });
});
