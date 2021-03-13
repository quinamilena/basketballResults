bas_app.service("homeService", homeService);

function homeService($http) {
  let _getAllGames = () => {
    return new Promise((result, reject) => {
      try {
        $http({
          url: "../../../db/games.json",
          method: "GET",
        }).then((resp) => {
          return result(resp.data);
        });
      } catch (error) {
        return reject(error);
      }
    });
  };

  return {
    getAllGames: _getAllGames,
  };
}
