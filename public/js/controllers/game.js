/* global firebase */
angular
  .module('mean.system')
  .controller('GameController', [
    '$scope',
    '$http',
    '$window',
    'game',
    '$timeout',
    '$location',
    'MakeAWishFactsService',
    '$firebaseArray',
    ($scope, $http, $window, game, $timeout, $location, MakeAWishFactsService, $firebaseArray) => {

      $scope.hideChatButton = true;
      $scope.hasPickedCards = false;
      $scope.winningCardPicked = false;
      $scope.showTable = false;
      $scope.modalShown = false;
      $scope.game = game;
      $scope.pickedCards = [];
      $scope.selectedUsers = [];
      $scope.invitedUsers = [];
      $scope.filteredUsers = [];
      $scope.allUsers = [];
      let makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
      $scope.makeAWishFact = makeAWishFacts.pop();

      $scope.gameRegion = $location.search().region;

      $scope.switchColors = index => (index % 2 === 0
        ? {
          'background-color': '#F98D3F',
          height: '170px'
        }
        : {
          'background-color': '#256188',
          height: '170px'
        });

      $scope.gameTour = {
        startButton: 'Click this button to start the game.',
        timerBox: `This is the timer. You have 21 seconds to choose an answer
        or 16 seconds to judge others answers (if you are the card czar).`,
        playerBox: 'All the players participating in this game would be shown here.',
        questionBox: 'After the game has started, the question would be displayed in this box.',
        answerBox: 'After the game has started, the answers choosen by ' +
        'you(if you are not the card czar) and others would be shown here.'
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
          return { cursor: 'pointer' };
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

      $scope.showFirst = card => game.curQuestion.numAnswers > 1
        && $scope.pickedCards[0] === card.id;

      $scope.showSecond = card => game.curQuestion.numAnswers > 1
        && $scope.pickedCards[1] === card.id;

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

      // trigger modal
      $scope.triggerModal = () => {
        if (game.players.length < game.playerMinLimit) {
          $('#awaitPlayersModal').modal({ backdrop: 'static', show: true, });
        } else {
          // Todo: use greater than and equal to swap the modals
          $('#startGameModal').modal({ backdrop: 'static', show: true, });
        }
      };

      // Start game
      $scope.startGame = () => {
        game.startGame();
        // Hide the modal once game starts
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

      // save game log
      $scope.saveGameLog = (gameInfo) => {
        const gamePlayers = gameInfo.players.map(player => [player.username, player.points]);
        const gameHistory = {
          winner: gameInfo.players[gameInfo.gameWinner].username,
          round: gameInfo.round,
          czar: gameInfo.players[gameInfo.czar].username,
          gamePlayers,
          gameID: gameInfo.players[0].socketID
        };
        const config = {
          headers: {
            'x-access-token': $window.localStorage.getItem('token')
          },
        };
        $http.post(`/api/games/${gameInfo.gameID}/start`, gameHistory, config)
          .then(res => res.data)
          .catch(err => err);
      };

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
            $location.search({ game: game.gameID });
            if (!$scope.modalShown) {
              setTimeout(() => {
                const link = document.URL;
                const txt = 'Give the following link to your friends so they can join your game: ';
                $('#lobby-how-to-play').text(txt);
                $('#oh-el')
                  .css({
                    'text-align': 'center', 'font-size': '22px', background: 'white', color: 'black'
                  })
                  .text(link);
              }, 200);
              $scope.modalShown = true;
            }
          }
        }
      });

      // Chat
      $scope.$watch('game.gameID', () => {
        $scope.chatMessage = '';
        if (game.gameID) {
          const ref = firebase.database().ref().child('chat').child(`${game.players[0].socketID}`);
          const chat = $firebaseArray(ref);
          chat.$loaded().then(() => {
            $scope.chat = chat;
          });

          $scope.sendMessage = (message) => {
            if (message) {
              const userName = game.players[game.playerIndex].username;
              chat.$add({ userName, message });
              $scope.chatMessage = '';
            }
          };


          $scope.addChat = (event) => {
            if (event) {
              const keyCode = event.which || event.keyCode;
              if (keyCode === 13 && $scope.chatMessage !== '') {
                $scope.sendMessage($scope.chatMessage);
              } else if ($scope.message !== '') {
                $scope.sendMessage($scope.chatMessage);
              }
            }
            // if (message) {
            //   const userName = game.players[game.playerIndex].username;
            //   chat.$add({ userName, message });
            //   $scope.chatMessage = '';
            // }
          };

          $(document).ready(() => {
            const emoji = $('#inlineFormInputMD').emojioneArea({
              pickerPosition: 'top',
              recentEmojis: true,
              events: {
                keyup: (editor, event) => {
                  const keyCode = event.which;
                  if (keyCode === 13) {
                    $scope.chatMessage = emoji.data('emojioneArea').getText();
                    emoji.data('emojioneArea').setText('');
                    $scope.addChat(event);
                  } else {
                    $scope.chatMessage = emoji.data('emojioneArea').getText();
                  }
                }
              }
            });
          });

          let currentChatLength = chat.length;
          $scope.newChatLength = 0;
          chat.$watch(() => {
            $scope.newChatLength += chat.length - currentChatLength;
            currentChatLength = chat.length;
            $scope.chat = chat;
            if ($('#chatModal').hasClass('show')) {
              $scope.newChatLength = 0;
            }
            $('.msg_container_base').animate({ scrollTop: 9999 }, 'slow');
          });

          $scope.resetChatLength = () => {
            $scope.hideChatButton = false;
            $('.msg_container_base').animate({ scrollTop: 9999 }, 'slow');
            $scope.newChatLength = 0;
          };

          $scope.stopChatting = () => {
            ref.remove();
            $scope.newChatLength = 0;
          };
        }
      });
      // Chat

      // Add this to the game controller
      $scope.allAnswers = (table) => {
        const allAnswerCard = table.map(answer => answer.card).filter(card => typeof card === 'object');
        const result = allAnswerCard
          .concat
          .apply([], allAnswerCard);
        return result;
      };

      $scope.startRound = () => {
        game.startRound();
      };

      if ($location.search().game && !(/^\d+$/).test($location.search().game)) {
        game.joinGame($scope.gameRegion, 'joinGame', $location.search().game);
      } else if ($location.search().custom) {
        game.joinGame($scope.gameRegion, 'joinGame', null, true);
      } else {
        game.joinGame($scope.gameRegion);
      }

      // trigger invite modal
      const triggerInviteModal = () => {
        $('#inviteFriends').modal({ show: true, });
      };

      $scope.getUsers = () => {
        $http({
          method: 'GET',
          url: 'api/search/users'
        }).then((response) => {
          $scope.allUsers = [...response.data];
        }).then(() => {
          triggerInviteModal();
        });
      };
      $scope.countPlayers = (userEmail) => {
        $scope.selectedUsers.push(userEmail);
      };

      $scope.selectedUsersLength = $scope.selectedUsers.length;
      $scope.showSending = false;

      $scope.invitePlayers = (email) => {
        const userDetails = {
          email,
          urlLink: document.URL,
        };
        $http({
          method: 'POST',
          url: '/api/user/invite/:user',
          data: userDetails
        });
        // Close invitation modal and show mail sent information
        $scope.showSending = true;
        setTimeout(() => { $('#inviteFriends').modal('hide'); }, 3000);
        setTimeout(() => { $scope.showSending = false; }, 3000);
        $scope.input = '';
        $scope.searchTerm = '';
      };

      $scope.filteredUsersLength = $scope.filteredUsers.length;
      $scope.searchUsers = (searchTerm) => {
        if (!searchTerm) {
          $scope.filteredUsers = [];
        } else {
          const regexSearchTerm = RegExp($scope.searchTerm, 'gi');
          $scope.filteredUsers = $scope.allUsers.filter((user) => {/* eslint-disable-line */
            if (user.name.search(regexSearchTerm) !== -1) {
              return user;
            }
          });
        }
      };

      $scope.input = '';
      $scope.updateEmailEntry = (user) => {
        $scope.input = user.email;
      };
    }
  ]);
