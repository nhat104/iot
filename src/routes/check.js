import express from 'express';
import { checkIn, checkOut } from '../controllers/check.js';
import { statisticByDay, statisticByWeek } from '../controllers/statistic.js';

const router = express.Router();

/**
 * @swagger
 * '/check-in':
 *  post:
 *    tags:
 *    - check
 *    summary: Employee check in when come to office
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CheckInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CheckResponse'
 */
router.post('/check-in', checkIn);

/**
 * @swagger
 * '/check-out':
 *  post:
 *    tags:
 *    - check
 *    summary: Employee check out when leave office
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CheckInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CheckResponse'
 */
router.post('/check-out', checkOut);

export default router;
