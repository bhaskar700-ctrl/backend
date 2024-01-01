const express = require('express');
const router = express.Router();
const Event = require("../models/eventSchema");

router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
      } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).send('Internal Database Error');
      }
  });
  
  
  module.exports = router;