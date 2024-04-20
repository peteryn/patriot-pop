// Databaase setup
const mongoose = require("mongoose");

const mongooseURL = "mongodb://127.0.0.1:27017/patriotPop";
mongoose.connect(mongooseURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection erroor:"));
db.once("open", () => {
  console.log("connected to mongo");
});

const Dj = require("./dj");

async function getAllDjs() {
    const data = await Dj.find().exec();
    return data;
}

module.exports = { getAllDjs }