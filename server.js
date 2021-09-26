'use srtict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const MONGO_PORT = process.env.MONGO_PORT;
app.use(express.json());
mongoose.connect(`${MONGO_PORT}/habits`,{useNewUrlParser: true, useUnifiedTopology: true});
const {createUserController,updateUserController,UserController}=require('./controllers/UserController');



app.post('/create-user',createUserController);
app.put('/update-user/:email',updateUserController);
app.get('/user',UserController);



// const {seeduser, UserModel}=require('./models/UserModel');

// app.get('/seed-user', async (req,res)=>{
//   seeduser();
//   res.send(await UserModel.find({}));
// });

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
