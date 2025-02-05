import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const homeRouter = express.Router();



homeRouter.get('/welcome',authMiddleware, (req,res) => {
    const {userId, username, role} = req.userInfo;
    res.json({
        message : `Welcome to home page`,
        user: {
            _id: userId,
            username,
            role
        }
    })
})