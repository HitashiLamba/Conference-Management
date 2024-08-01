import { Request, Response } from 'express';  // Import Request and Response types
import UserModel from '../models/UserModel';  // Import UserModel
import getUserDetailsFromToken from '../helpers/getUserDetailsFromToken';  // Import helper function

const updateUserDetails = async (req: Request, res: Response): Promise<Response> => {
    try {
        const token = req.cookies.token || '';

        // Get user details from token
        const user = await getUserDetailsFromToken(token);

        const { name, profile_pic } = req.body;

        // Update user details
        await UserModel.updateOne({ _id: user._id }, {
            name,
            profile_pic
        });

        // Retrieve updated user information
        const userInfomation = await UserModel.findById(user._id);

        return res.json({
            message: 'User updated successfully',
            data: userInfomation,
            success: true
        });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export default updateUserDetails;
