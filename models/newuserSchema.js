//newuserSchema

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const newUserSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  imageUrl:{
    type:String
  },
  email: {
    type: String,

  },

  role: {
    type: String,

  },

  phone: {
    type: Number,

  },
  yearOfGraduation: {
    type: String,
  },
  department: {
    type: String,
  },
  date_of_birth: {
    type: String,
  },
  employed: {
    type: String,
  },
  designation: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyLocation: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  password: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});


// Password hashing
newUserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);

  }
  next();
});

// Generating token
newUserSchema.methods.generateAuthToken = async function () {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error('Secret key not defined');
    }

    let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: generatedToken });
    await this.save();
    return generatedToken;
  } catch (err) {
    console.log(err);
  }
};

// Storing messages
newUserSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
}

// Collection schema
const NewUser = mongoose.model('newuser', newUserSchema);

module.exports = NewUser;
