/* eslint-disable */

import jwt from 'jsonwebtoken';
import winston from 'winston';
import path from 'path';
import mongoose from 'mongoose';
import Game from './game';
import Player from './player';

require('console-stamp')(console, 'm/dd HH:MM:ss');

const User = mongoose.model('User');
const avatars = require(path.join(__dirname, '../../app/controllers/avatars.js')).all(); /* eslint-disable-line */
// Valid characters to use to generate random private game IDs
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

const transport = new winston.transports.Console({
  level: 'debug',
  handleExceptions: true,
  json: false,
  colorize: true,
});
const logger = winston.createLogger({
  transports: [transport]
});

module.exports = (io) => {
  let game;
  const allGames = {};
  const allPlayers = {};
  const gamesNeedingPlayers = [];
  let gameID = 0;

  const fireGame = (player, socket, regionId) => {
    let currentGame;
    let gameIndex;
    gamesNeedingPlayers.map((gameItem, index) => { /* eslint-disable-line */
      if (gameItem.regionId === regionId) {
        logger.info('>>>>>> game.region', gameItem.regionId);
        currentGame = gameItem;
        gameIndex = index;
      }
    });
    if (!currentGame) {
      gameID += 1;
      const gameIDStr = gameID.toString();
      game = new Game(gameIDStr, io, regionId);
      allPlayers[socket.id] = true;
      game.players.push(player);
      allGames[gameID] = game;
      gamesNeedingPlayers.push(game);
      socket.join(game.gameID);
      socket.gameID = game.gameID;
      logger.info(socket.id, 'has joined newly created game', game.gameID);
      game.assignPlayerColors();
      game.assignGuestNames();
      game.sendUpdate();
    } else {
      logger.info('>>>>>>>>', 'current');
      allPlayers[socket.id] = true;
      currentGame.players.push(player);
      logger.info(socket.id, 'has joined game', currentGame.gameID);
      socket.join(currentGame.gameID);
      socket.gameID = currentGame.gameID;
      currentGame.assignPlayerColors();
      currentGame.assignGuestNames();
      currentGame.sendUpdate();
      currentGame.sendNotification(`${player.username} has joined the game!`);
      if (currentGame.players.length >= currentGame.playerMaxLimit) {
        gamesNeedingPlayers.splice(gameIndex, 1);
        currentGame.prepareGame();
      }
    }
  };

  const createGameWithFriends = (player, socket) => {
    let isUniqueRoom = false;
    let uniqueRoom = '';
    // Generate a random 6-character game ID
    while (!isUniqueRoom) {
      uniqueRoom = '';
      for (let i = 0; i < 6; i += 1) {
        uniqueRoom += chars[Math.floor(Math.random() * chars.length)];
      }
      if (!allGames[uniqueRoom] && !(/^\d+$/).test(uniqueRoom)) {
        isUniqueRoom = true;
      }
    }
    logger.info(socket.id, 'has created unique game', uniqueRoom);
    game = new Game(uniqueRoom, io);
    allPlayers[socket.id] = true;
    game.players.push(player);
    allGames[uniqueRoom] = game;
    socket.join(game.gameID);
    socket.gameID = game.gameID;
    game.assignPlayerColors();
    game.assignGuestNames();
    game.sendUpdate();
  };

  const getGame = (player, socket, requestedGameId, createPrivate, regionId) => {
    requestedGameId = requestedGameId || '';
    createPrivate = createPrivate || false;
    logger.info(socket.id, 'is requesting room', requestedGameId);
    if (requestedGameId.length && allGames[requestedGameId]) {
      logger.info('Room', requestedGameId, 'is valid');
      game = allGames[requestedGameId];
      // Ensure that the same socket doesn't try to join the same game
      // This can happen because we rewrite the browser's URL to reflect
      // the new game ID, causing the view to reload.
      // Also checking the number of players, so node doesn't crash when
      // no one is in this custom room.
      if (game.state === 'awaiting players' && (!game.players.length ||
        game.players[0].socket.id !== socket.id) && game.regionId === regionId) {
        // Put player into the requested game
        logger.info('Allowing player to join', requestedGameId);
        allPlayers[socket.id] = true;
        game.players.push(player);
        socket.join(game.gameID);
        socket.gameID = game.gameID;
        game.assignPlayerColors();
        game.assignGuestNames();
        game.sendUpdate();
        game.sendNotification(`${player.username} has joined the game!`);
        if (game.players.length >= game.playerMaxLimit) {
          gamesNeedingPlayers.shift();
          game.prepareGame();
        }
      } else {
        // TODO: Send an error message back to this user saying the game has already started
      }
    } else {
      // Put players into the general queue
      logger.info('Redirecting player', socket.id, 'to general queue');
      if (createPrivate) {
        createGameWithFriends(player, socket, regionId);
      } else {
        fireGame(player, socket, regionId);
      }
    }
  };

  const joinGame = (socket, data) => {
    const player = new Player(socket);
    data = data || {};
    player.userID = data.userID || 'unauthenticated';

    if (data.userID !== 'unauthenticated') {
      const token = jwt.verify(data.userID, process.env.secret);
      logger.info(token);
      User.findOne({
        email: token.email
      }).exec((err, user) => {
        if (err) {
          logger.info('err', err);
          return err; // Hopefully this never happens.
        }
        if (!user) {
          // If the user's ID isn't found (rare)
          player.username = 'Guest';
          player.avatar = avatars[Math.floor(Math.random() * 4) + 12];
        } else {
          player.username = user.name;
          player.premium = user.premium || 0;
          player.avatar = user.avatar || avatars[Math.floor(Math.random() * 4) + 12];
        }
        getGame(player, socket, data.room, data.createPrivate, data.regionId);
      });
    } else {
      // If the user isn't authenticated (guest)
      player.username = 'Guest';
      player.avatar = avatars[Math.floor(Math.random() * 4) + 12];
      getGame(player, socket, data.room, data.createPrivate, data.regionId);
    }
  };

  const exitGame = (socket) => {
    logger.info(socket.id, 'has disconnected');
    if (allGames[socket.gameID]) { // Make sure game exists
      game = allGames[socket.gameID];
      logger.info(socket.id, 'has left game', game.gameID);
      delete allPlayers[socket.id];
      if (game.state === 'awaiting players' ||
        game.players.length - 1 >= game.playerMinLimit) {
        game.removePlayer(socket.id);
      } else {
        game.stateDissolveGame();
        for (let j = 0; j < game.players.length; j += 1) {
          game.players[j].socket.leave(socket.gameID);
        }
        game.killGame();
        delete allGames[socket.gameID];
      }
    }
    socket.leave(socket.gameID);
  };


  io.sockets.on('connection', (socket) => {
    logger.info(`${socket.id} Connected`);
    socket.emit('id', { id: socket.id });

    socket.on('pickCards', (data) => {
      logger.info(socket.id, 'picked', data);
      if (allGames[socket.gameID]) {
        allGames[socket.gameID].pickCards(data.cards, socket.id);
      } else {
        logger.info('Received pickCard from', socket.id, 'but game does not appear to exist!');
      }
    });

    socket.on('pickWinning', (data) => {
      if (allGames[socket.gameID]) {
        allGames[socket.gameID].pickWinning(data.card, socket.id);
      } else {
        logger.info('Received pickWinning from', socket.id, 'but game does not appear to exist!');
      }
    });

    socket.on('joinGame', (data) => {
      if (!allPlayers[socket.id]) {
        joinGame(socket, data);
      }
    });

    socket.on('joinNewGame', (data) => {
      exitGame(socket);
      joinGame(socket, data);
    });

    socket.on('startGame', () => {
      if (allGames[socket.gameID]) {
        const thisGame = allGames[socket.gameID];
        logger.info('comparing', thisGame.players[0].socket.id, 'with', socket.id);
        if (thisGame.players.length >= thisGame.playerMinLimit) {
          // Remove this game from gamesNeedingPlayers so new players can't join it.
          gamesNeedingPlayers.forEach((gameItem, index) => {
            if (gameItem.gameID === socket.gameID) {
              return gamesNeedingPlayers.splice(index, 1);
            }
          });
          thisGame.prepareGame();
          thisGame.sendNotification('The game has begun!');
        }
      }
    });

    socket.on('leaveGame', () => {
      exitGame(socket);
    });

    socket.on('disconnect', () => {
      logger.info('Rooms on Disconnect ', io.sockets.manager.rooms);
      exitGame(socket);
    });
  });
};
