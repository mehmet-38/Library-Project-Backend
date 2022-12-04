require("dotenv").config();
const cors = require("cors");
const express = require("express");
const boyParser = require("body-parser");
const app = express();
app.use(cors());
const routes = require("./routes");

const PORT = process.env.PORT || 5000;
app.use(boyParser.json());

app.use(routes.auth);

app.use(routes.book);

require("./utils/mongooseDB");
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
