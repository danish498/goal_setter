import express from 'express';

const router = express.Router();

import {
  getRoutes,
  postRoutes,
  putRoutes,
  deleteRoutes,
} from '../controllers/getRoutes.js';

import { protect } from '../middleware/authMiddleWare.js';

router.get('/', protect, getRoutes);
router.post('/', protect, postRoutes);
router.put('/:id', protect, putRoutes);
router.delete('/:id', protect, deleteRoutes);

export default router;
