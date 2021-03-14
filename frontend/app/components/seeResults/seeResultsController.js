bas_app.controller("seeResultsController", seeResultsController);

function seeResultsController($rootScope, $scope, $state, seeResultsService) {
  if (!$rootScope.user.active) return $state.go("beginning");
  $rootScope.stateMenu = false;

  $scope.resultUser = {};

  seeResultsService.getUserResult().then((response) => {
    $scope.$apply(() => {
      $scope.resultUser = response.data;
    });
  });
}
