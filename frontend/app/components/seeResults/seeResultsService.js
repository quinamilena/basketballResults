bas_app.service("seeResultsService", seeResultsService);

function seeResultsService($http, $rootScope) {
  let _getUserResult = () => {
    return new Promise((result, reject) => {
      try {
        $http({
          url: $rootScope.baseURL + "/gameGetResult",
          method: "GET",
          headers: {
            authorization: $rootScope.user.id,
          },
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
    getUserResult: _getUserResult,
  };
}
