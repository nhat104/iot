import express from 'express';
import { checkIn, checkOut } from '../controllers/check.js';

const router = express.Router();

router.post('/check-in', checkIn);

router.post('/check-out', checkOut);

export default router;
