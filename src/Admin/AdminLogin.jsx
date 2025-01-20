import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchadminlogin } from '../Redux/AdminSlice';
import Navbar from '../Componenets/Layout/Navbar/Navbar';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type,
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
    dispatch(fetchadminlogin())
      .then((result) => {
        const user = result.payload.find((x) => x.email === formData.email);
        // const pass = result.payload.find((x) => x.password === formData.password);
// console.log("user, pass",user, pass);

        if (user && user.password == formData.password) {
          swlAlert("Logged in successfully", "success");
          window.sessionStorage.setItem("isAdminLogged", "true");
          window.sessionStorage.setItem("adminId", `${user.id}`);
          window.sessionStorage.setItem("adminName", `${user.username}`);
          navigate(`/dashboard/${user.id}`);
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
          Admin Login
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
        </Box>
      </Box>
    </Container>
   </>
  );
};

export default AdminLogin;
