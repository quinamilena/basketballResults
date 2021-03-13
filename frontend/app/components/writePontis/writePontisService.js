bas_app.service("writePontisService", writePontisService);

function writePontisService($http) {
  let _saveGame = (game) => {
    return new Promise((result, reject) => {
      try {
        game.id = "0111";
        console.dir(game);
        // $http({
        //   url: "../../../db/results.json",
        //   method: "GET",
        // }).then((resp) => {
        return result({ data: { status: 500 } });
        // });
      } catch (error) {
        return reject(error);
      }
    });
  };

  return {
    saveGame: _saveGame,
  };
}
