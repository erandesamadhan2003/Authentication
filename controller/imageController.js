import { Image } from '../module/image.js';
import { uploadToCloudinary } from '../helpers/cloudinaryHelper.js';
import { cloudinary } from '../config/cloudinary.js';

export const uploadImage = async(req,res) => {
    try {
        // check is file is missing in req object
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required, Please upload an Image'
            })
        }

        // upload to Cloudinary
        const {url,publicId} = await uploadToCloudinary(req.file.path);

        // store the image url and pucbloc id along woth the uploaded user id in the database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save();

        res.status(201).json({
            success: true,
            message: 'Image Uploaded Successfully',
            image: newlyUploadedImage
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
        
    }
}

export const fetchImagesController = async(req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page - 1)*limit;

        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : - 1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
        if(images) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages,
                data: images
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! please try again'
        })
        
    }
}


export const deleteImageController = async(req,res) => {
    try {
        const getCurrentImageIdTobeDeleted = req.params.id;
        
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentImageIdTobeDeleted);
        if(!image) {
            return res.status(404).json({
                success: false,
                message: 'Image Not Found'
            })
        }

        // Check if these image is uploaded by current user whpe is trying to delete
        if(image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
               success: false,
               message: "You are not authorized to delete this image." 
            })
        } 

        // delete the image from cloudinary 
        await cloudinary.uploader.destroy(image.publicId);

        //delete this image from mongoDB database
        await Image.findByIdAndDelete(getCurrentImageIdTobeDeleted);

        res.status(200).json({
            success: true,
            message: 'Image Deleted Successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! please try again'
        })
    }
}