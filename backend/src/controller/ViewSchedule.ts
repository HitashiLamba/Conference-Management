import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Schedule from '../models/Schedules';

// Define an interface for the decoded token payload
interface JwtPayload {
  id: string;
  email: string;
}

const ViewSchedule = async (req: Request, res: Response) => {
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

    // Fetch schedules for the user from the database
    const schedules = await Schedule.find({ userId: decoded.id }).exec();
    const formattedSchedules = schedules.map(schedule => {
      const date = new Date(schedule.date);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      return {
        ...schedule.toObject(), // Convert the Mongoose document to a plain JavaScript object
        date: formattedDate // Replace the date field with the formatted date
      };
    });

    
    console.log('Formatted Schedules:', formattedSchedules);

    // Return the formatted schedules
    res.json(formattedSchedules);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', error: true });
  }
};

export default ViewSchedule;
