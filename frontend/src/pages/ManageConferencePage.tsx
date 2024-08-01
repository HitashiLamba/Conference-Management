import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useAuthContext } from '../components/AuthContext'; // Import the context
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// Define the schema for validation
const schema: ZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const ManageConferencePage: React.FC = () => {
  const { token } = useAuthContext(); // Use context
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/register'); // Redirect to login page if not authenticated
    }
  }, [token, navigate]);

  const onSubmit: SubmitHandler<FormData> = async data => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/create-conference`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Success:', response.data);
      // Display alert
      alert('Form data submitted successfully!');

      // Clear form fields
      reset();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handling Axios error
        setError(error.response?.data?.message || "An error occurred");
      } else {
        // Handling other types of errors
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Utility function to get error message
  const getErrorMessage = <T extends keyof FormData>(fieldErrors: FieldErrors<FormData>, fieldName: T) => {
    const fieldError = fieldErrors[fieldName];
    if (fieldError) {
      return (fieldError as any)?.message || ''; // Type assertion to any to access message property
    }
    return '';
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {error ? (
        <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Event Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label htmlFor="title" style={{ display: 'block', fontWeight: 'bold' }}>Title</label>
              <input
                id="title"
                type="text"
                {...register('title')}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {errors.title && <p style={{ color: 'red' }}>{getErrorMessage(errors, 'title')}</p>}
            </div>

            <div>
              <label htmlFor="date" style={{ display: 'block', fontWeight: 'bold' }}>Date</label>
              <input
                id="date"
                type="date"
                {...register('date')}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {errors.date && <p style={{ color: 'red' }}>{getErrorMessage(errors, 'date')}</p>}
            </div>

            <div>
              <label htmlFor="time" style={{ display: 'block', fontWeight: 'bold' }}>Time</label>
              <input
                id="time"
                type="time"
                {...register('time')}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {errors.time && <p style={{ color: 'red' }}>{getErrorMessage(errors, 'time')}</p>}
            </div>

            <div>
              <label htmlFor="description" style={{ display: 'block', fontWeight: 'bold' }}>Description</label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {errors.description && <p style={{ color: 'red' }}>{getErrorMessage(errors, 'description')}</p>}
            </div>

            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#007bff',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ManageConferencePage;
