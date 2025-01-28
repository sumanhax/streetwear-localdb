import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  TextField,
  Stack,
  Container,
  Avatar,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Navbar from "../Componenets/Layout/Navbar/Navbar";
import {
  cartItemsCount,
  createOrder,
  fetchcartitems,
  qtyUpdate,
  removeCartItem,
} from "../Redux/ProductSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  let display = cartItems?.length === 0 ? "block" : "none";
  let userId = window.sessionStorage.getItem("userId");

  const dispatch = useDispatch();
  let navigate = useNavigate();

const swlAlert = (message, type) => {
Swal.fire({
  title: type === "success" ? "Success" : "Error",
  text: message,
  icon: type,
  confirmButtonText: "OK",
});
};

  useEffect(() => {
    dispatch(fetchcartitems())
      .then((result) => {
        const filteredItems = result?.payload.filter((x) => x.uid == userId);
        setCartItems(filteredItems);
        
        // console.log("result", result?.payload);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, [dispatch]);


  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.qty, 0);
    setTotalQuantity(total);
  }, [cartItems,totalQuantity]);

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

        dispatch(qtyUpdate(qtyData)).unwrap().then((res)=>console.log("qtysuccess",res)).catch((err)=>console.log("qtyerror",err))
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
        dispatch(fetchcartitems())
          .then((result) => {
            const filteredItems = result?.payload.filter(
              (x) => x.uid == userId
            );
            setCartItems(filteredItems);
            console.log("result", result?.payload);
          })
          .catch((err) => {
            console.log("Something went wrong", err);
          });
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  const handleOrder = () => {
    let date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    let time = new Date().toTimeString().split(" ")[0];

    const orderdata = {
      uid: userId,
      orderValue: subtotal,
      itmsQty: totalQuantity,
      orderDate: date,
      orderTime: time,
    };

    if (cartItems?.length === 0) {
      swlAlert("There is no items in cart", "error");
    } else {
      dispatch(createOrder(orderdata))
        .then(() => {
          swlAlert("Order placed successfully", "success");
          cartItems.map((x) =>
            dispatch(removeCartItem(x?.id))
              .then((res) => {
                console.log(("deleted successfully", res));
                navigate(`/profile/${userId}`);
              })
              .catch((err) => {
                console.log("error deleting", err);
              })
          );
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  const navigateProductDetails=(id)=>{
    navigate(`/productdetails/${id}`)
  }

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar cartcnt={totalQuantity}/>
      <Container maxWidth="xl" sx={{ paddingY: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
              width: "100%",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              Your Cart
            </Typography>

            {cartItems?.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
              >
                <Avatar
                  src={item.product_img}
                  alt={item.product_name}
                  sx={{ width: 50, height: 50, marginRight: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold", cursor:"pointer" }} onClick={()=>navigateProductDetails(item.product_id)}>
                    {item.product_name}
                  </Typography>
                  <Typography variant="body2">Price: {item.price}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
                  <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={item.qty}
                    inputProps={{
                      min: 1,
                      style: { textAlign: "center", width: "40px" },
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ mx: 1 }}
                    disabled
                  />
                  <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <IconButton sx={{color:"red"}} onClick={() => handleRemoveItem(item.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Stack direction="column" spacing={1}>
              {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Total Items</Typography>
                <Typography>{totalQuantity}</Typography>
              </Box> */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Total Price</Typography>
                <Typography>₹{subtotal}</Typography>
              </Box>
            </Stack>

            <Button
              onClick={handleOrder}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, textTransform: "none" }}
              style={{ backgroundColor: "#000", color: "#91ff00" }}
            >
              Checkout
            </Button>
            <Typography
              style={{
                display: `${display}`,
                fontSize: "20px",
                paddingTop: "10px",
              }}
            >
              {/* {(cartItems?.length === 0)?`Empty cart doesn't look good, Shop now`:""} */}
              Don't leave your cart feeling lonely 😉🛒,{" "}
              <span
                style={{
                  background: "#91ff00",
                  padding: "3px",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                <Link
                  to={"/allproduct/all"}
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Shop Now!
                </Link>
              </span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Cart;
