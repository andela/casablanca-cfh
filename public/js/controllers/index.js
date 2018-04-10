angular.module('mean.system')
  .controller('IndexController', ['$scope', '$http', '$window', 'Global', '$location', 'socket', 'game', 'AvatarService', ($scope, $http, $window, Global, $location, socket, game, AvatarService) => {
    $scope.global = Global;
    $scope.name = '';
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
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
    $scope.signup = (user, signupForm) => {
      $scope.signupFormSubmitted = true;
      $scope.signupError = null;
      if (signupForm.$valid) {
        $http.post('/api/auth/signup', user)
          .then((response) => {
            $location.path('/');
            $window.localStorage.setItem('token', response.data.token);
          }, (error) => {
            $scope.signupError = error.data.message;
          });
        $scope.signupFormSubmitted = false;
      }
    };

    $scope.signin = (user, signinForm) => {
      $scope.signinFormSubmitted = true;
      $scope.signinError = null;
      if (signinForm.$valid) {
        $http.post('/api/auth/login', user)
          .then((response) => {
            $location.path('/');
            $window.localStorage.setItem('token', response.data.token);
          }, (error) => {
            $scope.signinError = error.data.message;
          });
        $scope.signinFormSubmitted = false;
      }
    };
  }]);
