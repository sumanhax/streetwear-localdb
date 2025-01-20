import React, { useState } from "react";
import { TextField, Button, Box, Typography, Input } from "@mui/material";
import { useDispatch } from "react-redux";
import { addproduct } from "../Redux/ProductSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProduct = ({handleCloseProduct}) => {

 let navigate=useNavigate()
    let dispatch = useDispatch();
    let [imgState, setImage] = useState();
    
   
   
    const [formData, setFormData] = useState({
        product_name: '',
        category: '',
        origin: '',
        price: "",
        details:"",
        product_img:null

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
    let newData={
        product_name: formData.product_name,
        category: formData.category,
        origin: formData.origin,
        price: formData.price,
        details:formData.details,
        product_img:imgState
    }

    dispatch(addproduct(newData))
    .then((result) => {
        swlAlert("Product added successfully", "success");   
        console.log("result",result);
        // navigate(`/dashboard/${adminId}`)
        handleCloseProduct()
    })
    .catch((error) => {
        console.log("Error submitting form", error);
        swlAlert("Something went wrong", "error");
    });
  }

  

  let imgHandler = (file) => {
    // console.log("file",file);

    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImage(fileReader.result);
      setFormData((prevData) => ({
        ...prevData,
        product_img: file ? file.name : null,
      }));
      // console.log(imgState);
    });
    fileReader.readAsDataURL(file);
  };

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      text: message,
      icon: type,
      confirmButtonText: 'OK',
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} noValidate 
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
      <Typography variant="h4" color="#000" gutterBottom>
        Add New Product
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
  

<Box sx={{ mt: 1, display: 'flex', alignItems: 'left' }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={(event) => imgHandler(event.target.files[0])}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" color="primary" component="span" style={{ backgroundColor: "#91ff00", color: "#000" }}>
            Upload Product Image
          </Button>
        </label>
        {formData.product_img && (
          <Typography variant="body2" sx={{ ml: 2 }}>
            {formData.product_img}
          </Typography>
        )}
      </Box>
      
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ backgroundColor: "black",color: "#91ff00",}}>
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;
