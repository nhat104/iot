import express from 'express';
import { body } from 'express-validator';
import { login, signup } from '../controllers/auth.js';
import User from '../models/user.js';

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
router.post(
  '/signup',
  [
    body('username').custom(async (value) => {
      const userDoc = await User.findOne({ where: { username: value } });
      if (userDoc) {
        console.log(userDoc);
        return Promise.reject('Username already exist!');
      }
    }),
  ],
  signup
);

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
router.post('/login', login);

export default router;
