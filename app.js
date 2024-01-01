const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const registrationRoutes = require('./routes/registrationRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userDetailRoute = require('./routes/userDetailRoute');
const profilePictureRoutes = require('./routes/profilePictureRoutes');
const db = require('./db/db'); // Import your database connection module
const uploadRoutes = require('./routes/uploadRoutes'); // Import your file upload route module
// const JobPosting =require('./routes/jobposting')
// const retrieveAlumniProfiles = require('../server/routes/retrieveAlumniProfiles'); 
const { retrieveAlumniProfiles, getAlumniProfiles } = require('./routes/retrieveAlumniProfiles');

const events = require("./routes/events")

const Event = require("./models/eventSchema");
const Users = require("./models/newuserSchema")
const Donation = require("./models/donations");
const JobPosting = require("./models/jobposting")



const app = express();
const port = process.env.PORT ||5000;

app.use(cors());
require('dotenv').config({ path: './config.env' });

db.connect()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Fetch alumni users on server start
retrieveAlumniProfiles();


// Register routes
app.use('/register', registrationRoutes);
app.use('/login', loginRoutes);
app.use('/profile-picture', profilePictureRoutes);
app.use('/upload', uploadRoutes); // Use the file upload route here
app.use('/users', userDetailRoute);


app.use("/events",events);

app.get('/alumni-profiles', (req, res) => {
  const alumniProfiles = getAlumniProfiles(); // Ensure correct usage
  res.json(alumniProfiles);
});




app.delete('/delete', async (req, res) => {
  const { eventId } = req.query;

  try {
    // Check if eventId is provided in the request
    if (!eventId) {
      return res.status(400).json({ error: 'eventId is required in the query parameters' });
    }

    // Find and delete the event by eventId
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    // Check if the event with the provided eventId exists
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(204).send(); // Respond with a 204 status for successful deletion
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new event route
app.post('/newevents', async (req, res) => {
  try {

    const eventData = req.body;
    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    console.error('Error creating new event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/events', async (req, res) => {
  try {
  
    const eventId = req.query.eventId;
  
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId }, 
      req.body, 
      { new: true } 
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/editProfile', async (req, res) => {
  try {
  const { userId } = req.query;
  console.log(req.body)
  const updatedEvent = await Users.findOneAndUpdate(
    { _id: userId }, 
    req.body, 
    { new: true } 
  );

  if (!updatedEvent) {
    return res.status(404).json({ error: 'Event not found' });
  }

  res.json(updatedEvent);
} catch (error) {
  console.error('Error updating event:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});


app.get('/getRegisteredUsersCount', async (req, res) => {
  try {
    const users = await Users.find({});
    const userCount = users.length;
    res.json({ count: userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getEventsCount', async (req, res) => {
  try {
    const events = await Event.find({});
    const eventsCount = events.length;
    res.json({ count: eventsCount });
  } catch (error) {
    console.error('Error fetching events count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getDonationsCount', async (req, res) => {
  try {
    const donations = await Donation.find({});
    const donationsCount = donations.length;
    res.json({ count: donationsCount });
  } catch (error) {
    console.error('Error fetching donations count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getJobPostingsCount', async (req, res) => {
  try {
    const jobPostings = await JobPosting.find({});
    const jobPostingsCount = jobPostings.length;
    res.json({ count: jobPostingsCount });
  } catch (error) {
    console.error('Error fetching job postings count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define the route to get job postings
app.get('/getJobPostings', async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.json(jobPostings);
  } catch (error) {
    console.error('Error fetching job postings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get donations
app.get('/getDonations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Create a new job posting
app.post('/createJobPosting', async (req, res) => {
  try {
    const jobPostingData = req.body;
    const newJobPosting = new JobPosting(jobPostingData);
    const savedJobPosting = await newJobPosting.save();
    res.json(savedJobPosting);
  } catch (error) {
    console.error('Error creating new job posting:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update a job posting
app.put('/updateJobPosting/:jobPostingId', async (req, res) => {
  const { jobPostingId } = req.params;
  try {
    const updatedJobPosting = await JobPosting.findByIdAndUpdate(
      jobPostingId,
      req.body,
      { new: true }
    );
    res.json(updatedJobPosting);
  } catch (error) {
    console.error('Error updating job posting:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a job posting
app.delete('/deleteJobPosting', async (req, res) => {
  const { eventId } = req.query;

  try {
    await JobPosting.findByIdAndDelete(eventId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting job posting:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
