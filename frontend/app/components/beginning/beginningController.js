bas_app.controller("beginningController", beginningController);

function beginningController($rootScope, $scope, $state, beginningService) {
  $scope.errorLoginShow = false;

  $scope.checkLogin = (login) => {
    if (!login) return;

    beginningService.checkLogin(login).then((res) => {
      if (res.length > 0) {
        let data = res[0];

        $rootScope.user = {
          id: data.id,
          name: data.name,
          login: data.login,
          record: data.record,
          timeRecord: data.timeRecord,
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
