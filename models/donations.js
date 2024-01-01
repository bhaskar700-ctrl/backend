const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donar_name: {
    type: String,
   
  },
  amount: {
    type: String,
   
  },
  date: {
    type: String,
   
  },
 
  
}, {
  collection: 'donation' 
});

const Donation = mongoose.model('Donation',donationSchema);


module.exports = Donation;