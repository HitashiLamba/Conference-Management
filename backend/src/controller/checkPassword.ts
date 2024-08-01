import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel'; // Ensure this import is correct

// Define the type for JWT Payload
interface JwtPayload {
    id: string;
    email: string;
}

const checkPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { password, userId } = req.body;

        // Find user by ID
        const user = await UserModel.findById(userId).exec();
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }

        // Compare password
        const verifyPassword = await bcryptjs.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({
                message: "Please check password",
                error: true
            });
        }

        // Generate token
        const tokenData: JwtPayload = {
            id: user._id.toString(),
            email: user.email
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });

        // Set cookie options
        const cookieOptions: { httpOnly: boolean; secure: boolean } = {
            httpOnly: true,
            secure: true
        };

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: "Login successfully",
            token: token,
            email: user.email, // Include email in the response
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: (error as Error).message || error,
            error: true
        });
    }
};

export default checkPassword;
