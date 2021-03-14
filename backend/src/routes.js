const express = require("express");
const userController = require("./controllers/userController");
const gameController = require("./controllers/gameController");

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.signIn);

routes.post("/game", gameController.create);
routes.get("/game", gameController.getAll);
routes.get("/gameFirts", gameController.getTenFirts);
routes.get("/gameGetResult", gameController.getResult);

module.exports = routes;
