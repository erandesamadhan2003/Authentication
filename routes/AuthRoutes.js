import express from 'express';
import { registerUser, loginUser, changePassword } from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


export const AuthRouter = express.Router();

// all routes are related to authentication and autherization

AuthRouter.post('/register', registerUser);
AuthRouter.post('/login', loginUser);
AuthRouter.post('/change-password', authMiddleware ,changePassword);