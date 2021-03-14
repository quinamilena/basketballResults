const connection = require("../database/connection");

module.exports = {
  async getTenFirts(request, response) {
    try {
      const user_id = request.headers.authorization;

      const today = new Date();
      const year = today.getFullYear();

      const month =
        today.getMonth() + 1 < 9
          ? String("0" + Number(today.getMonth() + 1))
          : String(Number(today.getMonth() + 1));

      const lastDayOfMonth =
        new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() < 9
          ? String(
              "0" +
                new Date(
                  today.getFullYear(),
                  Number(today.getMonth() + 1),
                  0
                ).getDate()
            )
          : String(
              new Date(
                today.getFullYear(),
                Number(today.getMonth() + 1),
                0
              ).getDate()
            );

      const from = String(year + "-" + month + "-01");

      const to = String(year + "-" + month + "-" + lastDayOfMonth);

      const firstGames = await connection("games")
        .limit(10)
        .select()
        .where("user_id", "=", user_id)
        .whereBetween("gameDate", [from, to]);

      return response.status(200).json({ error: false, data: firstGames });
    } catch (error) {
      return response.status(500).json({ error: true, data: error });
    }
  },

  async getAll(request, response) {
    try {
      const user_id = request.headers.authorization;

      const games = await connection("games")
        .select("*")
        .where("user_id", "=", user_id);

      return response.status(200).json({ error: false, data: games });
    } catch (error) {
      return response.status(500).json({ error: true, data: error });
    }
  },

  async create(request, response) {
    try {
      const { gameDate, quantPoints } = request.body;
      const user_id = request.headers.authorization;

      const games = await connection("games")
        .select("quantPoints")
        .where("user_id", "=", user_id);

      const indexRecord = games.findIndex(
        (game) => Number(game.quantPoints) >= Number(quantPoints)
      );

      if (indexRecord === -1) {
        const timeRecordUser = await connection("users")
          .select("timeRecord")
          .where("id", "=", user_id);

        let newTimeRecord = Number(timeRecordUser[0].timeRecord + 1);

        await connection("users").where("id", user_id).first().update({
          record: quantPoints,
          timeRecord: newTimeRecord,
        });
      }

      const [id] = await connection("games").insert({
        gameDate,
        quantPoints,
        user_id,
      });

      return response.status(200).json({ error: false, id: { id: id } });
    } catch (error) {
      return response.status(500).json({ error: true, data: error });
    }
  },

  async getResult(request, response) {
    try {
      const user_id = request.headers.authorization;
      let totalPoinst = 0;

      const allGames = await connection("games")
        .select("*")
        .where("user_id", "=", user_id);

      allGames.forEach((game) => {
        totalPoinst += Number(game.quantPoints);
      });

      const dateSort = allGames.sort((x, y) => {
        let a = new Date(x.gameDate),
          b = new Date(y.gameDate);

        return a - b;
      });

      const pointsSort = allGames.sort((a, b) => {
        return Number(a.quantPoints) - Number(b.quantPoints);
      });

      const totalGame = allGames.length;
      const mediaPoints = totalPoinst / totalGame;

      const firstGame = dateSort[0].gameDate;
      const lastGame = dateSort[dateSort.length - 1].gameDate;

      const lowestScore = pointsSort[0].quantPoints;
      const highestScore = pointsSort[pointsSort.length - 1].quantPoints;

      const data = {
        firstGame: firstGame,
        lastGame: lastGame,
        totalPoinst: totalPoinst,
        mediaPoints: mediaPoints,
        totalGame: totalGame,
        highestScore: highestScore,
        lowestScore: lowestScore,
      };

      return response.status(200).json({ error: false, data: data });
    } catch (error) {
      return response.status(500).json({ error: true, data: error });
    }
  },
};
