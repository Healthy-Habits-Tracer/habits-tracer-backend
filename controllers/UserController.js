'use strict';
const {UserModel} = require('../models/UserModel');

let UserController= (req,res)=>{
  UserModel.find({}).then(data=>{
    res.json(data);
  });
};


const createUserController=async (req,res)=>{
  let userEmail=req.query.email;
  let newUser=new UserModel({email:userEmail});
  newUser.save();
  res.status(201).json(await UserModel.findOne({email:userEmail}));
};

const updateUserController = async (req,res)=>{
  let userEmail=req.params.email;
  let updatedUser = req.body;
  await UserModel.findOne({email:userEmail}).then(async user=>{
    updatedUser.water&& user.water.push(updatedUser.water);
    updatedUser.sleep && user.sleep.push(updatedUser.sleep);
    updatedUser.exercise && user.exercise.push(updatedUser.exercise);
    await user.save();
  });

  res.status(200).send(await UserModel.findOne({email:userEmail}));
};

const removeHabitRecord = async (req,res)=>{
  let userEmail=req.params.email;
  let date = req.query.date;
  let habit = req.query.habit;
  await UserModel.findOne({email:userEmail}).then(async user=>{
    (habit === 'water' && user.water.findIndex(item=>item.date ===date) !==-1) && user.water.splice(user.water.findIndex(item=>item.date ===date),1);
    (habit === 'sleep' && user.sleep.findIndex(item=>item.date ===date) !==-1) && user.sleep.splice(user.sleep.findIndex(item=>item.date ===date),1);
    (habit === 'exercise' && user.exercise.findIndex(item=>item.date ===date) !==-1) && user.exercise.splice(user.exercise.findIndex(item=>item.date ===date),1);
    await user.save();
  });

  res.status(200).send(await UserModel.findOne({email:userEmail}));
};

module.exports={
  createUserController,
  updateUserController,
  UserController,
  removeHabitRecord
};
