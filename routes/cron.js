const express = require("express");
const cronRoutes = express.Router();

const cronController = require("../controllers/cron");

cronRoutes.route("/set").get(cronController.postDaily);

module.exports = cronRoutes;