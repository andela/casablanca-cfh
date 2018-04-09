angular.module('mean.system')
  .controller('IndexController', ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', '$http', '$window', ($scope, Global, $location, socket, game, AvatarService, $http, $window) => {
    $scope.global = Global;

    $scope.playAsGuest = () => {
      game.joinGame();
      $location.path('/app');
    };

    $scope.showError = () => {
      if ($location.search().error) {
        return $location.search().error;
      }
      return false;
    };

    $scope.avatars = [];
    AvatarService.getAvatars()
      .then((data) => {
        $scope.avatars = data;
      });

    // $scope.saveGameLog = (gameHistory) => {
    //   if (game.state === ' game ended' && $window.localStorage.token) {
    //     const request = {
    //       method: 'POST',
    //       url: `http://localhost:3000/api/games/${game.gameID}/start`,
    //       headers: {
    //         'x-access-token': $window.localStorage.getItem('token')
    //       },
    //       gameHistory
    //     };
    //     $http(request)
    //       .then(
    //         response => response.data,
    //         error => error.data
    //       );
    //   }
    // };
  }]);
