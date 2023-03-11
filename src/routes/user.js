import express from 'express';
import { login } from '../controllers/auth.js';
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployee,
  statisticByWeek,
} from '../controllers/user.js';

const router = express.Router();

/**
 * @swagger
 * '/auth/signup':
 *  post:
 *    tags:
 *    - auth
 *    summary: Sign Up
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/SignUpInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SignUpResponse'
 */
router.get('/', getAllEmployee);

/**
 * @swagger
 * '/auth/login':
 *  post:
 *    tags:
 *    - auth
 *    summary: Login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 */
router.post('/', addEmployee);

router.put('/:userId', editEmployee);

router.delete('/:userId', deleteEmployee);

router.post('/statistic/week', statisticByWeek);

export default router;
