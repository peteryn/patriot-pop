const mongoose = require("mongoose");

const mongooseURL = "mongodb://127.0.0.1:27017/patriotPop";
mongoose.connect(mongooseURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongo");
});


const Song = require("./songs.js");

async function getSongByTitle(title) {
    try {
      const song = await Song.findOne({ title: title }).exec();
      return song;
    } catch (err) {
      console.error("Error fetching song by title:", err);
      throw err;
    }
  }
  

  async function addSong(songData) {
    try {
      const existingSong = await Song.findOne({ title: songData.title }).exec();
      if (existingSong) {
        throw new Error("A song with this title already exists");
      }
      const newSong = new Song(songData);
      const savedSong = await newSong.save();
      return savedSong;
    } catch (err) {
      console.error("Error adding new song:", err);
      throw err;
    }
  }

  async function updateSongByTitle(title, updateData) {
    try {
      const updatedSong = await Song.findOneAndUpdate(
        { title: title },
        { $set: updateData },
        { new: true, runValidators: true }
      );
      return updatedSong;
    } catch (err) {
      console.error("Error updating song by title:", err);
      throw err;
    }
  }
  

  async function deleteSongByTitle(title) {
    try {
      await Song.deleteOne({ title: title });
    } catch (err) {
      console.error("Error deleting song by title:", err);
      throw err;
    }
  }

//   async function getAllSongs() {
//     try {
//       const allSongs = await Song.find({}).exec();
//       return allSongs;
//     } catch (err) {
//       console.error("Error fetching all songs:", err);
//       throw err;
//     }
//   }

// async function getAllSongs() {
//     try {
//       const songDocument = await Song.findOne(); 
//       if (!songDocument) {
//         console.log("No song document found");
//         return [];
//       }
//       console.log("Song document found:", songDocument);
//       return songDocument.allSongs || [];
//     } catch (err) {
//       console.error("Error fetching all songs:", err);
//       throw err;
//     }
//   }

// async function getAllSongs() {
//     try {
//       const songDocument = await Song.findOne(); 
//       if (!songDocument || !songDocument.allSongs) {
//         console.log("No songs found or 'allSongs' field is missing in the document.");
//         return [];
//       }
//       console.log("All songs fetched:", songDocument.allSongs);
//       return songDocument.allSongs; 
//     } catch (err) {
//       console.error("Error fetching all songs:", err);
//       throw err;
//     }
//   }

  async function getAllSongs() {
    const data = await Song.find().exec();
    return data;
}

  
  
  
  
  module.exports = {
    getSongByTitle,
    addSong,
    updateSongByTitle,
    deleteSongByTitle,
    getAllSongs
  };