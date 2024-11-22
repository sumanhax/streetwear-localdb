import React, { useState } from 'react';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      text: message,
      icon: type,
      confirmButtonText: 'OK',
    });
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchsignin(formData))
      .then((result) => {
        const user = result.payload.find((x) => x.email === formData.email);
        // const pass = result.payload.find((x) => x.password === formData.password);

        // console.log("user pass",user,pass);
        
        if (user && user.password === formData.password) {
          swlAlert("Logged in successfully", "success");

          window.sessionStorage.setItem("isUserLogged", "true");
          window.sessionStorage.setItem("userName", `${user.fullName}`);
          window.sessionStorage.setItem("userId", `${user.id}`);

          navigate(`/profile/${user.id}`);
        } else {
          swlAlert("Wrong credentials", "error");
        }
      })
      .catch(() => {
        swlAlert("Login failed. Please try again.", "error");
      });
  };

  return (
   <>
   <Navbar/>
   <Container maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
      
            sx={{ mt: 3, mb: 2 }}
            style={{backgroundColor:"#000",color:"#91ff00"}}
          >
            Sign In
          </Button>
          <Typography variant="body2" sx={{ ml: 2 }}>
                Don't have account? <Link to='/signup' style={{color:"#000"}}>Sign up</Link>
              </Typography>
        </Box>
      </Box>
    </Container>
   </>
  );
};

export default SignIn;
