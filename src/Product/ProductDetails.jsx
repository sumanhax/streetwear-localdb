import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Paper, Divider,IconButton,TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Componenets/Layout/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {
  addtocart,
  cartCheck,
  cartPatch,
  fetchcartitems,
  fetchedproductdetails,
  qtyUpdate,
  removeCartItem,
} from "../Redux/ProductSlice";
import Swal from "sweetalert2";
import { Dataset } from "@mui/icons-material";

const ProductDetails = () => {
  const dispatch = useDispatch();
  let [dataSet, setdataSet] = useState();
  let [prevCartdataSet, setCarddataSet] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [foundItms, setFoundItem] = useState();
  
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
  console.log("params",id);

  useEffect(() => {
    dispatch(fetchcartitems())
      .then((result) => {
        const filteredItems = result?.payload?.filter((x) => x.uid == userId);
        setCartItems(filteredItems);
        setFoundItem(filteredItems.find(x=>x.product_id==id))
        // console.log("filteredItems", filteredItems);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, [dispatch,dataSet]);

  const navigateCart=()=>{
    navigate('/cart')
  }

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>{
        if(item.id === id){
        let newqty= { ...item, qty: Math.max(1, item.qty + change) }
        //  console.log(newqty)
        const qtyData={
          itmId:newqty.id,
          qty:newqty.qty
        }
        // console.log("id check",typeof(qtyData.itmId))
        // console.log("qty check",typeof(qtyData.qty))
        dispatch(qtyUpdate(qtyData)).unwrap()
        .then((res)=>{
        // console.log("res.id",res?.product_id)

          dispatch(fetchedproductdetails(res?.product_id))
          .then((result) => {
            console.log("result", result);
            setdataSet(result?.payload);
          })
          .catch((err) => {
            console.log("something wrong", err);
          });

          console.log("qtysuccess",res)
        }).catch((err)=>console.log("qtyerror",err))
         return newqty
        }else{
          return item
        }
      }
        
      )
    );
  };

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(id))
      .then(() => {
        fetchProductDetails()
        swlAlert("Product Removed from cart", "success");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  let handleAddtocart = (pid) => {
    // const found = cartItems?.find((x) => x.product_id == pid);
    // setFoundItem(found)
    // console.log("found",found)
    if (isUserLogged) {
      // if (found) {
      //   // console.log("cartitems true")
      //   // console.log("cart ",cartItems)
      //   const qtyData = {
      //     itmId: found.id,
      //     qty: found.qty + 1,
      //   };
      //   dispatch(qtyUpdate(qtyData))
      //     .unwrap()
      //     .then((res) => {
      //       console.log("qtysuccess", res);
      //       navigate("/cart");
      //       swlAlert("Quantity updated successfully", "success");
      //     })
      //     .catch((err) => console.log("qtyerror", err));
      // } 
      // else {
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
            // navigate("/cart");
            fetchProductDetails()
          })
          .catch((err) => {
            console.log("something wrong", err);
          });
      // }
    } else {
      navigate("/cart");
    }
  };

  let handleCategory = (cat) => {
    navigate(`/allproduct/${cat}`);
  };

const fetchProductDetails=()=>{
  dispatch(fetchedproductdetails(id))
  .then((result) => {
    console.log("result", result);
    setdataSet(result?.payload);
  })
  .catch((err) => {
    console.log("something wrong", err);
  });
}

  useEffect(() => {
    fetchProductDetails()
      
  }, [dispatch]);

  return (
    <>
      <Navbar cartcnt={cartItems}/>
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
           {!foundItms && 
           
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
           }
              
             {foundItms &&
              <Box
              key={dataSet?.id}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
                <IconButton onClick={() => handleQuantityChange(foundItms?.id, -1)}>
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={foundItms?.qty}
                  inputProps={{
                    min: 1,
                    style: { textAlign: "center", width: "40px" },
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ mx: 1 }}
                  disabled
                />
                <IconButton onClick={() => handleQuantityChange(foundItms?.id, 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{display:"flex", gap:2}}>
              {/* <IconButton sx={{backgroundColor:"#000",color:"red"}} onClick={() => handleRemoveItem(foundItms?.id)}>
                <RemoveShoppingCartIcon />
              </IconButton> */}
              <Button
                onClick={() => handleRemoveItem(foundItms?.id)}
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                sx={{
                  // py: 1.5,
                  // fontSize: "1rem",
                  // fontWeight: "bold",
                  borderRadius: 1,
                  backgroundColor: "black",
                  color: "#91ff00",
                  "&:hover": {
                    backgroundColor: "#000001",
                    color: "#91ff00",
                  },
                }}
              >
                Remove from Cart
              </Button>
              <IconButton sx={{backgroundColor:"#91ff00",color:"#000",transition:"all ease .2s","&:hover": {
                    backgroundColor: "#000001",
                    color: "#91ff00",
                  }}} onClick={() => navigateCart()}>
                <ShoppingCartCheckoutIcon />
              </IconButton>
              </Box>
            </Box>
             }
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default ProductDetails;
