const connection = require("../database/connection");

module.exports = {
  async signIn(request, response) {
    const login = request.params.login;

    try {
      const user = await connection("users")
        .column("id", "name", "login")
        .select()
        .where("login", "=", login)
        .first();

      return response
        .status(200)
        .json({ error: false, data: !user ? [] : user });
    } catch (error) {
      return response.status(500).json({ error: true, data: error });
    }
  },

  async create(request, response) {
    try {
      const { name, login, record, timeRecord } = request.body;

      const users = await connection("users")
        .select("login")
        .where("login", "=", login);

      if (users.length > 0) {
        return response.status(200).json({ error: false, exist: true });
      }

      await connection("users").insert({
        name,
        login,
        record,
        timeRecord,
      });

      return response.status(200).json({ error: false, exist: false });
    } catch (error) {
      return response.status(500).json({ error: true, data: error });
    }
  },
};
