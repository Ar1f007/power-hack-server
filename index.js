const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./db/connect');
const { client } = require('./db/connect');
const router = require('./routes/route');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello from server');
});

const PORT = process.env.port || 5000;
const start = async () => {
  try {
    await client.connect();
    app.listen(PORT, () => console.log('Running at', PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
