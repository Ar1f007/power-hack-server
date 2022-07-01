const mongoose = require('mongoose');
const connectDB = () =>
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ioo2w.mongodb.net/?retryWrites=true&w=majority`
  );

module.exports = connectDB;
