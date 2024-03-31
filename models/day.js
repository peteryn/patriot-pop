const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  dayNumber: Number,
  slot1: {
    dj: String,
    color: String,
    producerAssignedSongs: [
      {
        songTitle: String,
        artist: String,
        albumPictureName: String,
      },
    ],
    djPlayedSongs: [
      {
        songTitle: String,
        artist: String,
        albumPictureName: String,
      },
    ],
  },
  slot2: {
    dj: String,
    color: String,
    producerAssignedSongs: [
      {
        songTitle: String,
        artist: String,
        albumPictureName: String,
      },
    ],
    djPlayedSongs: [
      {
        songTitle: String,
        artist: String,
        albumPictureName: String,
      },
    ],
  },
  slot3: {
    dj: String,
    color: String,
    producerAssignedSongs: [
      {
        songTitle: String,
        artist: String,
        albumPictureName: String,
      },
    ],
    djPlayedSongs: [
      {
        songTitle: String,
        artist: String,
        albumPictureName: String,
      },
    ],
  },
});

module.exports = mongoose.model("Day", daySchema, "day");
