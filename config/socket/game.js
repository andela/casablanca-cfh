const async = require('async');
const _ = require('underscore');

const questions = require(`${__dirname}/../../app/controllers/questions.js`); /* eslint-disable-line */
const answers = require(`${__dirname}/../../app/controllers/answers.js`); /* eslint-disable-line */
const guestNames = [
  'Troublesome Tunmise',
  'Laughing Labake',
  'Fun Faith',
  'Incredible Idrees',
  'Funky Felix',
  'Obnoxious Obi',
  'Easy Efosa',
  'Gallant Gabriel',
  'Super Segun',
  'Silent Samuel',
  'Tiny Taiwo',
  'Kind Kachi'
];
/**
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   * @param {object} gameID
   * @param {object} io
   * @memberof Game
   */
  constructor(gameID, io) {
    this.io = io;
    this.gameID = gameID;
    this.players = []; // Contains array of player models
    this.table = []; // Contains array of {card: card, player: player.id}
    this.winningCard = -1; // Index in this.table
    this.gameWinner = -1; // Index in this.players
    this.winnerAutopicked = false;
    this.czar = -1; // Index in this.players
    this.playerMinLimit = 3;
    this.playerMaxLimit = 6;
    this.pointLimit = 5;
    this.state = 'awaiting players';
    this.round = 0;
    this.questions = null;
    this.answers = null;
    this.curQuestion = null;
    this.timeLimits = {
      stateChoosing: 21,
      stateJudging: 16,
      stateResults: 6
    };
    // setTimeout ID that triggers the czar judging state
    // Used to automatically run czar judging if players don't pick before time limit
    // Gets cleared if players finish picking before time limit.
    this.choosingTimeout = 0;
    // setTimeout ID that triggers the result state
    // Used to automatically run result if czar doesn't decide before time limit
    // Gets cleared if czar finishes judging before time limit.
    this.judgingTimeout = 0;
    this.resultsTimeout = 0;
    this.guestNames = guestNames.slice();
  }
  /**
 * @returns {object} payload
 * @memberof Game
 */
  payload() {
    const players = [];
    this.players.forEach((player, index) => { /* eslint-disable-line no-unused-vars */
      players.push({
        hand: player.hand,
        points: player.points,
        username: player.username,
        avatar: player.avatar,
        premium: player.premium,
        socketID: player.socket.id,
        color: player.color
      });
    });
    return {
      gameID: this.gameID,
      players,
      czar: this.czar,
      state: this.state,
      round: this.round,
      gameWinner: this.gameWinner,
      winningCard: this.winningCard,
      winningCardPlayer: this.winningCardPlayer,
      winnerAutopicked: this.winnerAutopicked,
      table: this.table,
      pointLimit: this.pointLimit,
      curQuestion: this.curQuestion
    };
  }
  /**
 *@returns {object} notification
 * @param {object} msg
 * @memberof Game
 */
  sendNotification(msg) {
    this.io.sockets.in(this.gameID).emit('notification', { notification: msg });
  }

  // Currently called on each joinGame event from socket.js
  /**
   * @returns {object} playerColors
   * @memberof Game
   */
  assignPlayerColors() {
    this.players.forEach((player, index) => {
      player.color = index;
    });
  }
  /**
 * @returns {object} guest Names
 * @memberof Game
 */
  assignGuestNames() {
    const self = this;
    this.players.forEach((player) => {
      if (player.username === 'Guest') {
        const randIndex = Math.floor(Math.random() * self.guestNames.length);
        player.username = self.guestNames.splice(randIndex, 1)[0]; /* eslint-disable-line */
        if (!self.guestNames.length) {
          self.guestNames = guestNames.slice();
        }
      }
    });
  }
  /**
 * @returns {object} questions
 * @memberof Game
 */
  prepareGame() {
    this.state = 'game in progress';

    this.io.sockets.in(this.gameID).emit(
      'prepareGame',
      {
        playerMinLimit: this.playerMinLimit,
        playerMaxLimit: this.playerMaxLimit,
        pointLimit: this.pointLimit,
        timeLimits: this.timeLimits
      }
    );

    const self = this;
    async.parallel(
      [
        this.getQuestions,
        this.getAnswers
      ],
      (err, results) => {
        if (err) {
          throw err;
        }
        self.questions = results[0]; /* eslint-disable-line */
        self.answers = results[1]; /* eslint-disable-line */

        self.startGame();
      }
    );
  }
  /**
 *
 * @returns {object} game screen
 * @memberof Game
 */
  startGame() {
    this.shuffleCards(this.questions);
    this.shuffleCards(this.answers);
    // this.stateChoosing(this);
    this.chooseCzar(this);
    this.sendUpdate();
  }
  /**
 *
 * @returns {object} startRound
 * @param {object} self
 * @memberof Game
 */
  startRound(self) {
    this.stateChoosing(self);
  }
  /**
 *
 * @returns {object} chooseCzar
 * @param {object} self
 * @memberof Game
 */
  chooseCzar(self) { /* eslint-disable-line */
    self.table = [];
    self.state = 'czar should pick a card';
    if (self.czar >= self.players.length - 1) {
      self.czar = 0;
    } else {
      self.czar += 1;
    }
    self.sendUpdate();
  }
  /**
 * @returns {object} sendupdate object
 * @memberof Game
 */
  sendUpdate() {
    this.io.sockets.in(this.gameID).emit('gameUpdate', this.payload());
  }
  /**
 *
 *@returns{object} startchoosing object
 * @param {ovject} self
 * @memberof Game
 */
  stateChoosing(self) { /* eslint-disable-line */
    self.state = 'waiting for players to pick';
    // console.log(self.gameID,self.state);
    self.table = [];
    self.winningCard = -1;
    self.winningCardPlayer = -1;
    self.winnerAutopicked = false;
    self.curQuestion = self.questions.pop();
    if (!self.questions.length) {
      self.getQuestions((err, data) => {
        self.questions = data;
      });
    }
    self.round += 1;
    self.dealAnswers();
    self.sendUpdate();

    self.choosingTimeout = setTimeout(() => {
      self.stateJudging(self);
    }, self.timeLimits.stateChoosing * 1000);
  }
  /**
 * @returns {object} selectFist object
 * @memberof Game
 */
  selectFirst() {
    if (this.table.length) {
      this.winningCard = 0;
      const winnerIndex = this._findPlayerIndexBySocket(this.table[0].player); /* eslint-disable-line */
      this.winningCardPlayer = winnerIndex;
      this.players[winnerIndex].points += 1;
      this.winnerAutopicked = true;
      this.stateResults(this);
    } else {
      this.chooseCzar(this);
    }
  }
  /**
 * @returns {object} stateJudging object
 * @param {object} self
 * @memberof Game
 */
  stateJudging(self) { /* eslint-disable-line */
    self.state = 'waiting for czar to decide';
    if (self.table.length <= 1) {
    // Automatically select a card if only one card was submitted
      self.selectFirst();
    } else {
      self.sendUpdate();
      self.judgingTimeout = setTimeout(() => {
      // Automatically select the first submitted card when time runs out.
        self.selectFirst();
      }, self.timeLimits.stateJudging * 1000);
    }
  }
  /**
 * @returns {object} stateResult object
 * @param {object} self
 * @memberof Game
 */
  stateResults(self) { /* eslint-disable-line */
    self.state = 'winner has been chosen';
    // TODO: do stuff
    let winner = -1;
    for (let i = 0; i < self.players.length; i += 1) {
      if (self.players[i].points >= self.pointLimit) {
        winner = i;
      }
    }
    self.sendUpdate();
    self.resultsTimeout = setTimeout(() => {
      if (winner !== -1) {
        self.stateEndGame(winner);
      } else {
        self.chooseCzar(self);
      }
    }, self.timeLimits.stateResults * 1000);
  }
  /**
 *
 * @returns {object} EnnGame object
 * @param {object} winner
 * @memberof Game
 */
  stateEndGame(winner) {
    this.state = 'game ended';
    this.gameWinner = winner;
    this.sendUpdate();
  // this.io.sockets.in(this.gameID).emit('gameLog', gameHistory);
  }
  /**
 *
 * @returns {object} dissolveGame object
 * @memberof Game
 */
  stateDissolveGame() {
    this.state = 'game dissolved';
    this.sendUpdate();
  }
  /**
 *@returns {object} getQuestion object
 * @param {any} cb
 * @memberof Game
 */
  getQuestions(cb) { /* eslint-disable-line */
    questions.allQuestionsForGame((data) => {
      cb(null, data);
    });
  }
  /**
 * @returns {object} getAnswers object
 * @param {any} cb
 * @memberof Game
 */
  getAnswers(cb) { /* eslint-disable-line */
    answers.allAnswersForGame((data) => {
      cb(null, data);
    });
  }
  /**
 *
 * @returns {object} shuffleCard object
 * @param {object} cards
 * @memberof Game
 */
  shuffleCards(cards) { /* eslint-disable-line */
    let shuffleIndex = cards.length;
    let temp;
    let randNum;

    while (shuffleIndex) {
      randNum = Math.floor(Math.random() * (shuffleIndex -= 1));
      temp = cards[randNum];
      cards[randNum] = cards[shuffleIndex];
      cards[shuffleIndex] = temp;
    }

    return cards;
  }
  /**
 *
 * @returns {object} dealAnswers object
 * @param {any} maxAnswers
 * @memberof Game
 */
  dealAnswers(maxAnswers) {
    maxAnswers = maxAnswers || 10;
    const storeAnswers = (err, data) => {
      this.answers = data;
    };
    for (let i = 0; i < this.players.length; i += 1) {
      while (this.players[i].hand.length < maxAnswers) {
        this.players[i].hand.push(this.answers.pop());
        if (!this.answers.length) {
          this.getAnswers(storeAnswers);
        }
      }
    }
  }
  /**
 *
 *
 * @param {object} thisPlayer
 * @returns {object} find players by socket
 * @memberof Game
 */
  _findPlayerIndexBySocket(thisPlayer) {
    let playerIndex = -1;
    _.each(this.players, (player, index) => {
      if (player.socket.id === thisPlayer) {
        playerIndex = index;
      }
    });
    return playerIndex;
  }
  /**
 *
 * @returns {object} pickCard object
 * @param {object} thisCardArray
 * @param {object} thisPlayer
 * @memberof Game
 */
  pickCards(thisCardArray, thisPlayer) {
  // Only accept cards when we expect players to pick a card
    if (this.state === 'waiting for players to pick') {
    // Find the player's position in the players array
      const playerIndex = this._findPlayerIndexBySocket(thisPlayer); /* eslint-disable-line */
      if (playerIndex !== -1) {
      // Verify that the player hasn't previously picked a card
        let previouslySubmitted = false;
        _.each(this.table, (pickedSet, index) => { /* eslint-disable-line */
          if (pickedSet.player === thisPlayer) {
            previouslySubmitted = true;
          }
        });
        if (!previouslySubmitted) {
        // Find the indices of the cards in the player's hand (given the card ids)
          const tableCard = [];
          for (let i = 0; i < thisCardArray.length; i += 1) {
            let cardIndex = null;
            for (let j = 0; j < this.players[playerIndex].hand.length; j += 1) {
              if (this.players[playerIndex].hand[j].id === thisCardArray[i]) {
                cardIndex = j;
              }
            }
            if (cardIndex !== null) {
              tableCard.push(this.players[playerIndex].hand.splice(cardIndex, 1)[0]);
            }
          }
          if (tableCard.length === this.curQuestion.numAnswers) {
            this.table.push({
              card: tableCard,
              player: this.players[playerIndex].socket.id
            });
          }
          if (this.table.length === this.players.length - 1) {
            clearTimeout(this.choosingTimeout);
            this.stateJudging(this);
          } else {
            this.sendUpdate();
          }
        }
      }
    }
  }
  /**
 *
 *
 * @param {object} thisPlayer
 * @returns {object} get players object
 * @memberof Game
 */
  getPlayer(thisPlayer) {
    const playerIndex = this._findPlayerIndexBySocket(thisPlayer); /* eslint-disable-line */
    if (playerIndex > -1) {
      return this.players[playerIndex];
    }
    return {};
  }
  /**
 *
 *
 * @param {object} thisPlayer
 * @returns {object} remove players object
 * @memberof Game
 */
  removePlayer(thisPlayer) {
    const playerIndex = this._findPlayerIndexBySocket(thisPlayer); /* eslint-disable-line */

    if (playerIndex !== -1) {
    // Just used to send the remaining players a notification
      const playerName = this.players[playerIndex].username;

      // If this player submitted a card, take it off the table
      for (let i = 0; i < this.table.length; i += 1) {
        if (this.table[i].player === thisPlayer) {
          this.table.splice(i, 1);
        }
      }

      // Remove player from this.players
      this.players.splice(playerIndex, 1);

      if (this.state === 'awaiting players') {
        this.assignPlayerColors();
      }

      // Check if the player is the czar
      if (this.czar === playerIndex) {
      // If the player is the czar...
      // If players are currently picking a card, advance to a new round.
        if (this.state === 'waiting for players to pick') {
          clearTimeout(this.choosingTimeout);
          this.sendNotification('The Czar left the game! Starting a new round.');
          return this.stateChoosing(this);
        } else if (this.state === 'waiting for czar to decide') {
        // If players are waiting on a czar to pick, auto pick.
          this.sendNotification('The Czar left the game! First answer submitted wins!');
          this.pickWinning(this.table[0].card[0].id, thisPlayer, true);
        }
      } else {
      // Update the czar's position if the removed player is above the current czar
        if (playerIndex < this.czar) {
          this.czar -= 1;
        }
        this.sendNotification(`${playerName} has left the game.`);
      }

      this.sendUpdate();
    }
  }
  /**
 *
 * @returns {object} pickWining object
 * @param {object} thisCard
 * @param {object} thisPlayer
 * @param {object} autopicked
 * @memberof Game
 */
  pickWinning(thisCard, thisPlayer, autopicked) {
    autopicked = autopicked || false;
    const playerIndex = this._findPlayerIndexBySocket(thisPlayer); /* eslint-disable-line */
    if ((playerIndex === this.czar || autopicked) && this.state === 'waiting for czar to decide') {
      let cardIndex = -1;
      _.each(this.table, (winningSet, index) => {
        if (winningSet.card[0].id === thisCard) {
          cardIndex = index;
        }
      });
      if (cardIndex !== -1) {
        this.winningCard = cardIndex;
        const winnerIndex = this._findPlayerIndexBySocket(this.table[cardIndex].player); /* eslint-disable-line */
        this.sendNotification(`${this.players[winnerIndex].username} has won the round!`);
        this.winningCardPlayer = winnerIndex;
        this.players[winnerIndex].points += 1;
        clearTimeout(this.judgingTimeout);
        this.winnerAutopicked = autopicked;
        this.stateResults(this);
      }
    } else {
    // TODO: Do something?
      this.sendUpdate();
    }
  }
  /**
 *
 * @returns {object} killGame object
 * @memberof Game
 */
  killGame() {
    clearTimeout(this.resultsTimeout);
    clearTimeout(this.choosingTimeout);
    clearTimeout(this.judgingTimeout);
  }
}


module.exports = Game;
