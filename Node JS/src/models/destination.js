const mongoose = require('mongoose');
const { stringify } = require('querystring');
const destinationSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
});
const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;
