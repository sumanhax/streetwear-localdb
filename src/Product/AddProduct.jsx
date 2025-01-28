import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addproduct } from "../Redux/ProductSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ handleCloseProduct }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgState, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      product_name: "",
      category: "",
      origin: "",
      price: "",
      details: "",
      product_img: null,
    },
  });

  const onSubmit = (data) => {
    // Trim whitespace from all string fields
    const trimmedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
    );

    const newData = {
      ...trimmedData,
      price: Number.parseFloat(trimmedData.price),
      product_img: imgState,
    };

    dispatch(addproduct(newData))
      .then((result) => {
        swlAlert("Product added successfully", "success");
        console.log("result", result);
        handleCloseProduct();
      })
      .catch((error) => {
        console.log("Error submitting form", error);
        swlAlert("Something went wrong", "error");
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
      onSubmit={handleSubmit(onSubmit)}
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
      <Typography variant="h4" color="#000" gutterBottom>
        Add New Product
      </Typography>

      <Controller
        name="product_name"
        control={control}
        rules={{
          required: "Product name is required",
          minLength: { value: 3, message: "Product name must be at least 3 characters long" },
          validate: (value) => value.trim() !== "" || "Product name cannot be only whitespace",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Product Name"
            variant="outlined"
            fullWidth
            required
            error={!!errors.product_name}
            helperText={errors.product_name?.message}
            onBlur={(e) => {
              field.onBlur();
              if (e.target.value.trim() === "") {
                setError("product_name", { type: "manual", message: "Product name is required" });
              } else {
                clearErrors("product_name");
              }
            }}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{
          required: "Category is required",
          validate: (value) => value.trim() !== "" || "Category cannot be only whitespace",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Category"
            variant="outlined"
            fullWidth
            required
            error={!!errors.category}
            helperText={errors.category?.message}
            onBlur={(e) => {
              field.onBlur();
              if (e.target.value.trim() === "") {
                setError("category", { type: "manual", message: "Category is required" });
              } else {
                clearErrors("category");
              }
            }}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        rules={{
          required: "Price is required",
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: "Price must be a valid number with up to 2 decimal places",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Price"
            variant="outlined"
            fullWidth
            required
            type="number"
            inputProps={{ step: "0.01" }}
            error={!!errors.price}
            helperText={errors.price?.message}
            onBlur={(e) => {
              field.onBlur();
              if (e.target.value.trim() === "") {
                setError("price", { type: "manual", message: "Price is required" });
              } else {
                clearErrors("price");
              }
            }}
          />
        )}
      />

      <Controller
        name="origin"
        control={control}
        rules={{
          required: "Country of Origin is required",
          validate: (value) => value.trim() !== "" || "Country of Origin cannot be only whitespace",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Country of Origin"
            variant="outlined"
            fullWidth
            required
            error={!!errors.origin}
            helperText={errors.origin?.message}
            onBlur={(e) => {
              field.onBlur();
              if (e.target.value.trim() === "") {
                setError("origin", { type: "manual", message: "Country of Origin is required" });
              } else {
                clearErrors("origin");
              }
            }}
          />
        )}
      />

      <Controller
        name="details"
        control={control}
        rules={{
          required: "Description is required",
          minLength: { value: 10, message: "Description must be at least 10 characters long" },
          validate: (value) => value.trim() !== "" || "Description cannot be only whitespace",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            error={!!errors.details}
            helperText={errors.details?.message}
            onBlur={(e) => {
              field.onBlur();
              if (e.target.value.trim() === "") {
                setError("details", { type: "manual", message: "Description is required" });
              } else {
                clearErrors("details");
              }
            }}
          />
        )}
      />

      <Controller
        name="product_img"
        control={control}
        rules={{
          required: "Product image is required",
          validate: {
            acceptedFormats: (files) =>
              (files && files[0] && ["image/jpeg", "image/png", "image/gif"].includes(files[0].type)) ||
              "Only image files are allowed",
          },
        }}
        render={({ field: { onChange, onBlur, value, ...field } }) => (
          <Box sx={{ mt: 1, display: "flex", alignItems: "left" }}>
            <input
              {...field}
              accept="image/*"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  onChange(event.target.files);
                  imgHandler(file);
                }
              }}
              onBlur={onBlur}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{ backgroundColor: "#91ff00", color: "#000" }}
              >
                Upload Product Image
              </Button>
            </label>
            {value && value[0] && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                {value[0].name}
              </Typography>
            )}
            {errors.product_img && (
              <Typography variant="body2" color="error" sx={{ ml: 2 }}>
                {errors.product_img.message}
              </Typography>
            )}
          </Box>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ backgroundColor: "black", color: "#91ff00" }}
      >
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;
