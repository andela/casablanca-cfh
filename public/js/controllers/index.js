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
      } else {
        return false;
      }
    };

    $scope.avatars = [];
    AvatarService.getAvatars()
      .then((data) => {
        $scope.avatars = data;
      });

    $scope.signup = (user) => {
      $http.post('/api/auth/signup', user)
        .then((response) => {
          console.log(response);
          $location.path('/');
          $window.localStorage.setItem('token', response.data.token);
        });
    };
}]);
