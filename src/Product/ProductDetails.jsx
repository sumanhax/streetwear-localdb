import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Paper, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Componenets/Layout/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  cartCheck,
  cartPatch,
  fetchcartitems,
  fetchedproductdetails,
} from "../Redux/ProductSlice";
import Swal from "sweetalert2";

const ProductDetails = () => {
  // console.log("props",id);
  const dispatch = useDispatch();
  let [dataSet, setdataSet] = useState();
  let [prevCartdataSet, setCarddataSet] = useState();
  const [cartItems, setCartItems] = useState();

  let navigate = useNavigate();
  let userId = window.sessionStorage.getItem("userId");
  let isUserLogged = window.sessionStorage.getItem("isUserLogged");

  const swlAlert = (message, type) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      text: message,
      icon: type,
      confirmButtonText: "OK",
    });
  };

  let { id } = useParams();
  // console.log("id",id);

  const { data,isLoading,error } = useSelector((state) => state.product);
  // console.log("use selector", dataSet);

  let handleAddtocart = (pid) => {
    // console.log("product id",pid);

    // dispatch(fetchcartitems())
    //   .then((result) => {
    //     let exist = result?.payload.filter(
    //       (x) => x.uid == userId && x.product_id == pid
    //     );

    //     if (exist) {
    //       //  console.log("exist reposnse",exist[0].id);
    //       const patchdataSet = {
    //         id: exist[0].id,
    //         qty: parseInt(exist[0].qty + 1),
    //       };
    //       console.log("cart id from exist", patchdataSet.id);

    //       dispatch(cartPatch(patchdataSet))
    //         .then((result) => {
    //           console.log("result", result);
    //         })
    //         .catch((err) => {
    //           console.log("something wrong", err);
    //         });
    //       console.log("exist true",exist[0].id);

    //     } else if(!exist) {

    //     }

    //   })
    //   .catch((err) => {
    //     console.log("Something went wrong", err);
    //   });

    if (isUserLogged) {
      let cartdataSet = {
        uid: userId,
        product_id: dataSet?.id,
        product_name: dataSet?.product_name,
        price: dataSet?.price,
        qty: 1,
        product_img: dataSet?.product_img,
      };
      dispatch(addtocart(cartdataSet))
        .then((result) => {
          // console.log("result",result);
          if (isUserLogged) {
            swlAlert("Product added to cart successfully", "success");
          }
          navigate("/cart");
        })
        .catch((err) => {
          console.log("something wrong", err);
        });
    } else {
      navigate("/cart");
    }
  };

  let handleCategory = (cat) => {
    navigate(`/allproduct/${cat}`);
  };

  useEffect(() => {
    dispatch(fetchedproductdetails(id))
      .then((result) => {
        console.log("result",result);
        setdataSet(result?.payload);
      })
      .catch((err) => {
        console.log("something wrong", err);
      });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
            {/* Left Side: Product Image */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                component="img"
                src={dataSet?.product_img}
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

            {/* Right Side: Product Details */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" fontWeight="bold">
                {dataSet?.product_name}
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
                    cursor: "pointer",
                  }}
                  onClick={() => handleCategory(dataSet?.category)}
                >
                  {dataSet?.category}
                </span>
              </Typography>

              <Typography
                variant="h5"
                color="primary"
                fontWeight="bold"
                gutterBottom
                style={{
                  color: "#000",
                  // backgroundColor: "#000",
                  // display: "inline",
                }}
              >
                Price: {dataSet?.price}
                <span
                  style={{
                    color: "rgba(0, 0, 0,.7)",
                    fontSize: "0.8rem",
                    fontWeight: "medium",
                    paddingLeft: "0.3rem",
                  }}
                >
                  (Inclusive of all taxes)
                </span>
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                gutterBottom
                style={{ fontWeight: 800 }}
              >
                Country of Origin:{" "}
                <span style={{ fontWeight: 300 }}>{dataSet?.origin}</span>
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                gutterBottom
                style={{ fontWeight: 800 }}
              >
                Product Description:{" "}
                <span style={{ fontWeight: 300 }}>{dataSet?.details}</span>
              </Typography>

              {/* <Typography variant="body1" color="textSecondary" gutterBottom>
              Dimensions: <span style={{ fontWeight: 500 }}>720x960 px</span>
            </Typography> */}

              <Divider sx={{ my: 2 }} />

              <Button
                onClick={() => handleAddtocart(dataSet?.id)}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: 1,
                  backgroundColor: "black",
                  color: "#91ff00",
                  "&:hover": {
                    backgroundColor: "#000001",
                    color: "#91ff00",
                  },
                }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default ProductDetails;
