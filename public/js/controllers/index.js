angular.module('mean.system')
  .controller('IndexController', ['$scope', '$http', '$window', 'Global', '$location', 'socket', 'game', 'AvatarService', ($scope, $http, $window, Global, $location, socket, game, AvatarService) => {
    $scope.global = Global;
    $scope.name = '';
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.custom = false;

    $scope.setCustom = () => {
      $scope.custom = true;
    };

    $scope.playAsGuest = () => {
      game.joinGame($scope.regionId);
      $location.path('/app').search({ regionId: $scope.gameRegion });
    };

    $scope.playGame = () => {
      $window.location = `/play?regionId=${$scope.gameRegion}`;
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

    $scope.signout = () => {
      $window.localStorage.removeItem('token');
      $window.location.reload();
    };

    $scope.loggedIn = !!$window.localStorage.getItem('token');
    $scope.userButton = $scope.loggedIn ? 'Play With Strangers' : 'Play As Guest';
  }]);
