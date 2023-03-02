const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

require("./db/conn")();

const apiRoutes = require("./routes/api");

app.use("/api", apiRoutes);

app.get('/', function (req, res) {
	res.send({msg: `API is online! Please refer to ${process.env.API_HELP} for more information.`})
})

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
