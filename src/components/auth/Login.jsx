import React, { useState, useEffect } from 'react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const response = await loginUser(data.email, data.password);
      setIsLoading(false);
      localStorage.setItem('token', response.data.token);
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1500);
    } catch (error) {
      setSnackbarMessage('Login failed! Invalid credentials.');
      setIsLoading(false);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (openSnackbar) {
      const timer = setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [openSnackbar]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h4 className="text-3xl font-bold text-center  mb-4">Login</h4>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block ">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format"
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block ">Password</label>
            <input
              type="password"
              className="w-full p-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <button
          onClick={() => navigate('/register')}
          className="w-full mt-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 rounded-lg transition duration-200"
        >
          Register
        </button>
      </div>

      {openSnackbar && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg ${snackbarSeverity === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};

export default Login;
