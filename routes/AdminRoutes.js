import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdminUser } from '../middleware/adminMiddleware.js';

export const adminrouter = express.Router();

adminrouter.get('/welcome',authMiddleware, isAdminUser ,(req,res) => {
    res.json({
        message : `welcome to the admin page`
    })
})