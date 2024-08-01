import { useEffect, useState } from 'react';
import { useAuthContext } from '../components/AuthContext'; 

interface Schedule {
  _id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  userId: string; // Assuming schedules have a userId to relate to the user
}

interface User {
  _id: string;
  name: string;
  email: string;
}

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const RegistrationPage = () => {
  const { token } = useAuthContext(); 
  const [users, setUsers] = useState<User[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await fetch(`${VITE_APP_BACKEND_URL}/api/schedules/registration-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
        setSchedules(data.schedules);
      } catch (error) {
        console.error('Error fetching registration data:', error);
        setError('Failed to load registration data.');
      }
    };

    fetchRegistrationData();
  }, [token]);

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', fontSize: '26px' }}>Registered Users</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {users.map(user => (
          <div key={user._id} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0' }}>
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ fontWeight: 'bold' }}>Name: {user.name}</h2>
              <p style={{ fontWeight: 'bold' }}>Email: {user.email}</p>
            </div>
            <div>
              {schedules
                .filter(schedule => schedule.userId === user._id)
                .map(schedule => (
                  <div key={schedule._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ color: 'blue', fontWeight: 'bold' }}>{schedule.title}</h3>
                      <p>Description: {schedule.description}</p>
                    </div>
                    <div>
                      <p>{new Date(schedule.date).toLocaleDateString()}</p>
                      <p>{schedule.time}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationPage;
