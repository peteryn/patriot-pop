const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

const port = 8080
app.listen(port, () => {
  console.log(`localhost/Express listening at port ${port}`);
});
