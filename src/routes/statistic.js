import express from 'express';
import { getWorkHoursByWeek, statisticByDay, statisticByWeek } from '../controllers/statistic.js';

const router = express.Router();

router.post('/statistic-by-date', statisticByDay);

router.get('/statistic-by-week', statisticByWeek);

router.get('/work-hour-by-week', getWorkHoursByWeek);

export default router;
