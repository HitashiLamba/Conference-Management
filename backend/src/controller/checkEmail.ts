import { Request, Response } from 'express';
import UserModel from "../models/UserModel";

const checkEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.body;

        // Find user by email and exclude password field
        const user = await UserModel.findOne({ email }).select('-password').exec();

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                error: true
            });
        }

        return res.status(200).json({
            message: "Email verified",
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: (error as Error).message || error,
            error: true
        });
    }
};

export default checkEmail;
