import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UpcomingSchedules from '../models/UpcomingSchedules';
import Schedules from '../models/Schedules';

// Define an interface for the decoded token payload
interface JwtPayload {
  id: string;
  email: string;
}

export const registerSchedule = async (req: Request, res: Response) => {
  console.log('Request Body:', req.body);

  const { scheduleId, token } = req.body;

  if (!scheduleId || !token) {
    return res.status(400).json({ message: 'Schedule ID and token are required' });
  }

  try {
    // Verify the token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token', error: true });
    }
    console.log('Decoded Token:', decoded);


    // Find the schedule in UpcomingSchedules by ID
    const upcomingSchedule = await UpcomingSchedules.findById(scheduleId).exec();
    if (!upcomingSchedule) {
      return res.status(404).json({ message: 'Schedule not found in upcoming schedules', error: true });
    }

    console.log('Upcoming Schedule:', upcomingSchedule);
    console.log('decoded id:', decoded.id);



    // Prepare the data for the new Schedule
    const newScheduleData = {
      title: upcomingSchedule.title,
      date: upcomingSchedule.date,
      description: upcomingSchedule.description,
      time: upcomingSchedule.time, // Add this if the field exists
      postedByEmail: upcomingSchedule.postedByEmail,
      userId: decoded.id, // Store the decoded user ID
      id: upcomingSchedule._id, // Store the token as 'id'
    };
    console.log('New Schedule Data:', newScheduleData);



    // Create a new Schedule document
    const newSchedule = new Schedules(newScheduleData);


    // Save the new schedule to the Schedule collection
    await newSchedule.save();



    // Fetch the remaining schedules from UpcomingSchedules
    const remainingSchedules = await UpcomingSchedules.find().exec();

    res.status(201).json({ newSchedule, remainingSchedules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering schedule', error: true });
  }
};
