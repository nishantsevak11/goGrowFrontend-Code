import React, { useState } from 'react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { TextField, Button, Snackbar, Alert, Container, Paper, Typography, Box } from '@mui/material';

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              textAlign: 'center',
              color: 'primary.main',
              fontWeight: 'bold',
            }}
          >
            Login
          </Typography>

          <form onSubmit={handleSubmit(handleLogin)}>
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
              sx={{ mb: 2 }}
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
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                mb: 2,
                borderRadius: 1,
                fontWeight: 'bold',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Login
            </Button>

            <Button
              onClick={() => navigate('/register')}
              variant="outlined"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 1,
                fontWeight: 'bold',
                color: 'secondary.main',
                borderColor: 'secondary.main',
                '&:hover': {
                  borderColor: 'secondary.dark',
                  color: 'secondary.dark',
                },
              }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;