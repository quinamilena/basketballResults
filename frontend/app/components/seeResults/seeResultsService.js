bas_app.service("seeResultsService", seeResultsService);

function seeResultsService($http) {
  let _getUserResult = () => {
    return new Promise((result, reject) => {
      try {
        $http({
          url: "../../../db/results.json",
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
    getUserResult: _getUserResult,
  };
}
