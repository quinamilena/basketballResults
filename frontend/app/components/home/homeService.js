bas_app.service("homeService", homeService);

function homeService($http, $rootScope) {
  let _gameFirts = () => {
    return new Promise((result, reject) => {
      try {
        $http({
          url: $rootScope.baseURL + "/gameFirts",
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
    gameFirts: _gameFirts,
  };
}
