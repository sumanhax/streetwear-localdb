import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

function Navbar({cartCount}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const cartItemCount = 3; // Starting cart count

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isUserLogged = window.sessionStorage.getItem("isUserLogged");
  const userName = window.sessionStorage.getItem("userName");
  const userId = window.sessionStorage.getItem("userId");

  // const curl=window.sessionStorage.setItem("curl","home")

  const [color,setColor]=useState("transparent")
  let curl=window.location.href

let colorChange=()=>{
  curl=="http://localhost:3000/"?setColor("transparent"):setColor("#000")
}

  useEffect(()=>{
    colorChange()  
  },[])

  return (
    <Container maxWidth="xxl" sx={{ padding: 0,position:"relative" }} >
      <AppBar   sx={{ px: '130px', py: '10px', backgroundColor: `${color}`, boxShadow: 'none',position:"absolute"}} >
        <Toolbar >
          {/* Logo */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" >
             <Link to='/' style={{color:"#fff", textDecoration:"none"}}>UrbanFemme</Link> 
            </Typography>
          </Box>

          {/* Links */}
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'menu-appbar',
                }}
              >
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                <MenuItem component={Link} to="/allproduct/all" onClick={handleMenuClose}>Products</MenuItem>
                <MenuItem component={Link} to={isUserLogged ? `/profile/${userId}` : "/signin"} onClick={handleMenuClose}>
                  {isUserLogged ? `Hi, ${userName}👋` : "Login"}
                </MenuItem>
                <MenuItem component={Link} to="/cart" onClick={handleMenuClose}>
                  <Badge badgeContent={cartCount} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/allproduct/all">Products</Button>
              <Button color="inherit" component={Link} to={isUserLogged ? `/profile/${userId}` : "/signin"}>
                {isUserLogged ? `Hi, ${userName}👋` : "Login"}
              </Button>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Navbar;