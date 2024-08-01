// controllers/scheduleController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UpcomingSchedules from '../models/UpcomingSchedules';

// Define an interface for the decoded token payload
interface JwtPayload {
  id: string;
  email: string;
}

const JoinSchedule = async (req: Request, res: Response) => {
  try {
    // Extract the token from the Authorization header
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

    // Fetch all schedules from the database
    const upcomingSchedules = await UpcomingSchedules.find().exec();
    const formattedNewSchedules = upcomingSchedules.map(upschedule => {
      const date = new Date(upschedule.date);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      return {
        _id: upschedule._id.toString(), // Convert ObjectId to string
        title: upschedule.title,
        date: formattedDate,
        time: upschedule.time,
        description: upschedule.description,
        createdAt: upschedule.createdAt,
        updatedAt: upschedule.updatedAt
      };
    });

    
    console.log('Formatted Schedules:', formattedNewSchedules);

    // Return the formatted schedules
    res.json(formattedNewSchedules);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', error: true });
  }
};

export default JoinSchedule;
