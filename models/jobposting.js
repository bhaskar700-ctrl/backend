const mongoose = require('mongoose');

const jobpostingSchema = new mongoose.Schema({
  company_Name: {
    type: String,
  },
  role: {
    type: String,
  },
 batch_eligible : {
    type: String,
  },
  location: {
    type: String,
  },
  link: {
    type: String,
  },
  
}, {
  collection: 'jobpostings' 
});

const JobPosting = mongoose.model('JobPostings', jobpostingSchema);

module.exports = JobPosting;


