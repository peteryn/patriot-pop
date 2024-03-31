const mongoose = require("mongoose");

const timeslotSchema = new mongoose.Schema({
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
