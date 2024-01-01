const express = require('express');
const router = express.Router();
const NewUser = require("../models/newuserSchema");

// GET user details by ID using query parameters
router.get("/", async (req, res) => {
  try {
    const userId = req.query.id;

    // console.log(userId)

    if (!userId) {
      console.log('User ID not provided.');
      return res.status(400).json({ message: "User ID not provided" });
    }

    // Find the user by ID
    const user = await NewUser.findById(userId);
   
    if (!user) {
      console.log('User not found.');
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive information like password before sending the response
    const { password, ...userDetails } = user.toObject();
   
    return res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
