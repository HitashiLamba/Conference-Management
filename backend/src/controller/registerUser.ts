import { Request, Response } from 'express';  // Import Request and Response types
import bcryptjs from 'bcryptjs';  // Import bcryptjs with default import syntax
import UserModel from '../models/UserModel';  // Import UserModel

const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, profile_pic } = req.body;

        // Check if the email already exists
        const checkEmail = await UserModel.findOne({ email });

        if (checkEmail) {
            return res.status(400).json({
                message: 'User already exists',
                error: true
            });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const payload = {
            name,
            email,
            profile_pic,
            password: hashPassword
        };

        const user = new UserModel(payload);
        const userSave = await user.save();

        return res.status(201).json({
            message: 'User created successfully',
            data: userSave,
            success: true
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export default registerUser;
