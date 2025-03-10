import { User } from '../module/User.js';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
// Register controller

export const registerUser = async (req, res) => {
    try {
        // Extract user Information from request body
        const { username, email, password, role } = req.body;

        // if the user is already exist in our database
        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (checkExistingUser) {
            return res.status(404).json({
                success: false,
                message: 'User os already exits either with same username or same email. Please try with different pages or routs'
            })
        }

        // hash user Password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create a new user and save it in your database
        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        })

        await newlyCreatedUser.save();
        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: 'user register Successfully'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Unable to register the user please try again'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some Error occurrend please again"
        })
    }
}

//  login Controller
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        //  find the current user is exist or not
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Username or password'
            })
        }


        //  if the password is correct or not 
        const isPasswordMatch = await bcryptjs.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Username or password'
            })
        }


        // create user token 
        const acccessToken = jsonwebtoken.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JSONWEBTOKEN_SECRETE_KEY, {
            expiresIn: '15m'
        })

        res.status(200).json({
            success: true,
            message: 'Logged in Successfully',
            acccessToken
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some Error occurrend! please try again"
        })
    }
}


export const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        // extract old and new password
        const {oldPassword, newPassword } = req.body;

        //Find the current logged in user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User Not Found'
            })
        }

        // if the old password is correct
        const isPasswordMatch = await bcryptjs.compare(oldPassword, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Old password is not correct! please try again'
            })
        }

        //hash the new password
        const salt = await bcryptjs.genSalt(10);
        const newHashedPassword = await bcryptjs.hash(newPassword, salt);

        //update user passwrod
        user.password = newHashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some Error occurrend! please try again"
        })
    }
}