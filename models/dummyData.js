const mongoose = require('mongoose');
const Event = require('./eventSchema'); // Assuming your event model is in a file named eventModel.js


// Create three dummy events
const dummyEvents = [
    {
      title: 'Ice breaking',
      description: 'A beautiful event for the newly joined student.',
      date: new Date('2023-01-15T18:00:00Z'),
      location: 'seminar hall',
      organizer: 'anit',
    },
    {
      title: 'Event 2',
      description: 'Description for Event 2',
      date: new Date('2023-02-20T15:30:00Z'),
      location: 'Location 2',
      organizer: 'Organizer 2',
    },
    {
      title: 'Event 3',
      description: 'Description for Event 3',
      date: new Date('2023-03-25T12:45:00Z'),
      location: 'Location 3',
      organizer: 'Organizer 3',
    },
  ];
  
  // Insert dummy events into the database
  Event.insertMany(dummyEvents)
    .then(() => {
      console.log('Dummy events added successfully');
    })
    .catch((err) => {
      console.error('Error adding dummy events:', err);
    })
  