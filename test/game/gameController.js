import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';

import Game from '../../app/models/game';
import app from '../../server.js';
import User from '../../app/models/user';

const user = {
  name: 'Onyekachi',
  email: 'kachi@asdd.com',
  password: 'password',
  username: 'username'
};
const game = {
  gameID: 3,
  round: 8,
  czar: 0,
  winner: 'Incredible',
  gamePlayers: ['Fun', 'Incredible', 'Kind', 'Troublesome']
};
let token;
const gameId = 5;

describe('Game controller', () => {
  beforeEach((done) => {
    Game.remove({}, () => {
    });
    User.remove({}, () => {
      done();
    });
  });
  describe('Save Game', () => {
    it('should return invalid token for an invalid token is passed', () => {
      token = '956236789hgsdfgh96238755';
      request(app)
        .post(`/api/games/${gameId}/start`)
        .set({ 'x-access-token': token })
        .send(game)
        .then((res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Authentication failed. Invalid access token');
        });
    });

    it('should return access token has expired when a user saves game with an expired token', () => {
      User.create(user).then((createdUser) => {
        token = jwt.sign(
          {
            name: createdUser.name,
            email: createdUser.email
          },
          'fasavsavsavgas', { expiresIn: '1s' }
        );
        ({ token } = createdUser);
      });
      request(app)
        .post(`/api/games/${gameId}/start`)
        .set({ 'x-access-token': token })
        .send(game)
        .then((res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Access token has expired. You are required to login again');
        });
    });
    it('should return a 201 when a game is saved successfully', () => {
      request(app)
        .post(`/api/games/${gameId}/start`)
        .send(game)
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Game successfully saved');
        });
    });
    it('should return a 201 when a game is saved successfully', () => {
      User.create(user).then((createdUser) => {
        token = jwt.sign({
          name: createdUser.name,
          email: createdUser.email
        }, 'fasavsavsavgas', { expiresIn: '1w' });
        ({ token } = createdUser);
      });
      request(app)
        .post(`/api/games/${gameId}/start`)
        .set({ 'x-access-token': token })
        .send(game)
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Game successfully saved');
        });
    });
  });
});
