// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   TextField,
//   Paper,
//   Avatar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Modal,
//   IconButton,
//   Grid,
//   Divider,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import { deleteproduct, fetchedproduct } from "../Redux/ProductSlice";
// import Swal from "sweetalert2";
// import ProductDetails from "../Product/ProductDetails";
// import AddProduct from "../Product/AddProduct";
// import { Link } from "react-router-dom";
// import Navbar from "../Componenets/Layout/Navbar/Navbar";
// import EditProduct from "../Product/EditProduct";

// import { Container } from '@mui/material'
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchprofile } from '../../Redux/Slice';

// const EditProfile = ({id}) => {

//     let navigate = useNavigate();
//     let dispatch = useDispatch();
//     const [imgState, setImage] = useState();
//     const [prevData, setPrevData] = useState(null);

//     const [formData, setFormData] = useState({
//       fullname: "",
//       email: "",
//       password: "",
//       profileImage:""
//     });

//      // Fetch product details and update form data when fetched
//   useEffect(() => {
//     dispatch(fetchprofile(newid))
//       .then((result) => {
//         setPrevData(result?.payload);
//       })
//       .catch((error) => {
//         console.log("Error fetching product details", error);
//         swlAlert("Something went wrong", "error");
//       });
//   }, [dispatch, newid]);

//    // Update form data with fetched product details
//    useEffect(() => {
//     if (prevData) {
//       setFormData({
//         product_name: prevData.product_name || "",
//         category: prevData.category || "",
//         origin: prevData.origin || "",
//         price: prevData.price || "",
//         details: prevData.details || "",
//         product_img: prevData.product_img || "",
//       });
//     }
//   }, [prevData]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newData = {
//       ...formData,
//       profileImage: imgState || formData.profileImage, 
//     };
//     const dataId = {
//       newData: newData,
//       newid: newid,
//     };
//     dispatch(updateproduct(dataId))
//       .then((result) => {
//         // swlAlert("Product updated successfully", "success");
//         console.log("result", result);
//         handleCloseEditProduct()
//         // navigate(`/dashboard/${adminId}`);
//       })
//       .catch((error) => {
//         console.log("Error submitting form", error);
//         // swlAlert("Something went wrong", "error");
//       });
//   };

//   const imgHandler = (file) => {
//     const fileReader = new FileReader();
//     fileReader.addEventListener("load", () => {
//       setImage(fileReader.result);
//     });
//     fileReader.readAsDataURL(file);
//   };


//   return (
//     <Container>
//         <Card
//               sx={{
//                 p: 3,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 boxShadow: 4,
//                 borderRadius: 3,
//                 transition: 'transform 0.3s, box-shadow 0.3s',
//                 '&:hover': {
//                   boxShadow: 6,
//                   transform: 'scale(1.03)',
//                 },
//               }}
//             >
//               <Avatar
//                 src={dataSet?.payload?.profileImage}
//                 alt={name}
//                 sx={{
//                   width: 120,
//                   height: 120,
//                   mb: 2,
//                   border: '4px solid #1976d2',
//                   transition: 'border 0.3s',
//                   '&:hover': {
//                     border: '4px solid #42a5f5',
//                   },
//                 }}
//               />
//               <CardContent sx={{ textAlign: 'center', padding: 3 }}>
//                 <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
//                   {dataSet?.payload?.fullName}
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary">
//                   {dataSet?.payload?.email}
//                 </Typography>
//               </CardContent>
//              <Box sx={{display:"flex",gap:"10px"}}> 
//              <Button onClick={handleEdit} style={{ backgroundColor: "#91ff00", color: "#000" }}>Update</Button>
//            </Box>
//             </Card>
//     </Container>
//   )
// }

// export default EditProfile