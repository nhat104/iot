import express from 'express';
import {
  getWorkHoursByWeek,
  latestCheckIn,
  latestCheckOut,
  statisticByDay,
  statisticByWeek,
} from '../controllers/statistic.js';

const router = express.Router();

router.post('/statistic-by-date', statisticByDay);

router.get('/statistic-by-week', statisticByWeek);

router.get('/work-hour-by-week', getWorkHoursByWeek);

router.get('/latest-check-in', latestCheckIn);

router.get('/latest-check-out', latestCheckOut);

export default router;
