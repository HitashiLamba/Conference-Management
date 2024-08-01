import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

// Define a type for form data
interface FormData {
  name: string;
  email: string;
  password: string;
  profile_pic: string;
}
const VITE_APP_BACKEND_URL=import.meta.env.VITE_APP_BACKEND_URL
const RegisterPage: React.FC = () => {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });
  
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${VITE_APP_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, data);
      console.log("response", response);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        });

        navigate('/email');
      }
    } catch (error) {
      // TypeScript check to ensure `error` is an `AxiosError`
      if (axios.isAxiosError(error)) {
        // Use optional chaining to safely access properties
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    console.log('data', data);
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3>Welcome to conference app!</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='enter your name'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='enter your email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password :</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <Button
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Register
          </Button>

        </form>

        <p className='my-3 text-center'>
          Already have an account? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
