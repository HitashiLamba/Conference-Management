import { Request, Response } from 'express';  // Import Request and Response types
import UserModel from '../models/UserModel';  // Import UserModel

const searchUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { search } = req.body;

        // Create a regular expression for the search query
        const query = new RegExp(search, 'i');  // No need for "g" flag in this context

        // Perform the search query on the UserModel
        const users = await UserModel.find({
            "$or": [
                { name: query },
                { email: query }
            ]
        }).select('-password');

        return res.json({
            message: 'All users',
            data: users,
            success: true
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

export default searchUser;
