bas_app.service("signinService", signinService);

function signinService($http) {
  let _saveUser = (user) => {
    return new Promise((result, reject) => {
      try {
        return result({ status: 200, exist: false });
      } catch (error) {
        return reject(error);
      }
    });
  };
  return {
    saveUser: _saveUser,
  };
}
