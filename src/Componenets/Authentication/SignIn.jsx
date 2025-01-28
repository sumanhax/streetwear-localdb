import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchsignin } from '../../Redux/Slice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar/Navbar';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type === 'success' ? 'Success' : 'Error',
      text: message,
      icon: type,
      confirmButtonText: 'OK',
    });
  };

  const onSubmit = (data) => {
    dispatch(fetchsignin())
      .then((result) => {
        const user = result.payload.find((x) => x.email === data.email);

        if (user && user.password === data.password) {
          swlAlert('Logged in successfully', 'success');

          window.sessionStorage.setItem('isUserLogged', 'true');
          window.sessionStorage.setItem('userName', `${user.fullName}`);
          window.sessionStorage.setItem('userId', `${user.id}`);

          navigate(`/profile/${user.id}`);
        } else {
          swlAlert('Wrong credentials', 'error');
        }
      })
      .catch(() => {
        swlAlert('Login failed. Please try again.', 'error');
      });
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            User Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required.',
                minLength: {
                  value: 10,
                  message: 'Email must be at least 10 characters long.',
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Enter a valid email address.',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long.',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#000', color: '#91ff00' }}
            >
              Sign In
            </Button>
            <Typography variant="body2" sx={{ ml: 2 }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#000' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
