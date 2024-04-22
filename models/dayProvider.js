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
    data = {
      dayNumber: dayNumber,
      slot1: {
        dj: null
      },
      slot2: {
        dj: null
      },
      slot3: {
        dj: null
      },
    };
  }
  if (data == null) {
    data = {
      dayNumber: dayNumber,
      slot1: {
        dj: null
      },
      slot2: {
        dj: null
      },
      slot3: {
        dj: null
      },
    };
  }
  return data;
}
async function addDay(dayData) {
  try {
    let newDay = new Day(dayData);
    let savedDay = await newDay.save();
    return savedDay;
  } catch (err) {
    throw err;
  }
}

// will create field if it does not exist
async function updateDay(dayNumber, updateData) {
  let query = { dayNumber: dayNumber };
  let data;
  try {
    data = await Day.findOne(query).exec();
  } catch (err) {
    data = null;
  }

  if (data == null) {
    addDay(updateData);
  } else {
    try {
      let updatedDay = await Day.findOneAndUpdate(
        { dayNumber: dayNumber },
        { $set: updateData },
        { new: true, runValidators: true }
      );
      return updatedDay;
    } catch (err) {
      throw err;
    }
  }
}

async function deleteDay(dayNumber) {
  try {
    await Day.deleteOne({ dayNumber: dayNumber });
  } catch (err) {
    throw err;
  }
}

module.exports = { getDay, addDay, updateDay, deleteDay};
