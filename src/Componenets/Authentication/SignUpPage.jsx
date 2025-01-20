import React, { useEffect, useState } from "react";
import { fetchprofile, fetchsignup, fetchUser } from "../../Redux/Slice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgState, setImage] = useState();
  const [dataSet, setData] = useState();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      text: message,
      icon: type,
      confirmButtonText: "OK",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters long.";
    }

    if (!formData.email || formData.email.length < 3) {
      newErrors.email = "Email must be at least 3 characters long.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const imgHandler = (file) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImage(fileReader.result);
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file ? file.name : null,
      }));
    });
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
 
    

    if (!validateFields()) {
      swlAlert("Please fix errors before submitting", "error");
      return;
    }

    const newData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      profileImage: imgState,
    };
          dispatch(fetchsignup(newData))
            .then((result) => {
              swlAlert("Account created successfully","success");
              navigate("/signin");
            })
            .catch((error) => {
              // console.log("Error submitting form", error);
              swlAlert("Submission failed! Please try again",error)
            });
  };

  // useEffect(() => {
  //   dispatch(fetchUser())
  //   .then((result) => {
  //     setData(result?.payload);
      
  //   })
  //   .catch((error) => {
  //     console.log("Error submitting form", error);
  //   });   
  // }, [dispatch]);

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
            padding: "40px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={(event) => imgHandler(event.target.files[0])}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ backgroundColor: "#91ff00", color: "#000" }}
                >
                  Upload Profile Image
                </Button>
              </label>
              {formData.profileImage && (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {formData.profileImage}
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#000", color: "#91ff00" }}
            >
              Sign Up
            </Button>
            <Typography variant="body2" sx={{ ml: 2 }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "#000" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUpPage;
