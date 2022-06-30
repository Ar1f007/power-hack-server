const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide all values' });
  }

  const userAlreadyExists = await User.findOne({ email }).exec();

  if (userAlreadyExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already in use' });
  }

  const user = await User.create({ name, email, password });

  const token = await user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

exports.login = async (req, res) => {
  res.send('hello from login');
};
