// Databaase setup
const mongoose = require("mongoose");

const mongooseURL = "mongodb://127.0.0.1:27017/patriotPop";
mongoose.connect(mongooseURL, {useNewURLParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection erroor:'));
db.once('open', () => {
	console.log("connected to mongo");
});