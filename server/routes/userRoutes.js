import express from 'express';
import {
  getMe,
  logInUser,
  registerUser,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', logInUser);
router.get('/me', protect, getMe);

export default router;
