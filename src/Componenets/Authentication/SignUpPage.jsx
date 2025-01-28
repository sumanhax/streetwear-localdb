import React from "react";
import { useForm } from "react-hook-form";
import { fetchsignup } from "../../Redux/Slice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      text: message,
      icon: type,
      confirmButtonText: "OK",
    });
  };

  const onSubmit = (data) => {
    const trimmedData = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      profileImage: data.profileImage[0]
        ? URL.createObjectURL(data.profileImage[0])
        : null,
    };

    dispatch(fetchsignup(trimmedData))
      .then(() => {
        swlAlert("Account created successfully", "success");
        navigate("/signin");
      })
      .catch(() => {
        swlAlert("Submission failed! Please try again", "error");
      });
  };

  const profileImage = watch("profileImage");

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
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              {...register("fullName", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Full Name must be at least 3 characters long.",
                },
                validate: (value) =>
                  value.trim() !== "" ||
                  "Full Name x cannot be empty or whitespace only.",
              })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              {...register("email", {
                required: "Email is required",
                minLength: {
                  value: 10,
                  message: "Email must be at least 10 characters long.",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address.",
                },
                validate: (value) =>
                  value.trim() !== "" ||
                  "Email cannot be empty or whitespace only.",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
                validate: (value) =>
                  value.trim() !== "" ||
                  "Password cannot be empty or whitespace only.",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                {...register("profileImage", {
                  validate: {
                    isImage: (files) =>
                      (files &&
                        files[0] &&
                        files[0].type.startsWith("image/")) ||
                      "Only image files are allowed.",
                  },
                })}
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
              {profileImage && profileImage[0] && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {profileImage[0].name}
                </Typography>
              )}
              {errors.profileImage && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.profileImage.message}
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
