import Game from '../models/game';

export default GameHistory = (req, res) => {
  // dave the game history
  const { gameID } = req.params;
  const {
    players, round, czar, winner
  } = req.body;
  Game.create({
    players, round, czar, gameID, winner
  })
    .then((game) => {
      res.status(201).send({
        success: true,
        game
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: false,
        message: ' Creating game history failed',
        error: error.message
      });
    });
};
