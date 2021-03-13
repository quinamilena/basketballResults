bas_app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("beginning", {
      url: "/",
      templateUrl: "./app/components/beginning/beginningView.html",
      controller: "beginningController",
    })
    .state("home", {
      url: "/home",
      templateUrl: "./app/components/home/homeView.html",
      controller: "homeController",
    })
    .state("writePontis", {
      url: "/writePontis",
      templateUrl: "./app/components/writePontis/writePontisView.html",
      controller: "writePontisController",
    })
    .state("seeResults", {
      url: "/seeResults",
      templateUrl: "./app/components/seeResults/seeResultsView.html",
      controller: "seeResultsController",
    })
    .state("signin", {
      url: "/signin",
      templateUrl: "./app/components/signin/signinView.html",
      controller: "signinController",
    });
});
