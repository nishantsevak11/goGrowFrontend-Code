import React, { useState } from 'react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { TextField, Button, Snackbar, Alert, Container, Paper, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data.email, data.password);
      localStorage.setItem('token', response.data.token);
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1500);
    } catch (error) {
      setSnackbarMessage('Login failed! Invalid credentials.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} className="p-6 mt-20 flex flex-col items-center shadow-lg rounded-lg">
        <Typography variant="h5" className="mb-4 text-gray-700 font-bold">Login</Typography>

        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col w-full">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary" className="mt-4">
            Login
          </Button>
        </form>

        <Button 
          onClick={() => navigate('/register')} 
          variant="outlined" 
          color="secondary" 
          className="mt-4"
        >
          Register
        </Button>
      </Paper>

      {/* Snackbar for Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
