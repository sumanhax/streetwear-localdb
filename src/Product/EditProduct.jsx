import React, { useEffect, useState } from "react"
import { TextField, Button, Box, Typography, Input } from "@mui/material"
import { useDispatch } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import { fetchedproductdetails, updateproduct } from "../Redux/ProductSlice"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const EditProduct = ({ pid, handleCloseEditProduct }) => {
  const newid = pid?.id

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [imgState, setImage] = useState(null)
  const [prevData, setPrevData] = useState(null)

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      product_name: "",
      category: "",
      origin: "",
      price: "",
      details: "",
      product_img: undefined,
    },
    mode:"onBlur"
  })

  useEffect(() => {
    dispatch(fetchedproductdetails(newid))
      .then((result) => {
        setPrevData(result?.payload)
      })
      .catch((error) => {
        console.log("Error fetching product details", error)
        swlAlert("Something went wrong", "error")
      })
  }, [dispatch, newid])

  useEffect(() => {
    if (prevData) {
      reset({
        product_name: prevData.product_name,
        category: prevData.category,
        origin: prevData.origin,
        price: prevData.price,
        details: prevData.details,
      })
      setImage(prevData.product_img)
    }
  }, [prevData, reset])

  // const onSubmit = (data) => {
  //   const newData = {
  //     ...data,
  //     product_img: imgState || prevData.product_img,
  //   }
  //   const dataId = {
  //     newData: newData,
  //     newid: newid,
  //   }
  //   dispatch(updateproduct(dataId))
  //     .then(() => {
  //       swlAlert("Product updated successfully", "success")
  //       handleCloseEditProduct()
  //     })
  //     .catch((error) => {
  //       console.log("Error submitting form", error)
  //     })
  // }

  const onSubmit = (data) => {
    const newData = {
      ...data,
      product_name: data.product_name.trim(),
      category: data.category.trim(),
      origin: data.origin.trim(),
      details: data.details.trim(),
      product_img: imgState || prevData.product_img,
    };
  
    const dataId = {
      newData: newData,
      newid: newid,
    };
  
    dispatch(updateproduct(dataId))
      .then(() => {
        swlAlert("Product updated successfully", "success");
        handleCloseEditProduct();
      })
      .catch((error) => {
        console.log("Error submitting form", error);
      });
  };
  

  const imgHandler = (file) => {
    if (file && file.type.startsWith("image/")) {
      const fileReader = new FileReader()
      fileReader.addEventListener("load", () => {
        setImage(fileReader.result)
      })
      fileReader.readAsDataURL(file)
    } else if (file) {
      // swlAlert("Please upload an image file", "error")
      alert("Only image files are allowed")

    }
  }

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      text: message,
      icon: type,
      confirmButtonText: "OK",
    })
  }

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
      <Typography variant="h5" color="primary" gutterBottom>
        Edit Product
      </Typography>
      <Controller
        name="product_name"
        control={control}
        rules={{
          required: "Product name is required",
          minLength: { value: 2, message: "Product name must be at least 2 characters long" },
          validate: (value) => value.trim() !== "" || "Product name cannot be empty",
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Product Name"
            variant="outlined"
            fullWidth
            required
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        rules={{
          required: "Category is required",
          validate: (value) => value.trim() !== "" || "Category cannot be empty",
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Category"
            variant="outlined"
            fullWidth
            required
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(e.target.value)}
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
            message: "Price must be a number with up to 2 decimal places",
          },
          validate: (value) => Number.parseFloat(value) > 0 || "Price must be greater than 0",
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Price"
            variant="outlined"
            fullWidth
            required
            type="number"
            inputProps={{ step: "0.01" }}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="origin"
        control={control}
        rules={{
          required: "Country of Origin is required",
          validate: (value) => value.trim() !== "" || "Country of Origin cannot be empty",
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Country of Origin"
            variant="outlined"
            fullWidth
            required
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name="details"
        control={control}
        rules={{
          required: "Description is required",
          minLength: { value: 10, message: "Description must be at least 10 characters long" },
          validate: (value) => value.trim() !== "" || "Description cannot be empty",
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      {(imgState || prevData?.product_img) && (
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Typography variant="body2" gutterBottom>
            Product Image:
          </Typography>
          <img
            src={imgState || prevData?.product_img}
            alt="Current Product"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      )}
      <Controller
        name="product_img"
        control={control}
        render={({ field }) => (
          <Input
            inputProps={{
              accept: "image/*",
              id: "product-image-upload",
            }}
            type="file"
            fullWidth
            sx={{ mt: 0 }}
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) {
                imgHandler(file)
                field.onChange(file)
              }
            }}
          />
        )}
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
  )
}

export default EditProduct

