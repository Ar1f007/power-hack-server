const mongoose = require('mongoose');
const connectDB = () =>
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

module.exports = connectDB;
