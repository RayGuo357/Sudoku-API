const express = require("express");
const apiRoutes = express.Router();

const boardController = require("../controllers/board");

apiRoutes.route("/all").get(boardController.getAll);

apiRoutes.route("/random").get(boardController.getRandom);

apiRoutes.route("/daily").get(boardController.getDaily);
apiRoutes.route("/daily/:date").get(boardController.getDaily);

apiRoutes.route("/submit").post(boardController.postBoard);

module.exports = apiRoutes;
