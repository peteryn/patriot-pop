const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String
});

const playlistSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, // Store reference to user
    songs: [songSchema]  // Array of songs
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;