import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/URL";


const initial_value = {
  isLoading: false,
  status: 0,
  data: [],
  cartData:[],
  error: null,
};

let api = endPoints.product;
let api2 = endPoints.cart;
let api3 = endPoints.order;

export const fetchedproduct = createAsyncThunk(
  "product/fetchedproduct",
  async () => {
    const result = await axiosInstance.get(api);
    console.log("Axios Response for product Api:", result);
    return result?.data;
  }
);
export const deleteproduct = createAsyncThunk(
  "product/deleteproduct",
  async (id) => {
    const result = await axiosInstance.delete(`${api}/${id}`);
    console.log("Axios Response for delete product Api:", result);
    return result?.data;
  }
);

export const fetchedproductdetails = createAsyncThunk(
  "product/fetchedproductdetails",
  async (id) => {
    const result = await axiosInstance.get(`${api}/${id}`);
    // console.log("Axios Response for product Api:", result);
    return result?.data;
  }
);

export const addproduct = createAsyncThunk(
  "product/addproduct",
  async (userdata) => {
    const result = await axiosInstance.post(api,userdata);
    console.log("Axios Response for add product Api:", result);
    return result?.data;
  }
);

export const updateproduct = createAsyncThunk(
  "product/updateproduct",
  async (userdata) => {
    // console.log("slice id",userdata);
    const result = await axiosInstance.put(`${api}/${userdata.newid}`,userdata.newData);
    // console.log("Axios Response for edit product Api:", result);
    return result?.data;
  }
);

export const addtocart = createAsyncThunk(
  "product/addtocart",
  async (productdata) => {
    // console.log("slice id",userdata);
    const result = await axiosInstance.post(api2,productdata);
    console.log("Axios Response for cartadd Api:", result);
    return result?.data;
  }
);

export const cartPatch = createAsyncThunk(
  "product/cartPatch",
  async (patchData) => {
    console.log("patchData slice",patchData.id,patchData.qty);
    const result = await axiosInstance.patch(`${api2}/${patchData.id}`,{qty:patchData.qty});
    console.log("Axios Response for Patchcart Api:", result);
    return result?.data;
  }
);

export const removeCartItem = createAsyncThunk(
  "product/removeCartItem",
  async (id) => {
    // console.log("slice id",userdata);
    const result = await axiosInstance.delete(`${api2}/${id}`);
    console.log("Axios Response for remove cart Api:", result);
    return result?.data;
  }
);

export const fetchcartitems = createAsyncThunk(
  "product/fetchcartitems",
  async (uid) => {
    const result = await axiosInstance.get(`${api2}`);
    console.log("Axios Response for cartfetch Api:", result);
    return result?.data;
  }
);

export const createOrder = createAsyncThunk(
  "product/createOrder",
  async (orderdata) => {
    // console.log("slice id",userdata);
    const result = await axiosInstance.post(api3,orderdata);
    console.log("Axios Response for ordervalue Api:", result);
    return result?.data;
  }
);

export const fetchOrder = createAsyncThunk(
  "product/createOrder",
  async () => {
    // console.log("slice id",userdata);
    const result = await axiosInstance.get(api3);
    console.log("Axios Response for ordervalue Api:", result);
    return result?.data;
  }
);

export const qtyUpdate = createAsyncThunk(
  "product/qtyUpdate",
  async (qtyData) => {
    // console.log("qty api",`${api2}/${qtyData.itmId}`)
    // console.log("qty to update",qtyData.qty)
    const result = await axiosInstance.patch(`${api2}/${qtyData.itmId}`,{"qty":qtyData.qty});
    console.log("Axios Response for qtyUpdate Api:", result);
    return result?.data;
  }
);




export const productSlice = createSlice({
  name: "product",
  initialState: initial_value,
  extraReducers: (builder) => {

    builder.addCase(fetchedproduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchedproduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action?.payload?.status;
      state.data = action?.payload;
    });
    builder.addCase(fetchedproduct.rejected, (state, action) => {
      // console.log("Action for Rejected:", action);
      state.isLoading = false;
      // console.log("Action: ", action);
      state.error = action?.error?.message;
    });
    
    // builder.addCase(fetchedproductdetails.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(fetchedproductdetails.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.status = action?.payload?.status;
    //   state.data = action?.payload;
    // });
    // builder.addCase(fetchedproductdetails.rejected, (state, action) => {
    //   // console.log("Action for Rejected:", action);
    //   state.isLoading = false;
    //   // console.log("Action: ", action);
    //   state.error = action?.error?.message;
    // });
  
    builder.addCase(fetchcartitems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action?.payload?.status;
      state.cartData = action?.payload;
    });
  
  },
});

export default productSlice.reducer;
