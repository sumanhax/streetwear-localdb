import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Input } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addproduct,
  fetchedproductdetails,
  updateproduct,
} from "../Redux/ProductSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditProduct = ({ pid, handleCloseEditProduct }) => {
  let newid = pid?.id;
  // console.log("new id", newid);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [imgState, setImage] = useState();
  const [prevData, setPrevData] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    category: "",
    origin: "",
    price: "",
    details: "",
    product_img: "",
  });


  useEffect(() => {
    dispatch(fetchedproductdetails(newid))
      .then((result) => {
        setPrevData(result?.payload);
        // console.log(result?.payload);
        
      })
      .catch((error) => {
        console.log("Error fetching product details", error);
        swlAlert("Something went wrong", "error");
      });
  }, [dispatch]);


  useEffect(() => {
    if (prevData) {
      setFormData({
        product_name: prevData.product_name,
        category: prevData.category,
        origin: prevData.origin,
        price: prevData.price,
        details: prevData.details,
        product_img: prevData.product_img,
      });
    }
  }, [prevData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      ...formData,
      product_img: imgState || formData.product_img, 
    };
    const dataId = {
      newData: newData,
      newid: newid,
    };
    dispatch(updateproduct(dataId))
      .then((result) => {
        swlAlert("Product updated successfully", "success");
        // console.log("result", result);
        handleCloseEditProduct()
        // navigate(`/dashboard/${adminId}`);
      })
      .catch((error) => {
        console.log("Error submitting form", error);
        // swlAlert("Something went wrong", "error");
      });
  };

  const imgHandler = (file) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImage(fileReader.result);
    });
    fileReader.readAsDataURL(file);
  };

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      text: message,
      icon: type,
      confirmButtonText: "OK",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Edit Product
      </Typography>
      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        required
        name="product_name"
        value={formData.product_name}
        onChange={handleChange}
      />
      <TextField
        label="Category"
        variant="outlined"
        fullWidth
        required
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        required
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <TextField
        label="Country of Origin"
        variant="outlined"
        fullWidth
        required
        name="origin"
        value={formData.origin}
        onChange={handleChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        required
        name="details"
        value={formData.details}
        onChange={handleChange}
      />
      <Input
        accept="image/*"
        type="file"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(event) => imgHandler(event.target.files[0])}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ backgroundColor: "#000", color: "#91ff00" }}
      >
        Update Details
      </Button>
    </Box>
  );
};

export default EditProduct;
