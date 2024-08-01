import { Request, Response } from 'express';
import { CookieOptions } from 'express';

const logout = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none' // Use lowercase 'none'
        };

        return res.cookie('token', '', cookieOptions).status(200).json({
            message: "Session out",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: (error as Error).message || error,
            error: true
        });
    }
};

export default logout;
