import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componenets/Layout/Navbar/Navbar';

const Error2 = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/adminlogin');
  };

  return (
   <>
   <Navbar/>
   <Container 
      maxWidth="sm" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        textAlign: 'center',
        // backgroundColor: '#f5f5f5', 
        // borderRadius: 2, 
        // boxShadow: 3,
        padding: 4
      }}
    >
      <Typography 
        variant="h4" 
        color="primary" 
        sx={{ fontWeight: 'bold', mb: 1 ,color:"red"}}
      >
        Access Restricted
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }} >
        You must log in to access this page. Please log in and try again.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        onClick={handleLoginClick} 
        sx={{ borderRadius: '999px', paddingX: 4 , backgroundColor:"#000",color:"#91ff00"} }
      >
        Login
      </Button>
    </Container>
   </>
  );
};

export default Error2;
