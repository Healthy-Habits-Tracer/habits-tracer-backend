'use strict';
const {UserModel} = require('../models/UserModel');

let UserController= (req,res)=>{
  UserModel.find().then(data=>{
    res.json(data);
  });
};


const createUserController=async (req,res)=>{
  let email=req.query.email;
  let newUser=new UserModel({email:email});
  newUser.save();
  let userList=await UserModel.find({});
  res.status(201).json(userList);
};

const updateUserController = async (req,res)=>{
  let userEmail=req.params.email;
  let updatedUser = req.body;
  await UserModel.findOne({email:userEmail}).then(async user=>{
    user.water.push(updatedUser.water);
    user.sleep.push(updatedUser.sleep);
    user.exercise.push(updatedUser.exercise);
    await user.save();
  });

  res.status(200).send(await UserModel.find({}));
};

module.exports={
  createUserController,
  updateUserController,
  UserController
};
