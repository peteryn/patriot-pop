const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  albumPictureName: String,
});

module.exports = mongoose.model('Song', songSchema, "song");
