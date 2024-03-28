const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json("hi");
});

app.listen(8081, () => {
  console.log("Express listening at port 8081");
});
