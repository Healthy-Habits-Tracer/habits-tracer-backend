'use srtict';

const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
// const MONGO_PORT = process.env.MONGO_PORT;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
