const path = require("path");
const express = require("express");
const app = express();
const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/manager", async (req, res) => {
  const content = await ejs.renderFile("./views/pages/manager.ejs");
  res.render("partials/base", {
    pageTitle: "Manager",
    content: content,
    profile: 0,
  });
});

app.get("/producer", async (req, res) => {
  const content = await ejs.renderFile("./views/pages/producer.ejs");
  res.render("partials/base", {
    pageTitle: "Producer",
    content: content,
    profile: 1,
  });
});

app.listen(8081, () => {
  console.log("Express listening at port 8081");
});
