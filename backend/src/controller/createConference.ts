import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UpcomingSchedules from '../models/UpcomingSchedules'; // Adjust the path to your model

// Define an interface for the decoded token payload
interface JwtPayload {
  id: string;
  email: string;
}

const createConferences = async (req: Request, res: Response) => {
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

    // Extract data from request body
    const { title, date, time, description, email } = req.body;
    console.log("request body",req.body)

    // Validate the request body
    if (!title || !date || !time) {
      return res.status(400).json({ message: 'Title, date, and time are required', error: true });
    }
    console.log("email",decoded.email)

    // Create a new schedule
    const newSchedule = new UpcomingSchedules({
      title,
      date,
      time,
      description,
      createdById: decoded.id, // Assuming you want to store the ID of the user who created the schedule
      postedByEmail:decoded.email
    });

    // Save the new schedule to the database
    await newSchedule.save();

    // Fetch all schedules from the database
    const upcomingSchedules = await UpcomingSchedules.find().exec();

    // Format the schedules
    const formattedSchedules = upcomingSchedules.map(schedule => {
      const formattedDate = new Date(schedule.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      return {
        _id: schedule._id.toString(), // Convert ObjectId to string
        title: schedule.title,
        date: formattedDate,
        time: schedule.time,
        description: schedule.description,
        createdById: schedule.createdById, // Include the email of the user who posted
        postedByEmail: schedule.postedByEmail,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt
      };
    });

    // Return the formatted schedules
    res.status(201).json(formattedSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: true });
  }
};

export default createConferences;
