bas_app.service("beginningService", beginningService);

function beginningService($http) {
  let _checkLogin = (login) => {
    return new Promise((result, reject) => {
      try {
        $http({
          url: "../../../db/users.json",
          method: "GET",
        }).then((resp) => {
          let user = resp.data.filter(
            (user) => user.login.toLowerCase() === login.toLowerCase()
          );

          return result(user);
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
