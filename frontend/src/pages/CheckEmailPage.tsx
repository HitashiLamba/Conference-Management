import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";

// Define a type for your data state
interface FormData {
  email: string;
}
const VITE_APP_BACKEND_URL=import.meta.env.VITE_APP_BACKEND_URL

const CheckEmailPage: React.FC = () => {
  const [data, setData] = useState<FormData>({
    email: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${VITE_APP_BACKEND_URL}/api/email`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({ email: "" });
        navigate('/password', {
          state: response.data.data,
        });
      }
    } catch (error: unknown) {
      // Check if the error is an instance of AxiosError
      if (axios.isAxiosError(error)) {
        // Use optional chaining to safely access properties
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2'>
          <PiUserCircle size={80} />
        </div>
        <h3>Welcome to Conference app!</h3>
        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
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
          <button
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Let's Go
          </button>
        </form>
        <p className='my-3 text-center'>
          New User? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
