const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
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
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
    },

    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

// JWT
userSchema.methods.createJWT = async function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFESPAN,
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
