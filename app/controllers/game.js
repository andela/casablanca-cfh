import Game from '../models/game';

exports.SaveGameLog = (req, res) => {
  const { gameID } = req.params;
  const {
    gamePlayers, round, czar, winner
  } = req.body;
  Game.create({
    gamePlayers, round, czar, gameID, winner
  })
    .then((game) => {
      res.status(201).send({
        success: true,
        message: 'Game successfully saved',
        game
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: false,
        message: 'Saving game history failed',
        error: error.message
      });
    });
};
exports.getGameLog = (req, res) => {
  Game.find({})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
};
// export default SaveGameLog;
