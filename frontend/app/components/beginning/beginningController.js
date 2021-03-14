bas_app.controller("beginningController", beginningController);

function beginningController($rootScope, $scope, $state, beginningService) {
  $scope.errorLoginShow = false;

  $scope.checkLogin = (login) => {
    if (!login) return;

    beginningService.checkLogin(login).then((res) => {
      if (!res.error) {
        let data = res.data;

        $rootScope.user = {
          id: data.id,
          name: data.name,
          login: data.login,
          active: true,
        };

        return $state.go("home");
      } else {
        $scope.$apply(() => {
          $scope.errorLoginShow = true;
        });
      }
    });
  };

  $scope.removeError = () => {
    $scope.errorLoginShow = false;
  };
}
