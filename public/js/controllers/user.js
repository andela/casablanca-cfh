angular.module('mean-system')
.controller('UserController', ['$scope', '$location', '$http',
    ($scope, $location, $http) => {
      const vm = $scope;

      vm.signup = (user) => {
        vm.user = {
          email: user.email,
          name: user.name,
          password: user.password,
          username: user.username
        };
        $http.post('/api/auth/signup', vm.user)
          .then((response) => {
            $location.path('/');
            localStorage.setItem('token', response.data.token);
          });
      };
    }]);
