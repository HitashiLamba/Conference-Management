import express, { Request, Response } from 'express';
import Schedules from '../models/Schedules';
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Define an interface for the decoded token payload
interface JwtPayload {
  id: string;
  email: string;
}

const schedulesRegistrationData = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid', error: true });
    }
    const token = authHeader.split(' ')[1]; // Extract token

    // Verify the token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token', error: true });
    }

    // Find all schedules posted by the user
    const schedules = await Schedules.find({ postedByEmail: decoded.email })
      .select('title date time description userId _id');
      console.log("schedules",schedules)


    // Extract all userIds from the schedules
    const userIds = schedules.map(schedule => schedule.userId);

    // Find all users with the extracted userIds
    const users = await UserModel.find({ _id: { $in: userIds } }).select('name email');

    console.log("Users Data", users);
   

    res.json({ users, schedules });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

router.get('/registration-data', schedulesRegistrationData);

export default schedulesRegistrationData;
