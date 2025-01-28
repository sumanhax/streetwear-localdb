import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchprofile } from '../../Redux/Slice';
import Swal from 'sweetalert2';
import Navbar from '../Layout/Navbar/Navbar';
import { fetchOrder } from '../../Redux/ProductSlice';


const Profile = ({ name, email, profileImage }) => {
  let { id } = useParams();
  let [dataSet, setState] = useState();
  let [orders, setOrder] = useState();

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const uid= window.sessionStorage.getItem("userId");
    

  const handlelogOut = () => {
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("userName");
    window.sessionStorage.removeItem("isUserLogged");
    swlAlert("Logged Out Successfully", "success");
    navigate("/signin");
  };

  const swlAlert = (x, y) => {
    Swal.fire({
      title: y,
      text: x,
      icon: y,
      confirmButtonText: 'OK',
    });
  };


  useEffect(() => {
    dispatch(fetchprofile(id))
      .then((result) => {
        setState(result);
      })
      .catch((error) => {
        console.log('Error ', error);
      });

      dispatch(fetchOrder())
      .then((result) => {
        let filtered=result?.payload?.filter(x=>x.uid==uid)
        console.log("filtered",filtered);
        setOrder(filtered);
      })
      .catch((error) => {
        console.log('Error ', error);
      });
  }, [ id]);



  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Grid container spacing={4} sx={{ maxWidth: 900, alignItems: 'center' }}>
          <Grid item xs={12} md={5} lg={4}>
            <Card
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 4,
                borderRadius: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.03)',
                },
              }}
            >
              <Avatar
                src={dataSet?.payload?.profileImage}
                alt={name}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: '4px solid #1976d2',
                  transition: 'border 0.3s',
                  '&:hover': {
                    border: '4px solid #42a5f5',
                  },
                }}
              />
              <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {dataSet?.payload?.fullName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {dataSet?.payload?.email}
                </Typography>
              </CardContent>
              <Button onClick={handlelogOut} style={{ backgroundColor: "#000", color: "#91ff00" }}>Log Out</Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={7} lg={8}>
          <Typography style={{fontSize:"20px", fontWeight:"bold",paddingBottom:"10px"}}>
                  Order History
                </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="order table">
                <TableHead style={{background:"#000"}}>
                  <TableRow >
                    <TableCell style={{color:"#91ff00"}}>Order ID</TableCell>
                    <TableCell style={{color:"#91ff00"}}>Order Value</TableCell>
                    <TableCell style={{color:"#91ff00"}}>Order Items</TableCell>
                    <TableCell style={{color:"#91ff00"}}>Order Date</TableCell>
                    <TableCell style={{color:"#91ff00"}}>Order Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell style={{color:"red"}}>₹{order.orderValue}</TableCell>
                      <TableCell>{order.itmsQty}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.orderTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
