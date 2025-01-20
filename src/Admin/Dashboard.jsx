import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  TextField,
  Paper,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Modal,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { deleteproduct, fetchedproduct } from "../Redux/ProductSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import ProductDetails from "../Product/ProductDetails";
import AddProduct from "../Product/AddProduct";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Componenets/Layout/Navbar/Navbar";
import EditProduct from "../Product/EditProduct";

const Dashboard = () => {
  const [dataSet, setDataSet] = useState();
  const [open, setOpen] = useState(false);
  const [openproduct, setOpenproduct] = useState(false);
  const [openeditproduct, setOpenEditproduct] = useState(false);
  const [nproduct, setProduct] = useState();
  let [searchTxt, setSerachTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdminLogged = window.sessionStorage.getItem("isAdminLogged");
  const adminName = window.sessionStorage.getItem("adminName");

  const swlAlert = (text, title) => {
    Swal.fire({
      title: title,
      text: text,
      icon: title,
      confirmButtonText: "OK",
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenAddProduct = () => setOpenproduct(true);
  const handleCloseProduct = () => {
    setOpenproduct(false);
    dispatch(fetchedproduct())
      .then((result) => {
        setDataSet(result?.payload);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  const handleOpenEditProduct = () => setOpenEditproduct(true);
  const handleCloseEditProduct = () => {
    setOpenEditproduct(false);
    dispatch(fetchedproduct())
      .then((result) => {
        setDataSet(result?.payload);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  let handleView = (id) => {
    let found = dataSet?.find((x) => x.id == id);
    console.log("found", found);
    setProduct(found);
    handleOpen();
  };

  let handleAddProduct = () => {
    handleOpenAddProduct();
  };

  let handleEdit = (id) => {
    let found = dataSet?.find((x) => x.id == id);
    // console.log("found", found);
    setProduct(found);
    handleOpenEditProduct();
  };

  let handleDelete = (id) => {
    dispatch(deleteproduct(id))
      .then((result) => {
        swlAlert("Product deleted successfully", "success");
        dispatch(fetchedproduct())
          .then((result) => {
            setDataSet(result?.payload);
          })
          .catch((err) => {
            swlAlert("Something went wrong", "error");
          });
      })
      .catch((err) => {
        swlAlert("Something went wrong", "error");
      });
  };

  useEffect(() => {
    dispatch(fetchedproduct())
      .then((result) => {
        console.log("result",result?.payload);
        
        setDataSet(result?.payload);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, [dispatch]);

  let logOutHandler = () => {
    window.sessionStorage.removeItem("isAdminLogged");
    window.sessionStorage.removeItem("adminName");
    window.sessionStorage.removeItem("adminId");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",

          gap: 3,
          px: 2,
        }}
      >
        <AppBar
          position="static"
          color="default"
          sx={{
            boxShadow: 1,
            borderRadius: 1,
            width: "100%",
            marginTop: "10rem",
            maxWidth: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 0 },
              p: 1,
            }}
          >
            <TextField
              onChange={(event) => {
                setSerachTerm(event.target.value);
              }}
              placeholder="Search..."
              variant="outlined"
              size="small"
              sx={{
                width: { xs: "100%", sm: 300 },
                mt: { xs: 1, sm: 0 },
                "& .MuiInputBase-root": { pr: 1 },
                "& .MuiSvgIcon-root": { mr: 1 },
              }}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
            <Typography variant="h6" component="div">
              {isAdminLogged ? `Hi, ${adminName}👋` : "error"}{" "}
              <span
                style={{
                  color: "red",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={logOutHandler}
              >
                Log Out
              </span>
            </Typography>

            <Button
              onClick={handleAddProduct}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#000",
                color: "#91ff00",
              }}
            >
              Add New Product
            </Button>
            <Modal
              open={openproduct}
              onClose={handleCloseProduct}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "relative",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "70%",
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <IconButton
                  onClick={handleCloseProduct}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <AddProduct handleCloseProduct={handleCloseProduct} />
              </Box>
            </Modal>
          </Toolbar>
        </AppBar>

        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
            boxShadow: 2,
            borderRadius: 1,
            overflowX: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1976d2" }}>
                <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                  Product Image
                </TableCell>
                <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                  Price (₹)
                </TableCell>
                <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSet
                ?.filter((x) => {
                  if (searchTxt == "") {
                    return x;
                  } else if (
                    x?.product_name
                      .toLowerCase()
                      .includes(searchTxt.toLowerCase()) ||
                    x?.category.toLowerCase().includes(searchTxt.toLowerCase())
                  ) {
                    return x;
                  }
                })
                .map((product, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Avatar src={product?.product_img} alt="product" />
                    </TableCell>
                    <TableCell>{product?.product_name}</TableCell>
                    <TableCell>{product?.price}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 1,
                          justifyContent: { xs: "center", sm: "flex-start" },
                        }}
                      >
                        <Button
                          onClick={() => handleView(product.id)}
                          variant="contained"
                          startIcon={<VisibilityIcon />}
                          size="small"
                          sx={{
                            bgcolor: "#29b6f6",
                            color: "white",
                            width: { xs: "100%", sm: "auto" },
                            "&:hover": { bgcolor: "#0288d1" },
                          }}
                        >
                          View
                        </Button>

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box
                            sx={{
                              position: "relative",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "70%",
                              bgcolor: "background.paper",
                              borderRadius: 1,
                              boxShadow: 24,
                              p: 4,
                            }}
                          >
                            <IconButton
                              onClick={handleClose}
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                              }}
                            >
                              <CloseIcon />
                            </IconButton>

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "70vh",
                                bgcolor: "#f5f5f5",
                                px: 2,
                              }}
                            >
                              <Paper
                                elevation={3}
                                sx={{
                                  maxWidth: 900,
                                  width: "100%",
                                  p: 4,
                                  borderRadius: 2,
                                }}
                              >
                                <Grid
                                  container
                                  spacing={4}
                                  sx={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Box
                                      component="img"
                                      src={nproduct?.product_img}
                                      alt="Product"
                                      sx={{
                                        width: "100%",
                                        maxWidth: 300,
                                        height: "auto",
                                        borderRadius: 2,
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} sm={6}>
                                    <Typography variant="h4" fontWeight="bold">
                                      {nproduct?.product_name}
                                    </Typography>

                                    <Typography
                                      variant="subtitle1"
                                      color="textSecondary"
                                      gutterBottom
                                      sx={{ paddingBottom: "5px" }}
                                    >
                                      Category:{" "}
                                      <span
                                        style={{
                                          fontWeight: 500,
                                          color: "tomato",
                                        }}
                                      >
                                        {nproduct?.category}
                                      </span>
                                    </Typography>

                                    <Typography
                                      variant="h5"
                                      color="#000"
                                      fontWeight="bold"
                                      gutterBottom
                                    >
                                      Price:{" "}
                                      <span style={{ fontWeight: 600 }}>
                                        {nproduct?.price}
                                      </span>
                                    </Typography>

                                    <Typography
                                      variant="body1"
                                      color="textSecondary"
                                      gutterBottom
                                      style={{ fontWeight: 800 }}
                                    >
                                      Country of Origin:{" "}
                                      <span style={{ fontWeight: 300 }}>
                                        {nproduct?.origin}
                                      </span>
                                    </Typography>

                                    <Typography
                                      variant="body1"
                                      color="textSecondary"
                                      gutterBottom
                                      style={{ fontWeight: 800 }}
                                    >
                                      Description:{" "}
                                      <span style={{ fontWeight: 300 }}>
                                        {nproduct?.details}
                                      </span>
                                    </Typography>

                                    {/* <Typography
                                      variant="body1"
                                      color="textSecondary"
                                      gutterBottom
                                    >
                                      Dimensions:{" "}
                                      <span style={{ fontWeight: 500 }}>
                                        720x960 px
                                      </span>
                                    </Typography> */}

                                    <Divider sx={{ my: 2 }} />

                                    {/* <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: 1,
              }}
            >
              Add to Cart
            </Button> */}
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Box>
                          </Box>
                        </Modal>

                        <Button
                          onClick={() => {
                            handleEdit(product?.id);
                          }}
                          variant="contained"
                          startIcon={<EditIcon />}
                          size="small"
                          sx={{
                            bgcolor: "#66bb6a",
                            color: "white",
                            width: { xs: "100%", sm: "auto" },
                            "&:hover": { bgcolor: "#388e3c" },
                          }}
                        >
                          Edit
                        </Button>
                        <Modal
                          open={openeditproduct}
                          onClose={handleCloseEditProduct}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box
                            sx={{
                              position: "relative",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "70%",
                              bgcolor: "background.paper",
                              borderRadius: 1,
                              boxShadow: 24,
                              p: 4,
                            }}
                          >
                            <IconButton
                              onClick={handleCloseEditProduct}
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                            <EditProduct
                              pid={nproduct}
                              handleCloseEditProduct={handleCloseEditProduct}
                            />
                          </Box>
                        </Modal>

                        <Button
                          onClick={() => handleDelete(product.id)}
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          size="small"
                          sx={{
                            bgcolor: "#ef5350",
                            color: "white",
                            width: { xs: "100%", sm: "auto" },
                            "&:hover": { bgcolor: "#d32f2f" },
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Dashboard;
