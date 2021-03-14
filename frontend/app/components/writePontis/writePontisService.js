bas_app.service("writePontisService", writePontisService);

function writePontisService($http, $rootScope) {
  let _saveGame = (game) => {
    delete game.dtGame;

    return new Promise((result, reject) => {
      try {
        $http({
          url: $rootScope.baseURL + "/game",
          method: "POST",
          headers: {
            authorization: $rootScope.user.id,
          },
          data: game,
        }).then((resp) => {
          if (resp.data.error) return reject(error);

          return result(resp.data);
        });
      } catch (error) {
        return reject(error);
      }
    });
  };

  return {
    saveGame: _saveGame,
  };
}
