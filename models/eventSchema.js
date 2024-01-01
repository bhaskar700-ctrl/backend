const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
  },
  organizer: {
    type: String,
  },
  url: {
    type: String,
  },
  audience: {
    type:String,
  }
}, {
  collection: 'events' 
});

const Event = mongoose.model('events', eventSchema);


module.exports = Event;
