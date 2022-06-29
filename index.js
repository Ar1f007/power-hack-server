const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./db/connect');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Hello from server');
});

const PORT = process.env.port || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log('Running at', PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
