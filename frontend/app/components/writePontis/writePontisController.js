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
    let month =
      $scope.game.dtGame.getMonth() > 9
        ? String(Number($scope.game.dtGame.getMonth() + 1))
        : String("0" + Number($scope.game.dtGame.getMonth() + 1));

    let year = String($scope.game.dtGame.getFullYear());

    let day =
      $scope.game.dtGame.getDay() > 9
        ? String(Number($scope.game.dtGame.getDay() + 1))
        : String("0" + Number($scope.game.dtGame.getDay() + 1));

    $scope.game.gameDate = String(year + "-" + month + "-" + day);

    writePontisService.saveGame($scope.game).then((reps) => {
      try {
        if (!reps.error) {
          $scope.$apply(() => {
            $scope.game = {};

            $scope.mensagens.success = true;
          });
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
