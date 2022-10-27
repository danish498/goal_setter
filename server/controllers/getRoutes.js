import express from 'express';
import goalModel from '../modals/goalsModal.js';
import asyncHandler from 'express-async-handler';
import userModel from '../modals/usersModel.js';

export const getRoutes = asyncHandler(async (req, res) => {
  // if (!req.body.text) {
  //   res.status(400);
  //   throw new Error('Please add a text files');
  // }
  const goals = await goalModel.find({ user: req.user.id });
  res.json(goals);
});

export const postRoutes = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text files');
  }

  const goals = await goalModel.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.json(goals);
});

export const putRoutes = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // const user = await userModel.findById(req.user.id);

  //Check for user

  if (!req.user) {
    res.status(401);
    throw new Error('Unser not found');
  }

  // make sure logged in user matches the goal user

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await goalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedGoal);
});

export const deleteRoutes = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // const user = await userModel.findById(req.user.id);

  //Check for user

  if (!req.user) {
    res.status(401);
    throw new Error('Unser not found');
  }

  // make sure logged in user matches the goal user

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.remove();
  res.json({ id: req.params.id });
});
