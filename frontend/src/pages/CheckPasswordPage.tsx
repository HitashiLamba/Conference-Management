import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken as setReduxToken } from '../redux/userSlice';
import { useAuthContext } from '../components/AuthContext';

interface LocationState {
  _id?: string;
  name?: string;
}

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const CheckPasswordPage: React.FC = () => {
  const [data, setData] = useState({
    password: "",
    userId: ""
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { setEmail, setToken } = useAuthContext();

  useEffect(() => {
    const state = location.state as LocationState;
    if (!state?.name) {
      navigate('/email');
    } else {
      setData((prev) => ({
        ...prev,
        userId: state._id || prev.userId
      }));
    }
  }, [navigate, location.state]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${VITE_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios.post(URL, {
        userId: data.userId,
        password: data.password
      }, {
        withCredentials: true
      });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setReduxToken(response?.data?.token));
        setEmail(response.data.email);
        setToken(response.data.token);
        localStorage.setItem('token', response?.data?.token);

        setData({
          password: "",
          userId: ""
        });

        navigate('/view-schedules');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password :</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Login
          </button>
        </form>
        <p className='my-3 text-center'>
          <Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
