import { Container, Grid, Box, Typography, Button, Paper } from "@mui/material";
import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {

  let isAdminLogged=window.sessionStorage.getItem("isAdminLogged")
  let adminId=window.sessionStorage.getItem("adminId")
  return (
    <Container maxWidth="xl" sx={{ padding: 0 }}>
    
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          paddingY: 6,
          textAlign: "center",
          position: "relative",
          paddingX: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", sm: "6rem", md: "8rem", lg: "10rem", xl: "15rem" },
            fontWeight: "bold",
            background: "-webkit-linear-gradient(90deg, #000 20%, #91ff00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          style={{fontFamily:'robson'}}
        >
          ABOUT US
        </Typography>
       
        <Typography sx={{ }} style={{color:"#C0C0C0",marginTop:"0px"}}>UrbanFemmi is redefining women’s streetwear with bold, versatile designs that empower self-expression.</Typography>

    
        <Grid container spacing={2} sx={{ paddingY: 4 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">STORE</Typography>
            <Typography variant="body1">123 Fashion Street, KOLKATA</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">EMAIL</Typography>
            <Typography variant="body1">info@urbanfemme.com</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">Admin</Typography>
            <Typography variant="body1" component={Link} to={isAdminLogged?`/dashboard/${adminId}`:"/adminlogin"} style={{textDecoration:"none",color:"#fff"}}>{isAdminLogged?"Admin Dashboard":"Login"}</Typography>
          </Grid>
        </Grid>
        <Typography style={{color:"#91ff00",marginTop:"10px", display:"block", background:"rgba(255,255,255,.07)", padding:"5px"}}>Made with ❤️ by Suman</Typography>

      </Box>
    </Container>
  )
}

export default Footer