bas_app.service("signinService", signinService);

function signinService($http, $rootScope) {
  let _saveUser = (user) => {
    return new Promise((result, reject) => {
      try {
        $http({
          url: $rootScope.baseURL + "/user",
          method: "POST",
          data: user,
        }).then((resp) => {
          return result(resp.data);
        });
      } catch (error) {
        return reject(error);
      }
    });
  };
  return {
    saveUser: _saveUser,
  };
}
