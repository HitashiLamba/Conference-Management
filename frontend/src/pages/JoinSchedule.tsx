import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../components/AuthContext'; // Import the context

interface Schedule {
  _id: string;
  title: string;
  date: string;
  description: string;
}

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const JoinSchedule: React.FC = () => {
  const { token } = useAuthContext(); // Use context

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [registeredScheduleId, setRegisteredScheduleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get<Schedule[]>(`${VITE_APP_BACKEND_URL}/api/JoinSchedule`, {
          withCredentials: true, // Ensure cookies are sent
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setSchedules(response.data);
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [token]);

  const handleRegister = async (schedule: Schedule) => {
    try {
      console.log(`Registering schedule with ID: ${schedule._id}`);

      const response = await axios.post(`${VITE_APP_BACKEND_URL}/api/registerSchedule`, {
        scheduleId: schedule._id,
        token: token, // Include token in request body
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { newSchedule, remainingSchedules } = response.data;



      // Set the registered schedule ID
      setRegisteredScheduleId(newSchedule._id);

      // Update the schedules state with the remaining schedules
      setSchedules(remainingSchedules);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return <p>Loading schedules...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Join Schedules</h1>
      <ul className="space-y-4">
        {schedules.map(schedule => (
          <li key={schedule._id} className="border-b border-gray-300 pb-4 mb-4 flex justify-between items-center">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2">{schedule.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{schedule.date}</p>
              <p>{schedule.description}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleRegister(schedule)}
            >
              Register
            </button>
          </li>
        ))}
      </ul>
      {registeredScheduleId && <p>Registered Schedule ID: {registeredScheduleId}</p>}
    </div>
  );
};

export default JoinSchedule;
