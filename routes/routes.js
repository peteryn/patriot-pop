const path = require("path");
const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const fs = require("fs");
var bodyParser = require('body-parser')

const dayProvider = require("../models/dayProvider");
const djProvider = require("../models/djProvider");
const reportHelper = require("./helper/report");
const day = require("../models/day");

const jsonParser = bodyParser.json()

// timetable api
router.get("/api/day/:dayNumber", async (req, res) => {
  const dayNumber = req.params.dayNumber;
  // dayProvider.getDay returns {} for a day does not have a document in the db
  const data = await dayProvider.getDay(dayNumber);
  // add the day number, even if the day doesn't exist so it can display properly
  data.dayNumber = dayNumber;
  res.json(data);
});

router.post("/manager/deleteSlot", jsonParser, async (req, res) => {
  const dayNumber = req.body.dayNumber;
  const slotIndex = parseInt(req.body.slotNumber) + 1; // 0 indexed
  console.log(`dayNumber is ${dayNumber}`);
  const slotString = `slot${slotIndex}`;
  const dayToUpdate = await dayProvider.getDay(dayNumber);
  
  const slotToClear = dayToUpdate[slotString]
  slotToClear.dj = null;
  slotToClear.color = null;
  slotToClear.producerAssignedSongs = [];
  slotToClear.djPlayedSongs = [];

  dayToUpdate[slotString] = slotToClear;
  dayProvider.updateDay(dayNumber, dayToUpdate)
  res.redirect("/manager");
});

// Manager Routes
router.get("/manager", async (req, res) => {
  const djs = await djProvider.getAllDjs();
  const dayNumber = 19839; // TODO use real time when in production

  const timetable = await ejs.renderFile("./views/partials/timetable.ejs");
  const content = await ejs.renderFile("./views/pages/manager.ejs", {
    djs: djs,
    timetable: timetable,
  });

  // res.cookie("dayNumber", dayNumber);
  // res.cookie("test", "test");
  res.render("partials/base", {
    pageTitle: "Manager",
    content: content,
    activePage: "manager",
  });
});

router.post("/manager/adddj", async (req, res) => {
  const dayCount = Math.floor(req.body.djDate / (24 * 60 * 60 * 1000));
  const slot = req.body.djTimeslot;

  const oldDay = await dayProvider.getDay(dayCount);
  if (oldDay[slot].dj != null) {
    res.redirect("/manager")
  } else {
    let djNameTemp = req.body.djs;
    djNameTemp = djNameTemp.charAt(0).toUpperCase() + djNameTemp.slice(1);
    const obj = {
      dj: djNameTemp,
      color: req.body.djColor,
      producerAssignedSongs: [],
      djPlayedSongs: [],
    };
    const updatedDay = oldDay;
    updatedDay[slot] = obj;
    console.log(updatedDay);
    dayProvider.updateDay(dayCount, updatedDay);
    res.redirect("/manager");
  }
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

router.post("/producer/adddj", (req, res) => {
  res.redirect("/producer");
});

//Dj routes

router.get("/dj", async (req, res) => {
  const timetable = await ejs.renderFile("./views/partials/timetable.ejs");
  const content = await ejs.renderFile("./views/pages/dj.ejs", {
    timetable: timetable,
  });
  res.render("partials/base", {
    pageTitle: "DJ",
    content: content,
    activePage: "dj",
  });
});
// const searchSongs = require('./path/to/searchSongs');

router.get("/search", async (req, res) => {
  try {
    const timetable = await ejs.renderFile("./views/partials/timetable.ejs");
    const results = await searchSongs(req.query.search);
    res.render("pages/dj", { searchResults: results, ...otherParams });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during the search.");
  }
});

module.exports = router;
