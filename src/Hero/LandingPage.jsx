import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import Marquee from "react-fast-marquee";
import Footer from "../Componenets/Layout/Footer/Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Componenets/Layout/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, fetchedproduct } from "../Redux/ProductSlice";
import Swal from "sweetalert2";

function LandingPage() {
  let [dataSet, setData] = useState();
  let dispatch = useDispatch();
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

  const {isLoading,data,error }=useSelector((state)=>state?.product)

    console.log("useselector data",data);
    

  useEffect(() => {
    dispatch(fetchedproduct())
      .then((result) => {
        console.log("result", result);
        // setData(result?.payload);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, [fetchedproduct]);

  const Redirecrt = (pid) => {
    navigate(`/productdetails/${pid}`);
  };
  const Redirecrt2 = () => {
    navigate("/allproduct/all");
  };

  let handleAddtocart = (pid) => {
    let filtered = data?.filter((x) => x.id == pid);
    console.log("filtered", filtered);

    if (isUserLogged) {
      let cartData = {
        uid: userId,
        product_id: filtered[0]?.id,
        product_name: filtered[0]?.product_name,
        price: filtered[0]?.price,
        qty: 1,
        product_img: filtered[0]?.product_img,
      };

      dispatch(addtocart(cartData))
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



  return (
    <>
    {isLoading && <h1>Loading..</h1>}
    {error && <h1>Error..</h1>}
      <Navbar />

      <Container maxWidth="xl" sx={{ padding: 0 }}>
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            position: "relative",
            paddingX: { xs: 2, sm: 4 },
            overflow: "hidden",
          }}
        >
          {/* Grid Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              opacity: 0.1,
              zIndex: 1,
            }}
          />

          {/* Main Content */}
          <Typography
            variant="h1"
            className="herotxt"
            sx={{
              fontSize: {
                xs: "12rem",
                sm: "12rem",
                md: "15rem",
                lg: "20rem",
                xl: "25rem",
              },
              fontWeight: "bold",
              zIndex: 2,
              background:
                "-webkit-linear-gradient(90deg, #000 30%, #91ff00 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "absolute",
              bottom: "25%",
            }}
            style={{
              fontFamily: "robson",
              textDecoration: "none",
              color: "#fff",
            }}
          >
            Urban Femme
          </Typography>
          <img
            src="Assets/hero_img2.png"
            alt="Hero"
            style={{
              position: "absolute",
              bottom: "0%",
              width: "auto",
              height: "auto",
              zIndex: 10,
              maxHeight: "80%",
            }}
          />
          {/* <Button
   variant="outlined"
   sx={{
     marginTop: 3,
     backgroundColor: "transparent",
     color: '#fff',
     border: '1px solid #fff',
     zIndex: 2,
   }}
 >
   View Collection
 </Button> */}
          <Marquee
            pauseOnClick="true"
            autoFill="false"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontSize: "30px",
              position: "absolute",
              bottom: "20%",
              fontFamily: "Space Grotesk",
              fontWeight: "bold",
              textTransform: "uppercase",
              zIndex: 2,
            }}
          >
            From the streets to the spotlight — wear what defines you —
          </Marquee>
          <Marquee
            pauseOnClick="true"
            autoFill="false"
            direction="right"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontSize: "30px",
              position: "absolute",
              bottom: "12%",
              fontFamily: "Space Grotesk",
              fontWeight: "bold",
              textTransform: "uppercase",
              zIndex: 2,
            }}
          >
            From the streets to the spotlight — wear what defines you —
          </Marquee>

          {/* Bottom Left Text and Button Container */}
          {/* <Box
   sx={{
     position: "absolute",
     bottom: "27%", // Updated position
     left: "5%",
     zIndex: 2,
     display: "flex",
     flexDirection: "column",
     alignItems: "flex-start",
   }}
 >
   <Typography
     sx={{
       fontSize: ".9rem",
       color: "#fff",
       marginBottom: 1,
     }}
   >
     Forget the trends; create your own. Step into streetwear that’s 100% you
   </Typography>
   <Button
     variant="text"
     sx={{
       display: "flex",
       alignItems: "center",
       color: "#fff",
       fontWeight: "bold",
       fontSize: "1rem",
       padding: 0,
       border:"1px solid",
       '&:hover': {
         color: "#91ff00",
       },
     }}
     endIcon={<span style={{ fontSize: "1.2rem", marginLeft: "0.5rem" }}>→</span>}
   >
     Explore Now
   </Button>
 </Box> */}
        </Box>

        {/* trendy product */}
        <Box
          sx={{
            paddingY: 10,
            textAlign: "left",
            paddingX: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "4rem" } }}
            style={{ fontFamily: "robson" }}
          >
            The trendy products you shouldn't miss
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: 0 }}>
            {data
              ?.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, position: "relative" }}
                  >
             
                    <Box
                      sx={{
                        position: "absolute",
                        zIndex: 100,
                        top: 10,
                        right: 10,
                        backgroundColor: "#91ff00",
                        color: "#000",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      Trendy
                    </Box>

                    <Box
                      sx={{
                        overflow: "hidden", 
                        borderRadius: 4,
                      }}
                    >
                      <img
                        src={product.product_img}
                        alt={product.product_img}
                        style={{
                          width: "100%",
                          borderRadius: 4,
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{ marginTop: 1, fontWeight: "bold" }}
                    >
                      {product.product_name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#23120B",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                      }}
                    >
                      ₹{product?.price}
                      {/* <span
      style={{
        color: "tomato",
        fontSize: "0.8rem",
        fontWeight: "medium",
        paddingLeft: "0.3rem",
      }}
    >
      (20% off)
    </span> */}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "tomato",
                      }}
                    >
                      (Inclusive of all taxes)
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 2,
                      }}
                    >
                      <Button
                        onClick={() => Redirecrt(product.id)}
                        variant="contained"
                        sx={{
                          backgroundColor: "black",
                          color: "#91ff00",
                          "&:hover": {
                            backgroundColor: "#000001",
                            color: "#91ff00",
                          },
                        }}
                      >
                        Buy Now
                      </Button>
                      {/* <IconButton
                        color="secondary"
                        aria-label="add to cart"
                        onClick={() => handleAddtocart(product?.id)}
                      >
                        <ShoppingCartIcon />
                      </IconButton> */}
                    </Box>
                  </Paper>
                </Grid>
              ))
              .slice(-4)}
          </Grid>
        </Box>

       
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            paddingY: 1,
            paddingX: { xs: 2, sm: 4, md: 8 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          
          <Box
            component="img"
            src="Assets/section1.png" 
            alt="Descriptive Alt Text"
            sx={{
              width: { xs: "100%", md: "40%" },
              // borderRadius: 4,
              // boxShadow: 3,
              marginRight: { md: 3 },
              marginBottom: { xs: 3, md: 0 },
            }}
          />

          
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2rem", md: "3rem", lg: "6rem" },
                fontFamily: "robson",
                lineHeight: "5rem",
              }}
            >
              Discover Our Exclusive Streetwear
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Embrace the unique fusion of style and comfort. Our latest
              streetwear collection offers versatile pieces that make a
              statement. From casual to chic, find styles that fit every vibe.
            </Typography>
            <Button
              onClick={Redirecrt2}
              variant="contained"
              sx={{
                marginTop: 3,
                backgroundColor: "black",
                color: "#91ff00",
                "&:hover": {
                  backgroundColor: "#000001",
                  color: "#91ff00",
                },
              }}
            >
              Shop the Collection
            </Button>
          </Box>
        </Box>

       {/* section start */}
        <Box
          sx={{
            paddingY: 6,
            textAlign: "left",
            paddingX: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "4rem" } }}
            style={{ fontFamily: "robson" }}
          >
            Our New Product to Welcome the Summer of 2025
          </Typography>
          <Grid container spacing={3}>
            {data
              ?.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Box
                      sx={{
                        overflow: "hidden", 
                        borderRadius: 3,
                      }}
                    >
                      <img
                        src={product?.product_img}
                        alt={product?.product_img}
                        style={{
                          width: "100%",
                          borderRadius: 3,
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ marginTop: 1, fontWeight: "bold" }}
                    >
                      {product?.product_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ marginTop: 1, fontSize: "15px" }}
                    >
                      MRP: ₹
                      <span style={{ fontSize: "15px", fontWeight: "600" }}>
                        {product?.price}
                      </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 500,
                          color: "tomato",
                        }}
                      >
                        (Inclusive of all taxes)
                      </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 2,
                      }}
                    >
                      <Button
                        onClick={() => Redirecrt(product?.id)}
                        variant="contained"
                        sx={{
                          backgroundColor: "black",
                          color: "#91ff00",
                          "&:hover": {
                            backgroundColor: "#000001",
                            color: "#91ff00",
                          },
                        }}
                      >
                        Buy Now
                      </Button>
                      {/* <IconButton
                        color="secondary"
                        aria-label="add to cart"
                        onClick={() => handleAddtocart(product?.id)}
                      >
                        <ShoppingCartIcon />
                      </IconButton> */}
                    </Box>
                  </Paper>
                </Grid>
              ))
              .slice(0, 8)}
          </Grid>
        </Box>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => Redirecrt2()}
            variant="contained"
            sx={{
              // marginTop:"20px",
              backgroundColor: "#91ff00",
              color: "#000",
              "&:hover": {
                backgroundColor: "#91ff00",
                color: "#000001",
              },
            }}
          >
            View More
          </Button>
        </Box>
    {/* section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            paddingY: 0,
            position: "relative",
            paddingX: { xs: 2, sm: 4, md: 8 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2rem", md: "3rem", lg: "6rem" },
                fontFamily: "robson",
              }}
            >
              <span style={{ color: "#000", backgroundColor: "#91ff00" }}>
                Mix
              </span>
              ,
              <span style={{ color: "#000", backgroundColor: "#91ff00" }}>
                match
              </span>
              , and{" "}
              <span style={{ color: "#000", backgroundColor: "#91ff00" }}>
                make a statement
              </span>
              . Streetwear that’s as unique as you are.
            </Typography>
          </Box>

         
          <Box
            component="img"
            src="Assets/section2.png" 
            alt="Descriptive Alt Text"
            sx={{
              width: { xs: "100%", md: "40%" },
              // borderRadius: 4,
              // boxShadow: 3,

              marginLeft: { md: 3 },
              marginBottom: { xs: 3, md: 0 },
            }}
          />
        </Box>

        <Marquee
          pauseOnClick="true"
          autoFill="false"
          speed="100"
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            padding: "10px",
            backgroundColor: "#91ff00",
            color: "#000",
            fontSize: "35px",
            // position: "absolute",
            // bottom: "20%",
            fontFamily: "Space Grotesk",
            fontWeight: "bold",
            textTransform: "uppercase",
            zIndex: 2,
          }}
        >
          own every step with style! 😎
        </Marquee>

        {/* brand sectin */}
        <Box
          sx={{
            paddingY: 6,
            textAlign: "center",
            paddingX: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            We Are Supported By
          </Typography>
          <Grid
            container
            spacing={3}
            sx={{ marginTop: 3, justifyContent: "center" }}
          >
            {["HM", "Levis", "Zara", "Uniqlo", "Nike", "Adidas"].map(
              (partner, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`Assets/${partner.toLowerCase()}.png`}
                    alt={partner}
                    style={{
                      width: "20%",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Grid>
              )
            )}
          </Grid>
        </Box>

        <Footer />
      </Container>
    </>
  );
}

export default LandingPage;
