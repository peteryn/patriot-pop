const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

app.listen(8081, () => {
  console.log("Express listening at port 8081");
});
