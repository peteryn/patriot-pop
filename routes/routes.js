const path = require("path");
const express = require("express");
const router = express.Router();
const ejs = require("ejs");

// Manager Routes
router.get("/manager", async (req, res) => {
  const content = await ejs.renderFile("./views/pages/manager.ejs");
  res.render("partials/base", {
    pageTitle: "Manager",
    content: content,
    activePage: "manager",
  });
});

router.post("/manager/adddj", (req, res) => {
  const a = req.body.djs;
  console.log(a);
  res.redirect("/manager");
});

// Producer Routes
router.get("/producer", async (req, res) => {
  const content = await ejs.renderFile("./views/pages/producer.ejs");
  res.render("partials/base", {
    pageTitle: "Producer",
    content: content,
    activePage: "producer",
  });
});

module.exports = router;
