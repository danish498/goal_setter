import express from 'express';

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import userModel from '../modals/usersModel.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(404);
    throw new Error('Please add all Fields');
  }

  // CHECK IF USER EXIST

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    res.status(404);
    throw new Error('User already exist');
  }

  // HASS PASSWORDS

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // CREATE THE USERS

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('Invalid user');
  }
});

export const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(201).json(req.user);
});

// JWT TOCKEN GENERATE

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });
};
