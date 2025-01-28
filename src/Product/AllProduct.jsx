import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  IconButton,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import Navbar from "../Componenets/Layout/Navbar/Navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addtocart, fetchcartitems, fetchedproduct } from "../Redux/ProductSlice";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import _ from "lodash";


const AllProduct = () => {
  const [dataSet, setDataSet] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");
  let [searchTxt, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
    const [foundItms, setFoundItem] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all } = useParams();

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

  const navigateCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    if (all === "all") {
      dispatch(fetchedproduct())
        .then((result) => {
          const products = result?.payload;
          setDataSet(products);
          setFilteredData(products);

          const uniqueCategories = [
            ...new Set(products?.map((product) => product.category)),
          ];
          setCategories(uniqueCategories);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    } else {
      dispatch(fetchedproduct())
        .then((result) => {
          const products = result?.payload;
          setDataSet(products);
          setFilteredData(
            products.filter((product) => product.category === all)
          );

          const uniqueCategories = [
            ...new Set(products.map((product) => product.category)),
          ];
          setCategories(uniqueCategories);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    }
  }, [all]);

  //  useEffect(() => {
  //      if(isUserLogged){
  //       dispatch(fetchcartitems())
  //        .then((result) => {
  //          const filteredItems = result?.payload?.filter((x) => x.uid == userId);
  //          setCartItems(filteredItems);
  //          setFoundItem(filteredItems.find(x=>x.product_id==id))
  //          console.log("filteredItems", filteredItems);
  //        })
  //        .catch((err) => {
  //          console.log("Something went wrong", err);
  //        });
  //      }
  //    }, [dispatch,dataSet]);

  const debounceSearch = _.debounce((searchValue) => {
    setSearchTerm(searchValue);
  }, 500);

  const handleSearchChange = (event) => {
    debounceSearch(event.target.value);
  };

  const debounceSort = _.debounce((sortValue) => {
    const sortedData = [...filteredData];
    if (sortValue === "ab") {
      sortedData.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortValue === "ba") {
      sortedData.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (sortValue === "lh") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "hl") {
      sortedData.sort((a, b) => b.price - a.price);
    }
    setFilteredData(sortedData);
    setSortType(sortValue);
  }, 500);

  const handleSortChange = (event) => {
    debounceSort(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category) {
      setFilteredData(
        dataSet?.filter((product) => product.category === category)
      );
    } else {
      setFilteredData(dataSet);
    }
  };

  const handleSingleProduct = (id) => {
    navigate(`/productdetails/${id}`);
  };

  let handleAddtocart = (pid) => {
    let filtered = dataSet.filter((x) => x.id == pid);
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
      <Navbar />
      <Container maxWidth="xl" sx={{ paddingY: 15 }}>
        <Box sx={{ textAlign: "center", paddingX: { xs: 2, sm: 4, md: 8 } }}>
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "4rem" } }}
            style={{ fontFamily: "robson" }}
          >
            Discover Our{" "}
            <span
              style={{
                color: "#91ff00",
                background: "#91ff00",
                padding: "5px",
                textShadow:
                  "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
              }}
            >
              Award-Winning
            </span>{" "}
            Collection
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem", lg: "2rem" },
              marginTop: 1,
            }}
          >
            Shop the products that won the 2024 Fashion Award
          </Typography>

          <Container
            maxWidth="xl"
            style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 7,
                flexWrap: "wrap",
                padding: "1rem",
                background: "#f9f8f8",
                gap: 2,
              }}
            >
              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  labelId="category-select-label"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>All Categories</em>
                  </MenuItem>
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Search Bar */}
              <TextField
                variant="outlined"
                placeholder="Search..."
                onChange={handleSearchChange}
                sx={{ flexGrow: 1, maxWidth: 300 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  labelId="sort-select-label"
                  value={sortType}
                  onChange={handleSortChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="ab">Name[A-B]</MenuItem>
                  <MenuItem value="ba">Name[B-A]</MenuItem>
                  <MenuItem value="lh">Price[Low-High]</MenuItem>
                  <MenuItem value="hl">Price[High-Low]</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Container>

          <Box
            sx={{
              paddingY: 5,
              textAlign: "left",
              paddingX: { xs: 2, sm: 4, md: 8 },
            }}
          >
            <Grid container spacing={3} sx={{ marginTop: 0 }}>
              {filteredData
                ?.filter((x) => {
                  if (searchTxt === "") {
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
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                      <Box
                        sx={{
                          overflow: "hidden",
                          borderRadius: 3,
                        }}
                      >
                        <img
                          src={product?.product_img}
                          alt={product?.product_name}
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
                        {product.product_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ marginTop: 1, fontSize: "15px" }}
                      >
                        MRP: ₹
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                          }}
                        >
                          {product.price}
                        </span>
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
                          onClick={() => handleSingleProduct(product.id)}
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

                        {/* {
                          cartItems?setFoundItem(cartItems.find(x=>x.product_id==product.id)):null
                        } */}
                        {/* {foundItms &&
                         <IconButton
                         sx={{
                           backgroundColor: "#91ff00",
                           color: "#000",
                           transition: "all ease .2s",
                           "&:hover": {
                             backgroundColor: "#000001",
                             color: "#91ff00",
                           },
                         }}
                         onClick={() => navigateCart()}
                       >
                         <ShoppingCartCheckoutIcon />
                       </IconButton>
                        } */}
                        
                        {/* <IconButton
                          color="secondary"
                          aria-label="add to cart"
                          onClick={() => handleAddtocart(product.id)}
                        >
                          <ShoppingCartIcon />
                        </IconButton> */}

                       
                      </Box>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AllProduct;
