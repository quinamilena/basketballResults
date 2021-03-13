bas_app.controller("signinController", signinController);

function signinController($rootScope, $scope, $state, $timeout, signinService) {
  $scope.errorLogin = false;
  $scope.user = {
    name: String(),
    login: String(),
    record: Number(),
    timeRecord: Number(),
  };

  $scope.mensagens = {
    error: false,
    success: false,
  };

  $scope.saveUser = () => {
    signinService.saveUser($scope.user).then((response) => {
      try {
        if (response.status === 200 && response.exist) {
          $scope.errorLogin = true;

          return;
        } else if (response.status === 200 && !response.exist) {
          $scope.mensagens.success = true;

          $timeout(() => {
            $state.go("beginning");
          }, 1000);
        } else {
          $scope.mensagens.error = true;
        }
      } catch (error) {
        $scope.mensagens.error = true;
        return console.error(error);
      }
    });

    $timeout(() => {
      $scope.mensagens = {
        error: false,
        success: false,
      };
    }, 2000);
  };
}
