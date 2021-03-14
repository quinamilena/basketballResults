var bas_app = angular.module("bas_app", ["ui.router"]);

bas_app.run(($rootScope) => {
  $rootScope.user = {
    id: String(),
    name: String(),
    login: String(),
    record: Number(),
    timeRecord: Number(),
  };
});

bas_app.run(($rootScope, $state) => {
  $rootScope.baseURL = "http://localhost:3333";
  $rootScope.stateMenu = false;

  $rootScope.openAndCloseMenu = () => {
    $rootScope.stateMenu = !$rootScope.stateMenu;
  };

  $rootScope.logoutFun = () => {
    $rootScope.user = {
      id: String(),
      name: String(),
      login: String(),
      record: Number(),
      timeRecord: Number(),
    };

    $state.go("beginning");
  };
});
