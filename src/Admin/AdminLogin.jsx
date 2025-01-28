import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchadminlogin } from '../Redux/AdminSlice';
import Navbar from '../Componenets/Layout/Navbar/Navbar';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode:"onBlur"
  });

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type,
      text: message,
      icon: type,
      confirmButtonText: 'OK',
    });
  };

  const onSubmit = (data) => {
    // console.log("log data",data)
    dispatch(fetchadminlogin(data.email))
      .then((result) => {
        console.log("result admin",result);
        
          swlAlert("Logged in successfully", "success");
          window.sessionStorage.setItem("isAdminLogged", "true");
          window.sessionStorage.setItem("adminId", `${result?.payload[0]?.id}`);
          window.sessionStorage.setItem("adminName", `${result?.payload[0]?.username}`);
          navigate(`/dashboard/${result?.payload[0]?.id}`);
        })
        .catch(() => {
        swlAlert("Wrong credentials", "error");
        
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
            Admin Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required.",
                minLength: {
                  value: 10,
                  message: "Email must be at least 10 characters long.",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address.",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#000", color: "#91ff00" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AdminLogin;
