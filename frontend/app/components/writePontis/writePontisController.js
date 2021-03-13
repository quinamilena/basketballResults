bas_app.controller("writePontisController", writePontisController);

function writePontisController(
  $rootScope,
  $scope,
  $state,
  writePontisService,
  $timeout
) {
  if (!$rootScope.user.active) return $state.go("beginning");
  $rootScope.stateMenu = false;

  $scope.mensagens = {
    error: false,
    success: false,
  };

  $scope.saveGame = () => {
    $scope.game.idUser = $rootScope.user.id;

    writePontisService.saveGame($scope.game).then((reps) => {
      try {
        if (reps.data.status === 200) {
          $scope.game = {};
          $scope.mensagens.success = true;
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
