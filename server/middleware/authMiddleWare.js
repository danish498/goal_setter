import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import userModel from '../modals/usersModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify the token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // get user form token
      req.user = await userModel.findById(decode.id).select('-password');
      next();
    } catch (error) {
      res.status(404);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized', 'no tocken');
  }
});
