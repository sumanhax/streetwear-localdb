import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componenets/Layout/Navbar/Navbar';

const PNF = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');
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
        textAlign: 'center'
      }}
    >
      <Typography 
        variant="h1" 
        color="primary" 
        sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2,color:"red" }}
      >
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        onClick={handleLoginClick} 
        sx={{ borderRadius: '999px', paddingX: 4 , backgroundColor:"#000",color:"#91ff00" }}
      >
        Go to Homepage
      </Button>
    </Container>
  </>
  );
};

export default PNF;
