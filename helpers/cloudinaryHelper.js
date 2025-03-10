import { cloudinary } from "../config/cloudinary.js";

export const uploadToCloudinary = async (filepath) => {
    try {
        const result = await cloudinary.uploader.upload(filepath);

        return {
            url: result.secure_url,
            publicId: result.public_id
        }
    } catch (error) {
        console.log('Error while uploading to cloudinary: ',error);
        throw new Error('Error while uploading to cloudinary')
        
    }
}