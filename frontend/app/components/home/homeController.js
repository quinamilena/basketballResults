bas_app.controller("homeController", homeController);

function homeController($rootScope, $scope, $state, homeService) {
  if (!$rootScope.user.active) return $state.go("beginning");
  $rootScope.stateMenu = false;

  homeService.gameFirts().then((resp) => {
    $scope.$apply(() => {
      $scope.allGames = resp.data;
    });
  });
}
