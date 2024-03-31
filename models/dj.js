const mongoose = require("mongoose");

const djSchema = mongoose.Schema({
  name: String,
})

module.exports = mongoose.model("Dj", djSchema, "dj");