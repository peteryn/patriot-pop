const mongoose = require("mongoose");

const djSchema = mongoose.Schema({
  name: String,
})

module.exports("Dj", djSchema, "dj");