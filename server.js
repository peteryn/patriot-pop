const path = require("path");
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

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
    activePage: "manager",
  });
});

app.post("/manager/adddj", (req, res) => {
  const a = req.body.djs
  console.log(a);
  res.redirect("/manager");
});

app.get("/producer", async (req, res) => {
  const content = await ejs.renderFile("./views/pages/producer.ejs");
  res.render("partials/base", {
    pageTitle: "Producer",
    content: content,
    activePage: "producer",
  });
});

app.listen(8081, () => {
  console.log("Express listening at port 8081");
});
