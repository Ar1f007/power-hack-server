const mongoose = require('mongoose');
const validator = require('validator');

const billSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide bill amount'],
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
