const express = require("express");
const cronRoutes = express.Router();

const cronController = require("../controllers/cron");

cronRoutes.route("/set").post(cronController.postDaily);

module.exports = cronRoutes;