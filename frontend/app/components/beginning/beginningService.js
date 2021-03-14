bas_app.service("beginningService", beginningService);

function beginningService($http, $rootScope) {
  let _checkLogin = (data) => {
    return new Promise((result, reject) => {
      try {
        $http({
          url: $rootScope.baseURL + "/user/" + data,
          method: "GET",
        }).then((resp) => {
          if (resp.data.error) return reject(error);

          if (resp.data.data.length <= 0) return result({ error: true });

          return result(resp.data);
        });
      } catch (error) {
        return reject(error);
      }
    });
  };

  return {
    checkLogin: _checkLogin,
  };
}

// Parei em serviços
