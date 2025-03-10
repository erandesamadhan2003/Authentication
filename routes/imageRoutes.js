import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdminUser } from '../middleware/adminMiddleware.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';
import { deleteImageController, fetchImagesController, uploadImage } from '../controller/imageController.js';

export const ImageRoute = express.Router();
// 67cd7df5eddf63ddaeedaa17
// upload the Image
ImageRoute.post(
    '/upload',
    authMiddleware,
    isAdminUser,
    uploadMiddleware.single('image'),
    uploadImage
)

ImageRoute.get('/get', authMiddleware, fetchImagesController);
ImageRoute.delete('/:id', authMiddleware, isAdminUser, deleteImageController);

// get all the images
