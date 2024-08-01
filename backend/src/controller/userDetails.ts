import { Request, Response } from 'express';  // Import Request and Response types
import getUserDetailsFromToken from '../helpers/getUserDetailsFromToken';  // Import the helper function

const userDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.cookies.token || '';

    const user = await getUserDetailsFromToken(token);

    return res.status(200).json({
      message: 'user details',
      data: user
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || error,
      error: true
    });
  }
};

export default userDetails;
