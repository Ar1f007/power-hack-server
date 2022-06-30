const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./db/connect');
const router = require('./routes/route');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.use('/api', router);

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
