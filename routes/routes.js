const path = require("path");
const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const fs = require("fs");
const bodyParser = require("body-parser");

const dayProvider = require("../models/dayProvider");
const songsProvider = require("../models/songsProvider");
const song = require("../models/songs");
const djProvider = require("../models/djProvider");
const reportHelper = require("./helper/report");
const day = require("../models/day");

const jsonParser = bodyParser.json();

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
  const slotString = `slot${slotIndex}`;
  const dayToUpdate = await dayProvider.getDay(dayNumber);

  const slotToClear = dayToUpdate[slotString];
  slotToClear.dj = null;
  slotToClear.color = null;
  slotToClear.producerAssignedSongs = [];
  slotToClear.djPlayedSongs = [];

  dayToUpdate[slotString] = slotToClear;
  dayProvider.updateDay(dayNumber, dayToUpdate);
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

router.post("/manager/adddj", jsonParser, async (req, res) => {
  const dayCount = Math.floor(req.body.djDate / (24 * 60 * 60 * 1000));
  const slot = req.body.djTimeslot;

  const oldDay = await dayProvider.getDay(dayCount);
  if (oldDay[slot].dj != null) {
    res.redirect("/manager");
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
    dayProvider.updateDay(dayCount, updatedDay);
    res.redirect("/manager");
  }
});

// Producer Routes
router.get("/producer", async (req, res) => {
  // console.log("Accessing /producer route");  // This should log when the route is accessed
  // try {
  //   const songs = await songsProvider.getAllSongs();
  //   console.log("Fetched Songs:", songs);
  // } catch (error) {
  //   console.error('Error loading producer page:', error);
  //   res.sendStatus(500);
  // }
  const songs = await songsProvider.getAllSongs();
  console.log("Fetched Songs:", songs);

  const djs = await djProvider.getAllDjs();
  const timetable = await ejs.renderFile("./views/partials/timetable.ejs");
  const content = await ejs.renderFile("./views/pages/producer.ejs", {
    djs: djs,
    songs: songs,
    timetable: timetable,
  });
  res.render("partials/base", {
    pageTitle: "Producer",
    content: content,
    activePage: "producer",
  });
});

//TODO: change the thing below

router.post("/producer/submit", async (req, res) => {
  const dayNumber = parseInt(req.body.dayNumber);
  const slot = req.body.timeslot;

  const currentDay = await dayProvider.getDay(dayNumber);

  if (currentDay && currentDay[slot] && currentDay[slot].dj) {
    // If a DJ is already assigned to this slot, don't overwrite, redirect or handle as needed
    res.status(409).send("DJ already assigned to this slot for the day.");
  } else {
    const djName = req.body.djs.charAt(0).toUpperCase() + req.body.djs.slice(1); // Format DJ name to start with uppercase
    const color = req.body.color; // Color from form input

    // Create the slot object based on the provided data
    const slotData = {
      dj: djName,
      color: color,
      producerAssignedSongs: [], // Empty initially, or modify as needed
      djPlayedSongs: [], // Empty initially, or modify as needed
    };

    const updateData = { [slot]: slotData };

    // If the day does not exist, it initializes it with the necessary slots
    if (!currentDay) {
      await dayProvider.addDay({ dayNumber: dayNumber, [slot]: slotData });
    } else {
      // Update the existing day with new slot data
      await dayProvider.updateDay(dayNumber, updateData);
    }

    res.redirect("/producer"); // Redirect to the producer page or handle differently
  }
});

module.exports = router;

//TODO: change the thing on top

// Temporary route or script to add some songs
router.get("/add-test-songs", async (req, res) => {
  try {
    await songProvider.addSong({
      title: "Test Song",
      artist: "Test Artist",
      albumPictureName: "test.png",
    });
    res.send("Test song added successfully!");
  } catch (error) {
    console.error("Error adding test song:", error);
    res.sendStatus(500);
  }
});

//Dj routes

async function getDaysData() {
  const dataPath = path.join(__dirname, "../models/json/days.json)");
  const jsonData = await fs.readFile(dataPath, "utf8");
  return JSON.parse(jsonData);
}

router.get("/dj", async (req, res) => {
  const searchQuery = req.query.search
    ? req.query.search.trim().toLowerCase()
    : "";
  let foundSong = null;

  if (searchQuery) {
    const daysData = await getDaysData();
    // Assuming daysData is an array of days with slots
    for (let day of daysData) {
      for (let slotKey in day) {
        let slot = day[slotKey];
        let songs = [...slot.producerAssignedSongs, ...slot.djPlayedSongs];
        foundSong = songs.find(
          (song) => song.songTitle.toLowerCase() === searchQuery
        );
        if (foundSong) break;
      }
      if (foundSong) break;
    }
  }

  const timetable = await ejs.renderFile("./views/partials/timetable.ejs");
  const content = await ejs.renderFile("./views/pages/dj.ejs", {
    timetable: timetable,
    foundSong: foundSong, // Pass this to the EJS template
  });
  res.render("partials/base", {
    pageTitle: "DJ",
    content: content,
    activePage: "dj",
    foundSong: foundSong 
  });
});
router.post("/dj", async (req, res) => {

  const { songTitle, artist } = req.body;
  if ( !songTitle || !artist) {
      return res.status(400).send("Missing required fields");
  }
  if (!/^[A-Za-z ]+$/.test(songTitle)) {
    return res.status(400).send("Invalid song title");
}
  try {
      let playlist = await Playlist.findOne({  });
      if (!playlist) {
          playlist = new Playlist({ songs: [] });
      }
      const isSongExists = playlist.songs.some(song => song.title === songTitle && song.artist === artist);
      if (!isSongExists) {
          playlist.songs.push({ title: songTitle, artist });
          await playlist.save();
          res.status(201).send('Song added to playlist.');
      } else {
          res.status(409).send('Song already exists in the playlist.');
      }
  } catch (error) {
     // console.error('Failed to add song to playlist:', error);
      //res.status(500).send('Server error');
  }
});



module.exports = router;
