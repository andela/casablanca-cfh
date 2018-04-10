angular
  .module('mean.system')
  .controller('GameController', [
    '$scope',
    'game',
    '$timeout',
    '$location',
    'MakeAWishFactsService',
    '$http',
    '$window',
    ($scope, game, $timeout, $location, MakeAWishFactsService, $http, $window) => {
      $scope.hasPickedCards = false;
      $scope.winningCardPicked = false;
      $scope.showTable = false;
      $scope.modalShown = false;
      $scope.game = game;
      $scope.pickedCards = [];
      let makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
      $scope.makeAWishFact = makeAWishFacts.pop();

      $scope.switchColors = (index) => index % 2 === 0
        ? {
          'background-color': '#F98D3F',
          height: '170px'
        }
        : {
          'background-color': '#256188',
          height: '170px'
        };

      $scope.pickCard = (card) => {
        if (!$scope.hasPickedCards) {
          if ($scope.pickedCards.indexOf(card.id) < 0) {
            $scope
              .pickedCards
              .push(card.id);
            if (game.curQuestion.numAnswers === 1) {
              $scope.sendPickedCards();
              $scope.hasPickedCards = true;
            } else if (game.curQuestion.numAnswers === 2 && $scope.pickedCards.length === 2) {
              // delay and send
              $scope.hasPickedCards = true;
              $timeout($scope.sendPickedCards, 300);
            }
          } else {
            $scope
              .pickedCards
              .pop();
          }
        }
      };

      $scope.pointerCursorStyle = () => {
        if ($scope.isCzar() && $scope.game.state === 'waiting for czar to decide') {
          return {cursor: 'pointer'};
        }
        return {};
      };

      $scope.sendPickedCards = () => {
        game.pickCards($scope.pickedCards);
        $scope.showTable = true;
      };

      $scope.cardIsFirstSelected = (card) => {
        if (game.curQuestion.numAnswers > 1) {
          return card === $scope.pickedCards[0];
        }
        return false;
      };

      $scope.cardIsSecondSelected = (card) => {
        if (game.curQuestion.numAnswers > 1) {
          return card === $scope.pickedCards[1];
        }
        return false;
      };

      $scope.firstAnswer = ($index) => {
        if ($index % 2 === 0 && game.curQuestion.numAnswers > 1) {
          return true;
        }
        return false;
      };

      $scope.secondAnswer = ($index) => {
        if ($index % 2 === 1 && game.curQuestion.numAnswers > 1) {
          return true;
        }
        return false;
      };

      $scope.showFirst = card => game.curQuestion.numAnswers > 1 && $scope.pickedCards[0] === card.id;

      $scope.showSecond = card => game.curQuestion.numAnswers > 1 && $scope.pickedCards[1] === card.id;

      $scope.isCzar = () => game.czar === game.playerIndex;

      $scope.isPlayer = $index => $index === game.playerIndex;

      $scope.isCustomGame = () => !(/^\d+$/).test(game.gameID) && game.state === 'awaiting players';

      $scope.isPremium = $index => game.players[$index].premium;

      $scope.currentCzar = $index => $index === game.czar;

      $scope.winningColor = ($index) => {
        if (game.winningCardPlayer !== -1 && $index === game.winningCard) {
          return $scope.colors[game.players[game.winningCardPlayer].color];
        }
        return '#f9f9f9';
      };

      $scope.pickWinning = (card) => {
        if ($scope.isCzar()) {
          game.pickWinning(card);
          $scope.winningCardPicked = true;
        }
      };

      $scope.winnerPicked = () => game.winningCard !== -1;

      $scope.startGame = () => {
        game.startGame();
        $('#startGameModal').modal('hide');
      };

      $scope.abandonGame = () => {
        game.leaveGame();
        $location.path('/');
      };

      // Catches changes to round to update when no players pick card (because
      // game.state remains the same)
      $scope.$watch('game.round', () => {
        $scope.hasPickedCards = false;
        $scope.showTable = false;
        $scope.winningCardPicked = false;
        $scope.makeAWishFact = makeAWishFacts.pop();
        if (!makeAWishFacts.length) {
          makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
        }
        $scope.pickedCards = [];
      });

      // In case player doesn't pick a card in time, show the table
      $scope.$watch('game.state', () => {
        if (game.state === 'waiting for czar to decide' && $scope.showTable === false) {
          $scope.showTable = true;
        }
        // check if game ended and call the save log method
        if (game.state === 'game ended') {
          $scope.saveGameLog(game);
        }
      });

      $scope.$watch('game.gameID', () => {
        if (game.gameID && game.state === 'awaiting players') {
          if (!$scope.isCustomGame() && $location.search().game) {
            // If the player didn't successfully enter the request room, reset the URL so
            // they don't think they're in the requested room.
            $location.search({});
          } else if ($scope.isCustomGame() && !$location.search().game) {
            // Once the game ID is set, update the URL if this is a game with friends, where
            // the link is meant to be shared.
            $location.search({game: game.gameID});
            if (!$scope.modalShown) {
              setTimeout(() => {
                const link = document.URL;
                const txt = 'Give the following link to your friends so they can join your game: ';
                $('#lobby-how-to-play').text(txt);
                $('#oh-el')
                  .css({'text-align': 'center', 'font-size': '22px', background: 'white', color: 'black'})
                  .text(link);
              }, 200);
              $scope.modalShown = true;
            }
          }
        }
      });

      $scope.triggerModal = () => {
        if (game.players.length < game.playerMinLimit) {
          $('#awaitPlayersModal').modal('show');
        } else {
          // Todo: use greater than and equal to swap the modals
          $('#startGameModal').modal('show');
        }
      };

      $scope.saveGameLog = (gameInfo) => {
        console.log(gameInfo.state);
        console.log('===>gameInfo', gameInfo);
        const gamePlayers = gameInfo
          .players
          .map(players => players.username);
        const gameHistory = {
          winner: gameInfo.winner,
          round: gameInfo.round,
          gamePlayers

        };
        const request = {
          method: 'POST',
          url: `/api/games/${gameInfo.gameID}/start`,
          headers: {
            'x-access-token': $window
              .localStorage
              .getItem('token')
          },
          gameHistory
        };
        $http(request).then(res => console.log('===>Response', res.data)

        // response => response.data, error => error.data
        );
      };

      // Add this to the game controller
      $scope.allAnswers = (table) => {
        const allAnswerCard = table.map((answer) => answer.card).filter((card) => typeof card === 'object');
        const result = allAnswerCard
          .concat
          .apply([], allAnswerCard);
        return result;
      };

      if ($location.search().game && !(/^\d+$/).test($location.search().game)) {
        game.joinGame('joinGame', $location.search().game);
      } else if ($location.search().custom) {
        game.joinGame('joinGame', null, true);
      } else {
        game.joinGame();
      }
    }
  ]);
