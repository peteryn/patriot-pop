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
  res.render("partials/base", { pageTitle: "Manager", content: content });
});

app.get("/producer", async (req, res) => {
  const content = await ejs.renderFile("./views/pages/producer.ejs");
  res.render("partials/base", { pageTitle: "Producer", content: content });
});

app.listen(8081, () => {
  console.log("Express listening at port 8081");
});

// // GPT code:

// const path = require("path");
// const express = require("express");
// const app = express();
// const ejs = require("ejs");

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.send("hi");
// });

// app.get("/manager", async (req, res) => {
//   // Correct the path to your manager.ejs file
//   const managerTemplatePath = path.join(__dirname, "views", "pages", "manager.ejs");
  
//   // Render the manager template to a variable
//   const content = await ejs.renderFile(managerTemplatePath);
  
//   // Pass the rendered HTML content to your base template
//   res.render("partials/base", { pageTitle: "Manager", content: content });
// });

// app.listen(8081, () => {
//   console.log("Express listening at port 8081");
// });
