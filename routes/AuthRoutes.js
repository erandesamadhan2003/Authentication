import express from 'express';
import { registerUser, loginUser } from '../controller/authController.js';


export const AuthRouter = express.Router();

// all routes are related to authentication and autherization

AuthRouter.post('/register', registerUser);
AuthRouter.post('/login', loginUser);