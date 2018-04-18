import Game from '../models/game';

exports.SaveGameLog = (req, res) => {
  const {
    gamePlayers, round, winner, gameID
  } = req.body;
  Game.create({
    gamePlayers, round, gameID, winner
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
  Game.aggregate([
    {
      $group: {
        _id: '$gameID',
        winner: { $first: '$winner' },
        gamePlayers: { $first: '$gamePlayers' },
        round: { $first: '$round' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' }
      }
    }
  ])
    .then((response) => {
      res.status(200).send({
        success: true,
        message: 'Previous games',
        response
      });
    })
    .catch(() => {
      res.status(500).send({
        success: false,
        message: 'An error occured fetching previous games'
      });
    });
};
// export default SaveGameLog;
