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
        if (!response.error && response.exist) {
          $scope.$apply(() => {
            $scope.errorLogin = true;
          });

          return;
        } else if (!response.error && !response.exist) {
          $scope.$apply(() => {
            $scope.mensagens.success = true;
          });

          $timeout(() => {
            $state.go("beginning");
          }, 1000);
        } else {
          $scope.$apply(() => {
            $scope.mensagens.error = true;
          });
        }
      } catch (error) {
        $scope.$apply(() => {
          $scope.mensagens.error = true;
        });
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
