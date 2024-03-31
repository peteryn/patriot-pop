// Databaase setup
const mongoose = require("mongoose");

const mongooseURL = "mongodb://127.0.0.1:27017/patriotPop";
mongoose.connect(mongooseURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection erroor:"));
db.once("open", () => {
  console.log("connected to mongo");
});

const Day = require("./day.js");

async function getDay(dayNumber) {
  const query = { dayNumber: dayNumber };
  let data;
  try {
    data = await Day.findOne(query).exec();
  } catch (err) {
    data = {};
  }
  return data;
}

module.exports = { getDay };
