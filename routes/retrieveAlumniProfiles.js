// retrieveAlumniProfiles.js

const NewUser = require('../models/newuserSchema');

let alumniProfilesCache = [];

const retrieveAlumniProfiles = async () => {
  try {
    const alumniUsers = await NewUser.find({ role: 'alumni' }).exec();
    console.log(alumniUsers)

    if (!alumniUsers || alumniUsers.length === 0) {
      console.log('No alumni users found');
      return;
    }

    alumniProfilesCache = alumniUsers;
    console.log('Alumni profiles cached');
  } catch (error) {
    console.error('Error fetching alumni users:', error);
  }
};

const getAlumniProfiles = () => {
  return alumniProfilesCache;
};

module.exports = { retrieveAlumniProfiles, getAlumniProfiles };
