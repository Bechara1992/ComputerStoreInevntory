const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

var corsOptions = {
  origin: "http://localhost:19006"
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Inventory application." });
});

app.post("/", (req, res) => {
  res.json({ message: JSON.stringify(req.params) });
});

require("./app/routes/brand.routes")(app);
require("./app/routes/devices.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});